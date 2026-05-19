'use client';

import { useCallback, useEffect, useState } from 'react';
import { Business } from '@/types';

interface UseNearbyPlacesParams {
  lat: number | null;
  lng: number | null;
  type?: string;
  keyword?: string;
  openNow?: boolean;
  radius?: number;
}

export function useNearbyPlaces(params: UseNearbyPlacesParams) {
  const [places, setPlaces] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaces = useCallback(async () => {
    if (!params.lat || !params.lng) return;
    setIsLoading(true);

    const searchParams = new URLSearchParams({
      lat: String(params.lat),
      lng: String(params.lng),
      radius: String(params.radius || 1500),
    });
    if (params.type) searchParams.set('type', params.type);
    if (params.keyword) searchParams.set('keyword', params.keyword);
    if (params.openNow) searchParams.set('openNow', 'true');

    try {
      const res = await fetch(`/api/places?${searchParams}`);
      const data = await res.json();
      if (Array.isArray(data)) setPlaces(data);
    } catch {
      // Keep existing places on error
    } finally {
      setIsLoading(false);
    }
  }, [params.lat, params.lng, params.type, params.keyword, params.openNow, params.radius]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return { places, isLoading, refetch: fetchPlaces };
}
