'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { Business } from '@/types';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { MapInfoCard } from './MapInfoCard';
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
  const { selectedCity, places, activePrimaryId, setViewportCenter, onViewportChange } = useAppContext();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
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

  const hasActiveFilter = !!activePrimaryId;

  const visiblePlaces = useMemo(() => {
    if (!hasActiveFilter) {
      // No filter: show top 40 curated, fill remaining with dynamic
      const curated = places.filter((p) => p.source === 'curated').slice(0, MAX_PINS);
      const remaining = MAX_PINS - curated.length;
      if (remaining > 0) {
        const dynamic = places.filter((p) => p.source === 'google').slice(0, remaining);
        return [...curated, ...dynamic];
      }
      return curated;
    }

    // With a filter active, show all matching places (from dynamic search results + curated)
    // Dynamic results are already filtered by keyword from the API
    // Show dynamic first (most relevant), fill with curated
    const dynamic = places.filter((p) => p.source === 'google');
    const curated = places.filter((p) => p.source === 'curated');
    return [...dynamic, ...curated].slice(0, MAX_PINS);
  }, [places, hasActiveFilter]);

  const handleMarkerClick = useCallback((business: Business) => {
    setSelectedBusiness(business);
  }, []);

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
        style={{ width: '100%', height: '100%' }}
      >
        {visiblePlaces.map((place) => {
          const emoji = getCuisineEmoji(place.cuisine);
          const isGoogle = place.source === 'google';
          const color = hasActiveFilter ? '#E00707' : '#6B7280';

          return (
            <AdvancedMarker
              key={place.id}
              position={place.location}
              onClick={() => handleMarkerClick(place)}
            >
              <MarkerPin
                emoji={emoji}
                color={color}
                isActive={hasActiveFilter}
                pulse={false}
                small={isGoogle && !hasActiveFilter}
              />
            </AdvancedMarker>
          );
        })}

        {selectedBusiness && (
          <InfoWindow
            position={selectedBusiness.location}
            onCloseClick={() => setSelectedBusiness(null)}
            pixelOffset={[0, -40]}
          >
            <MapInfoCard
              business={selectedBusiness}
              onClose={() => setSelectedBusiness(null)}
            />
          </InfoWindow>
        )}

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
        className="absolute top-16 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
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
