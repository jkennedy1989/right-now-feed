'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { Business } from '@/types';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { MarkerPin } from './MarkerPin';
import { CATEGORY_EMOJI } from '@/lib/constants';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Locate } from 'lucide-react';

const DEFAULT_ZOOM = 14;
const MAX_PINS = 40;

function getCuisineEmoji(cuisine: string): string {
  const lower = cuisine.toLowerCase();
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJI)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
}

function MapInner() {
  const {
    selectedCity,
    places,
    activePrimaryIds,
    shortlistIds,
    showShortlistOnly,
    setViewportCenter,
    onViewportChange,
    setSelectedBusinessId,
    selectedBusinessId,
  } = useAppContext();
  const map = useMap();
  const { location: userLocation } = useGeolocation();
  const hasCenteredOnUser = useRef(false);

  const cityCenter = CITIES[selectedCity].center;

  useEffect(() => {
    if (!map) return;
    if (userLocation && !hasCenteredOnUser.current) {
      map.panTo(userLocation);
      map.setZoom(DEFAULT_ZOOM);
      hasCenteredOnUser.current = true;
      setViewportCenter(userLocation);
    } else if (!userLocation) {
      map.panTo(cityCenter);
      map.setZoom(DEFAULT_ZOOM);
      setViewportCenter(cityCenter);
    }
  }, [map, userLocation, cityCenter, setViewportCenter]);

  useEffect(() => {
    hasCenteredOnUser.current = false;
  }, [selectedCity]);

  useEffect(() => {
    if (map && !hasCenteredOnUser.current) {
      map.panTo(cityCenter);
      map.setZoom(DEFAULT_ZOOM);
      setViewportCenter(cityCenter);
    }
  }, [map, cityCenter, selectedCity, setViewportCenter]);

  // Fit bounds to shortlisted items
  useEffect(() => {
    if (!map || !showShortlistOnly) return;
    const savedSet = new Set(shortlistIds);
    const savedPlaces = places.filter((p) => savedSet.has(p.id));
    if (savedPlaces.length === 0) return;

    if (savedPlaces.length === 1) {
      map.panTo(savedPlaces[0].location);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bounds = new (window as any).google.maps.LatLngBounds();
    savedPlaces.forEach((p) => bounds.extend(p.location));
    map.fitBounds(bounds, { top: 120, bottom: 200, left: 40, right: 40 });
  }, [map, showShortlistOnly, shortlistIds, places]);

  const handleIdle = useCallback(() => {
    if (!map) return;
    const center = map.getCenter();
    if (center) {
      const newCenter = { lat: center.lat(), lng: center.lng() };
      setViewportCenter(newCenter);
      onViewportChange(newCenter);
    }
  }, [map, setViewportCenter, onViewportChange]);

  const handleRecenter = useCallback(() => {
    if (!map) return;
    const target = userLocation || cityCenter;
    map.panTo(target);
    map.setZoom(DEFAULT_ZOOM);
    setViewportCenter(target);
  }, [map, userLocation, cityCenter, setViewportCenter]);

  const hasActiveFilter = activePrimaryIds.length > 0;

  const visiblePlaces = useMemo(() => {
    if (showShortlistOnly) {
      const savedSet = new Set(shortlistIds);
      return places.filter((p) => savedSet.has(p.id));
    }

    if (!hasActiveFilter) {
      const curated = places.filter((p) => p.source === 'curated').slice(0, MAX_PINS);
      const remaining = MAX_PINS - curated.length;
      if (remaining > 0) {
        const dynamic = places.filter((p) => p.source === 'google').slice(0, remaining);
        return [...curated, ...dynamic];
      }
      return curated;
    }

    const dynamic = places.filter((p) => p.source === 'google');
    const curated = places.filter((p) => p.source === 'curated');
    return [...dynamic, ...curated].slice(0, MAX_PINS);
  }, [places, hasActiveFilter, showShortlistOnly, shortlistIds]);

  const handleMarkerClick = useCallback((business: Business) => {
    setSelectedBusinessId(business.id);
  }, [setSelectedBusinessId]);

  return (
    <div className="absolute inset-0">
      <Map
        defaultCenter={cityCenter}
        defaultZoom={DEFAULT_ZOOM}
        mapId="right-now-feed-map"
        colorScheme="LIGHT"
        gestureHandling="greedy"
        disableDefaultUI
        clickableIcons={false}
        onIdle={handleIdle}
        onClick={() => setSelectedBusinessId(null)}
        style={{ width: '100%', height: '100%' }}
      >
        {visiblePlaces.map((place) => {
          const emoji = getCuisineEmoji(place.cuisine);
          const isGoogle = place.source === 'google';
          const isSelected = place.id === selectedBusinessId;
          const color = isSelected ? '#E00707' : hasActiveFilter ? '#E00707' : '#6B7280';

          return (
            <AdvancedMarker
              key={place.id}
              position={place.location}
              onClick={() => handleMarkerClick(place)}
            >
              <MarkerPin
                emoji={emoji}
                color={color}
                isActive={hasActiveFilter || isSelected}
                pulse={isSelected}
                small={isGoogle && !hasActiveFilter && !isSelected}
              />
            </AdvancedMarker>
          );
        })}

        {userLocation && (
          <AdvancedMarker position={userLocation}>
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-50" />
            </div>
          </AdvancedMarker>
        )}
      </Map>

      <button
        onClick={handleRecenter}
        className="absolute bottom-48 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
        title="Center on my location"
      >
        <Locate size={20} className="text-gray-700" />
      </button>
    </div>
  );
}

export function MapContainer() {
  return <MapInner />;
}
