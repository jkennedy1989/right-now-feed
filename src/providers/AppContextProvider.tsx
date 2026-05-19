'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Business, ContextSignals, Deal, EventItem, FilterPill } from '@/types';
import { buildContextSignals, getStaticFallbackFilters } from '@/lib/context-engine';
import { WeatherData } from '@/types/context';
import { DEFAULT_LOCATION } from '@/lib/constants';

interface AppState {
  signals: ContextSignals;
  filters: FilterPill[];
  activeFilterIds: string[];
  places: Business[];
  events: EventItem[];
  deals: Deal[];
  savedItemIds: string[];
  isLoading: boolean;
}

interface AppContextValue extends AppState {
  toggleFilter: (id: string) => void;
  saveItem: (id: string) => void;
  unsaveItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  setPlaces: (places: Business[]) => void;
  setEvents: (events: EventItem[]) => void;
  setDeals: (deals: Deal[]) => void;
  setFilters: (filters: FilterPill[]) => void;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const SAVED_ITEMS_KEY = 'rightnow-saved-items';

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
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [filters, setFilters] = useState<FilterPill[]>([]);
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [places, setPlaces] = useState<Business[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [savedItemIds, setSavedItemIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const signals = useMemo(
    () => buildContextSignals(location, weather),
    [location, weather]
  );

  useEffect(() => {
    setSavedItemIds(loadSavedIds());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItemIds));
  }, [savedItemIds]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocation(DEFAULT_LOCATION),
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    fetch(`/api/weather?lat=${location.lat}&lng=${location.lng}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.temp !== undefined) setWeather(data);
      })
      .catch(() => {});
  }, [location]);

  useEffect(() => {
    if (filters.length === 0) {
      setFilters(getStaticFallbackFilters(signals));
    }
  }, [signals, filters.length]);

  useEffect(() => {
    if (!location) return;
    const controller = new AbortController();
    fetch('/api/context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signals: { ...signals, timestamp: signals.timestamp.toISOString() } }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.filters && data.filters.length > 0) {
          setFilters(data.filters);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, signals.mealPeriod, signals.weather?.condition]);

  const toggleFilter = useCallback((id: string) => {
    setActiveFilterIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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

  const value: AppContextValue = {
    signals,
    filters,
    activeFilterIds,
    places,
    events,
    deals,
    savedItemIds,
    isLoading,
    toggleFilter,
    saveItem,
    unsaveItem,
    isSaved,
    setPlaces,
    setEvents,
    setDeals,
    setFilters,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
