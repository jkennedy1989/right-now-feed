'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Business, ContextSignals, Deal, EventItem } from '@/types';
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
  activePrimaryId: string | null;
  secondaryFilters: SecondaryFilterPill[];
  activeSecondaryIds: string[];
  places: Business[];
  events: EventItem[];
  deals: Deal[];
  savedItemIds: string[];
  isLoading: boolean;
  viewportCenter: { lat: number; lng: number } | null;
  isDynamicLoading: boolean;
  showSavedOnly: boolean;
}

interface AppContextValue extends AppState {
  setCity: (city: CityId) => void;
  selectPrimary: (id: string) => void;
  toggleSecondary: (id: string) => void;
  clearFilters: () => void;
  saveItem: (id: string) => void;
  unsaveItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  setPlaces: (places: Business[]) => void;
  setEvents: (events: EventItem[]) => void;
  setDeals: (deals: Deal[]) => void;
  setIsLoading: (loading: boolean) => void;
  setViewportCenter: (center: { lat: number; lng: number }) => void;
  onViewportChange: (center: { lat: number; lng: number }) => void;
  toggleSavedView: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const SAVED_ITEMS_KEY = 'rightnow-saved-v2';

function loadSavedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(SAVED_ITEMS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<CityId>('la');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activePrimaryId, setActivePrimaryId] = useState<string | null>(null);
  const [activeSecondaryIds, setActiveSecondaryIds] = useState<string[]>([]);
  const [curatedPlaces, setCuratedPlaces] = useState<Business[]>(() => {
    const curated = CITY_DATA['la'];
    return curated.map((c) => curatedToBusiness(c));
  });
  const [events, setEvents] = useState<EventItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [savedItemIds, setSavedItemIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewportCenter, setViewportCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const location = CITIES[selectedCity].center;

  const signals = useMemo(
    () => buildContextSignals(location, weather),
    [location, weather]
  );

  const primaryFilters = useMemo(
    () => generatePrimaryPills(signals),
    [signals]
  );

  const activePrimaryPill = useMemo(
    () => primaryFilters.find((p) => p.id === activePrimaryId) || null,
    [primaryFilters, activePrimaryId]
  );

  const secondaryFilters = useMemo(
    () => (activePrimaryPill ? getSecondaryPills(activePrimaryPill) : []),
    [activePrimaryPill]
  );

  const searchKeyword = useMemo(() => {
    if (!activePrimaryPill) return undefined;
    let kw = activePrimaryPill.keyword;
    if (activeSecondaryIds.length > 0) {
      const secondaryKeywords = activeSecondaryIds
        .map((id) => secondaryFilters.find((s) => s.id === id)?.keyword)
        .filter(Boolean)
        .join(' ');
      kw = `${kw} ${secondaryKeywords}`;
    }
    return kw;
  }, [activePrimaryPill, activeSecondaryIds, secondaryFilters]);

  const { dynamicPlaces, isLoading: isDynamicLoading, onViewportChange } = useDynamicPlaces({
    viewportCenter,
    searchKeyword: searchKeyword || null,
    selectedCity,
    curatedCount: curatedPlaces.length,
  });

  const places = useMemo(
    () => mergePlaces(curatedPlaces, dynamicPlaces),
    [curatedPlaces, dynamicPlaces]
  );

  useEffect(() => {
    setSavedItemIds(loadSavedIds());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItemIds));
  }, [savedItemIds]);

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
    setActivePrimaryId(null);
    setActiveSecondaryIds([]);
    setWeather(null);
    setViewportCenter(null);
    const curated = CITY_DATA[city];
    setCuratedPlaces(curated.map((c) => curatedToBusiness(c)));
  }, []);

  const selectPrimary = useCallback((id: string) => {
    setActivePrimaryId((prev) => (prev === id ? null : id));
    setActiveSecondaryIds([]);
    setShowSavedOnly(false);
  }, []);

  const toggleSavedView = useCallback(() => {
    setShowSavedOnly((prev) => !prev);
    if (!showSavedOnly) {
      setActivePrimaryId(null);
      setActiveSecondaryIds([]);
    }
  }, [showSavedOnly]);

  const toggleSecondary = useCallback((id: string) => {
    setActiveSecondaryIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActivePrimaryId(null);
    setActiveSecondaryIds([]);
  }, []);

  const saveItem = useCallback((id: string) => {
    setSavedItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unsaveItem = useCallback((id: string) => {
    setSavedItemIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const isSaved = useCallback(
    (id: string) => savedItemIds.includes(id),
    [savedItemIds]
  );

  const setPlaces = useCallback((newPlaces: Business[]) => {
    setCuratedPlaces(newPlaces);
  }, []);

  const value: AppContextValue = {
    selectedCity,
    signals,
    primaryFilters,
    activePrimaryId,
    secondaryFilters,
    activeSecondaryIds,
    places,
    events,
    deals,
    savedItemIds,
    isLoading,
    viewportCenter,
    isDynamicLoading,
    showSavedOnly,
    setCity,
    selectPrimary,
    toggleSecondary,
    clearFilters,
    saveItem,
    unsaveItem,
    isSaved,
    setPlaces,
    setEvents,
    setDeals,
    setIsLoading,
    setViewportCenter,
    onViewportChange,
    toggleSavedView,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
