'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_LOCATION } from '@/lib/constants';

interface GeolocationState {
  location: { lat: number; lng: number } | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ location: DEFAULT_LOCATION, error: 'Geolocation not supported', isLoading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
          isLoading: false,
        });
      },
      (err) => {
        setState({ location: DEFAULT_LOCATION, error: err.message, isLoading: false });
      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  return state;
}
