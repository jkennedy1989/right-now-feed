'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Business } from '@/types';

const TWO_MILES_METERS = 3219;

interface UseDynamicPlacesParams {
  viewportCenter: { lat: number; lng: number } | null;
  searchKeyword: string | null;
  selectedCity: string;
  curatedCount: number;
}

export function useDynamicPlaces({ viewportCenter, searchKeyword, selectedCity, curatedCount }: UseDynamicPlacesParams) {
  const [dynamicPlaces, setDynamicPlaces] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastFetchKey = useRef('');

  const fetchPlaces = useCallback(async (center: { lat: number; lng: number }, keyword?: string) => {
    const fetchKey = `${center.lat.toFixed(3)}_${center.lng.toFixed(3)}_${keyword || ''}`;
    if (fetchKey === lastFetchKey.current) return;
    lastFetchKey.current = fetchKey;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        lat: center.lat.toString(),
        lng: center.lng.toString(),
        radius: TWO_MILES_METERS.toString(),
        maxResults: '40',
      });
      if (keyword) params.set('keyword', keyword);

      const res = await fetch(`/api/places?${params}`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      if (data.results) {
        setDynamicPlaces(data.results);
      }
    } catch {
      // Silent fail — curated data still shows
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Keyword-triggered fetch (auto-fetches on filter/search change)
  useEffect(() => {
    if (!viewportCenter) return;

    if (!searchKeyword) {
      if (curatedCount >= 40) {
        setDynamicPlaces([]);
        lastFetchKey.current = '';
        return;
      }
      fetchPlaces(viewportCenter, 'restaurant');
      return;
    }

    fetchPlaces(viewportCenter, searchKeyword);
  }, [viewportCenter, searchKeyword, fetchPlaces, curatedCount]);

  // Manual redo search (called when user taps "Redo search in this area")
  const redoSearch = useCallback((center: { lat: number; lng: number }, keyword?: string) => {
    lastFetchKey.current = '';
    fetchPlaces(center, keyword || 'restaurant');
  }, [fetchPlaces]);

  // Reset on city change
  useEffect(() => {
    setDynamicPlaces([]);
    lastFetchKey.current = '';
  }, [selectedCity]);

  return { dynamicPlaces, isLoading, redoSearch };
}
