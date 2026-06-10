'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Business, ContextSignals } from '@/types';
import { PrimaryFilterPill, SecondaryFilterPill } from '@/types/filters';
import { buildContextSignals, generatePrimaryPills, getSecondaryPills } from '@/lib/context-engine';
import { WeatherData } from '@/types/context';
import { CityId, CITIES } from '@/data/city-meta';
import { CuratedBusiness } from '@/types/curated';
import { curatedToBusiness } from '@/lib/utils';
import { mergePlaces } from '@/lib/dedup';
import { useDynamicPlaces } from '@/hooks/useDynamicPlaces';
import { matchesSecondaryFilter } from '@/lib/secondary-filter';
import { computeBadgeMap } from '@/lib/proof-badges';
import { ProofBadge } from '@/types';
import { CITY_LISTS, CityList } from '@/data/city-lists';

import laData from '@/data/la.json';
import sfData from '@/data/sf.json';
import torontoData from '@/data/toronto.json';

const CITY_DATA: Record<CityId, CuratedBusiness[]> = {
  la: laData as CuratedBusiness[],
  sf: sfData as CuratedBusiness[],
  toronto: torontoData as CuratedBusiness[],
};

interface ListViewState {
  listId: string;
  list: CityList;
  businesses: Business[];
  activeIndex: number;
  isLoading: boolean;
}

interface AppState {
  selectedCity: CityId;
  signals: ContextSignals;
  primaryFilters: PrimaryFilterPill[];
  activePrimaryIds: string[];
  secondaryFilters: SecondaryFilterPill[];
  activeSecondaryIds: string[];
  places: Business[];
  shortlistIds: string[];
  isLoading: boolean;
  viewportCenter: { lat: number; lng: number } | null;
  isDynamicLoading: boolean;
  selectedBusinessId: string | null;
  focusedBusinessId: string | null;
  filteredPlaces: Business[];
  showShortlistOnly: boolean;
  searchOverride: string | null;
  pendingFitToResults: boolean;
  badgeMap: Map<string, ProofBadge>;
  showRedoButton: boolean;
  hasUserInteracted: boolean;
  listViewMode: ListViewState | null;
}

interface AppContextValue extends AppState {
  setCity: (city: CityId) => void;
  togglePrimary: (id: string) => void;
  toggleSecondary: (id: string) => void;
  clearFilters: () => void;
  shortlistItem: (id: string) => void;
  unshortlistItem: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  clearShortlist: () => void;
  toggleShortlistView: () => void;
  setSelectedBusinessId: (id: string | null) => void;
  setFocusedBusinessId: (id: string | null) => void;
  setViewportCenter: (center: { lat: number; lng: number }) => void;
  onMapUserPan: (center: { lat: number; lng: number }) => void;
  triggerRedoSearch: () => void;
  setLlmPrimaryPills: (pills: PrimaryFilterPill[]) => void;
  setLlmSecondaryPills: (pills: SecondaryFilterPill[]) => void;
  setSearchOverride: (keyword: string | null) => void;
  clearPendingFit: () => void;
  injectPlace: (place: Business) => void;
  enterListView: (listId: string) => void;
  exitListView: () => void;
  setListActiveIndex: (index: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<CityId>('la');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activePrimaryIds, setActivePrimaryIds] = useState<string[]>([]);
  const [activeSecondaryIds, setActiveSecondaryIds] = useState<string[]>([]);
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);
  const [showShortlistOnly, setShowShortlistOnly] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [focusedBusinessId, setFocusedBusinessId] = useState<string | null>(null);
  const [searchOverride, setSearchOverrideRaw] = useState<string | null>(null);
  const [pendingFitToResults, setPendingFitToResults] = useState(false);
  const [showRedoButton, setShowRedoButton] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [pendingRedoCenter, setPendingRedoCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [listViewMode, setListViewMode] = useState<ListViewState | null>(null);

  const setSearchOverride = useCallback((keyword: string | null) => {
    setSearchOverrideRaw(keyword);
    if (keyword) setPendingFitToResults(true);
    setShowRedoButton(false);
  }, []);

  const clearPendingFit = useCallback(() => {
    setPendingFitToResults(false);
  }, []);
  const [injectedPlaces, setInjectedPlaces] = useState<Business[]>([]);

  const injectPlace = useCallback((place: Business) => {
    setInjectedPlaces((prev) => {
      if (prev.some((p) => p.id === place.id)) return prev;
      return [...prev, place];
    });
  }, []);

  const allPlacesRef = useRef<Business[]>([]);

  const [llmPrimaryPills, setLlmPrimaryPills] = useState<PrimaryFilterPill[]>([]);
  const [llmSecondaryPills, setLlmSecondaryPills] = useState<SecondaryFilterPill[]>([]);
  const [curatedPlaces, setCuratedPlaces] = useState<Business[]>(() => {
    const curated = CITY_DATA['la'];
    return curated.map((c) => curatedToBusiness(c));
  });
  const [isLoading, setIsLoading] = useState(false);
  const [viewportCenter, setViewportCenter] = useState<{ lat: number; lng: number } | null>(null);

  const location = CITIES[selectedCity].center;

  const signals = useMemo(
    () => buildContextSignals(location, weather),
    [location, weather]
  );

  const deterministicPrimary = useMemo(
    () => generatePrimaryPills(signals),
    [signals]
  );

  const primaryFilters = useMemo(
    () => [...deterministicPrimary, ...llmPrimaryPills],
    [deterministicPrimary, llmPrimaryPills]
  );

  const activePrimaryPills = useMemo(
    () => primaryFilters.filter((p) => activePrimaryIds.includes(p.id)),
    [primaryFilters, activePrimaryIds]
  );

  const deterministicSecondary = useMemo(
    () => (activePrimaryPills.length > 0 ? getSecondaryPills(activePrimaryPills) : []),
    [activePrimaryPills]
  );

  const secondaryFilters = useMemo(
    () => [...deterministicSecondary, ...llmSecondaryPills],
    [deterministicSecondary, llmSecondaryPills]
  );

  const searchKeyword = useMemo(() => {
    if (searchOverride) return searchOverride;
    if (activePrimaryPills.length === 0) return null;
    return activePrimaryPills[0].keyword;
  }, [searchOverride, activePrimaryPills]);

  const { dynamicPlaces, isLoading: isDynamicLoading, redoSearch } = useDynamicPlaces({
    viewportCenter,
    searchKeyword,
    selectedCity,
    curatedCount: curatedPlaces.length,
  });

  const activeSecondaryPills = useMemo(
    () => secondaryFilters.filter((s) => activeSecondaryIds.includes(s.id)),
    [secondaryFilters, activeSecondaryIds]
  );

  const places = useMemo(() => {
    const merged = mergePlaces(curatedPlaces, dynamicPlaces);
    const withInjected = injectedPlaces.length > 0
      ? [...merged, ...injectedPlaces.filter((ip) => !merged.some((m) => m.id === ip.id))]
      : merged;
    allPlacesRef.current = withInjected;
    if (activeSecondaryPills.length === 0) return withInjected;
    const filtered = withInjected.filter((place) =>
      activeSecondaryPills.every((pill) => matchesSecondaryFilter(place, pill, viewportCenter))
    );
    const shortlistedMissing = withInjected.filter(
      (p) => shortlistIds.includes(p.id) && !filtered.some((f) => f.id === p.id)
    );
    return shortlistedMissing.length > 0 ? [...filtered, ...shortlistedMissing] : filtered;
  }, [curatedPlaces, dynamicPlaces, injectedPlaces, activeSecondaryPills, viewportCenter, shortlistIds]);

  const badgeMap = useMemo(
    () => computeBadgeMap(places, shortlistIds, selectedCity),
    [places, shortlistIds, selectedCity]
  );

  const filteredPlaces = useMemo(() => {
    if (activePrimaryPills.length === 0) return [];
    return places.filter((p) => p.source === 'google').slice(0, 20);
  }, [places, activePrimaryPills]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch(`/api/weather?lat=${location.lat}&lng=${location.lng}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.temp !== undefined) setWeather(data);
      })
      .catch(() => {});
  }, [location]);

  const setCity = useCallback((city: CityId) => {
    setSelectedCity(city);
    setActivePrimaryIds([]);
    setActiveSecondaryIds([]);
    setWeather(null);
    setViewportCenter(null);
    setSelectedBusinessId(null);
    setLlmPrimaryPills([]);
    setLlmSecondaryPills([]);
    setShowRedoButton(false);
    setHasUserInteracted(false);
    setListViewMode(null);
    const curated = CITY_DATA[city];
    setCuratedPlaces(curated.map((c) => curatedToBusiness(c)));
  }, []);

  const togglePrimary = useCallback((id: string) => {
    setActivePrimaryIds((prev) =>
      prev.includes(id) ? [] : [id]
    );
    setActiveSecondaryIds([]);
    setShowShortlistOnly(false);
    setSearchOverride(null);
    setLlmSecondaryPills([]);
    setHasUserInteracted(true);
    setShowRedoButton(false);
    setFocusedBusinessId(null);
  }, [setSearchOverride]);

  const toggleSecondary = useCallback((id: string) => {
    setActiveSecondaryIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActivePrimaryIds([]);
    setActiveSecondaryIds([]);
    setShowShortlistOnly(false);
  }, []);

  const shortlistItem = useCallback((id: string) => {
    setShortlistIds((prev) => {
      if (prev.includes(id)) return prev;
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
      return [...prev, id];
    });
    const business = allPlacesRef.current.find((p) => p.id === id);
    if (business) {
      setInjectedPlaces((prev) => prev.some((p) => p.id === id) ? prev : [...prev, business]);
    }
  }, []);

  const unshortlistItem = useCallback((id: string) => {
    setShortlistIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const isShortlisted = useCallback(
    (id: string) => shortlistIds.includes(id),
    [shortlistIds]
  );

  const clearShortlist = useCallback(() => {
    setShortlistIds([]);
    setShowShortlistOnly(false);
  }, []);

  const toggleShortlistView = useCallback(() => {
    setShowShortlistOnly((prev) => !prev);
    if (!showShortlistOnly) {
      setActivePrimaryIds([]);
      setActiveSecondaryIds([]);
    }
  }, [showShortlistOnly]);

  const onMapUserPan = useCallback((center: { lat: number; lng: number }) => {
    setPendingRedoCenter(center);
    setShowRedoButton(true);
  }, []);

  const triggerRedoSearch = useCallback(() => {
    if (pendingRedoCenter) {
      redoSearch(pendingRedoCenter, searchKeyword || undefined);
      setShowRedoButton(false);
      setHasUserInteracted(true);
    }
  }, [pendingRedoCenter, redoSearch, searchKeyword]);

  const enterListView = useCallback((listId: string) => {
    const list = CITY_LISTS.find((l) => l.id === listId);
    if (!list) return;

    setActivePrimaryIds([]);
    setActiveSecondaryIds([]);
    setSearchOverrideRaw(null);
    setSelectedBusinessId(null);
    setShowShortlistOnly(false);
    setShowRedoButton(false);

    setListViewMode({ listId, list, businesses: [], activeIndex: 0, isLoading: true });

    fetch('/api/list-places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ names: list.businesses.map((b) => b.name), city: CITIES[selectedCity].name, descriptions: list.businesses.map((b) => b.description) }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setListViewMode((prev) => prev ? { ...prev, businesses: data.results, isLoading: false } : null);
        }
      })
      .catch(() => {
        setListViewMode((prev) => prev ? { ...prev, isLoading: false } : null);
      });
  }, [selectedCity]);

  const exitListView = useCallback(() => {
    setListViewMode(null);
  }, []);

  const setListActiveIndex = useCallback((index: number) => {
    setListViewMode((prev) => prev ? { ...prev, activeIndex: index } : null);
  }, []);

  const value: AppContextValue = {
    selectedCity,
    signals,
    primaryFilters,
    activePrimaryIds,
    secondaryFilters,
    activeSecondaryIds,
    places,
    shortlistIds,
    isLoading,
    viewportCenter,
    isDynamicLoading,
    selectedBusinessId,
    focusedBusinessId,
    filteredPlaces,
    showShortlistOnly,
    searchOverride,
    pendingFitToResults,
    badgeMap,
    showRedoButton,
    hasUserInteracted,
    listViewMode,
    setCity,
    togglePrimary,
    toggleSecondary,
    clearFilters,
    shortlistItem,
    unshortlistItem,
    isShortlisted,
    clearShortlist,
    toggleShortlistView,
    setSelectedBusinessId,
    setFocusedBusinessId,
    setViewportCenter,
    onMapUserPan,
    triggerRedoSearch,
    setLlmPrimaryPills,
    setLlmSecondaryPills,
    setSearchOverride,
    clearPendingFit,
    injectPlace,
    enterListView,
    exitListView,
    setListActiveIndex,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
