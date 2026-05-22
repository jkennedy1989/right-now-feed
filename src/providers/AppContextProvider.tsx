'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

import laData from '@/data/la.json';
import sfData from '@/data/sf.json';
import torontoData from '@/data/toronto.json';

const CITY_DATA: Record<CityId, CuratedBusiness[]> = {
  la: laData as CuratedBusiness[],
  sf: sfData as CuratedBusiness[],
  toronto: torontoData as CuratedBusiness[],
};

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
  showShortlistOnly: boolean;
  searchOverride: string | null;
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
  setViewportCenter: (center: { lat: number; lng: number }) => void;
  onViewportChange: (center: { lat: number; lng: number }) => void;
  setLlmPrimaryPills: (pills: PrimaryFilterPill[]) => void;
  setLlmSecondaryPills: (pills: SecondaryFilterPill[]) => void;
  setSearchOverride: (keyword: string | null) => void;
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
  const [searchOverride, setSearchOverride] = useState<string | null>(null);
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
    const keywords = activePrimaryPills.slice(0, 3).map((p) => p.keyword);
    let combined = keywords.join(' ');
    if (activeSecondaryIds.length > 0) {
      const secondaryKeywords = activeSecondaryIds
        .map((id) => secondaryFilters.find((s) => s.id === id)?.keyword)
        .filter(Boolean)
        .slice(0, 2);
      combined = `${combined} ${secondaryKeywords.join(' ')}`;
    }
    return combined;
  }, [searchOverride, activePrimaryPills, activeSecondaryIds, secondaryFilters]);

  const isWalkableActive = activeSecondaryIds.includes('walkable');

  const { dynamicPlaces, isLoading: isDynamicLoading, onViewportChange } = useDynamicPlaces({
    viewportCenter,
    searchKeyword,
    selectedCity,
    curatedCount: curatedPlaces.length,
    radiusOverride: isWalkableActive ? 1609 : undefined,
  });

  const places = useMemo(
    () => mergePlaces(curatedPlaces, dynamicPlaces),
    [curatedPlaces, dynamicPlaces]
  );

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
    const curated = CITY_DATA[city];
    setCuratedPlaces(curated.map((c) => curatedToBusiness(c)));
  }, []);

  const togglePrimary = useCallback((id: string) => {
    setActivePrimaryIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setActiveSecondaryIds([]);
    setShowShortlistOnly(false);
    setSearchOverride(null);
    setLlmSecondaryPills([]);
  }, []);

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
    showShortlistOnly,
    searchOverride,
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
    setViewportCenter,
    onViewportChange,
    setLlmPrimaryPills,
    setLlmSecondaryPills,
    setSearchOverride,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
