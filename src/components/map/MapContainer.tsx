'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { Business } from '@/types';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { MarkerPin } from './MarkerPin';
import { CATEGORY_EMOJI } from '@/lib/constants';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Locate, RefreshCw } from 'lucide-react';

const DEFAULT_ZOOM = 14;
const MAX_PINS = 20;
const INITIAL_PIN_CAP = 20;

function getCuisineEmoji(cuisine: string): string {
  const lower = cuisine.toLowerCase();
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJI)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
}

function haversineDistance(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function MapInner() {
  const {
    selectedCity,
    places,
    activePrimaryIds,
    shortlistIds,
    showShortlistOnly,
    setViewportCenter,
    onMapUserPan,
    triggerRedoSearch,
    showRedoButton,
    hasUserInteracted,
    setSelectedBusinessId,
    selectedBusinessId,
    searchOverride,
    pendingFitToResults,
    clearPendingFit,
    secondaryFilters,
    badgeMap,
    listViewMode,
    setListActiveIndex,
    viewportCenter,
  } = useAppContext();
  const map = useMap();
  const { location: userLocation } = useGeolocation();
  const isProgrammaticMove = useRef(false);

  const cityCenter = CITIES[selectedCity].center;
  const hasActiveFilter = activePrimaryIds.length > 0;
  const hasSecondaryRow = !searchOverride && hasActiveFilter && secondaryFilters.length > 0;

  // Always center on city on initial load (not user location)
  useEffect(() => {
    if (!map) return;
    isProgrammaticMove.current = true;
    map.panTo(cityCenter);
    map.setZoom(DEFAULT_ZOOM);
    setViewportCenter(cityCenter);
  }, [map, cityCenter, selectedCity, setViewportCenter]);

  // Fit bounds to shortlisted items
  useEffect(() => {
    if (!map || !showShortlistOnly) return;
    const savedSet = new Set(shortlistIds);
    const savedPlaces = places.filter((p) => savedSet.has(p.id));
    if (savedPlaces.length === 0) return;

    isProgrammaticMove.current = true;
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

  // Fit bounds to show search override results
  useEffect(() => {
    if (!map || !pendingFitToResults || !searchOverride) return;
    const dynamicResults = places.filter((p) => p.source === 'google');
    if (dynamicResults.length === 0) return;

    clearPendingFit();
    isProgrammaticMove.current = true;

    if (dynamicResults.length === 1) {
      map.panTo(dynamicResults[0].location);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bounds = new (window as any).google.maps.LatLngBounds();
    dynamicResults.slice(0, 10).forEach((p) => bounds.extend(p.location));
    map.fitBounds(bounds, { top: 120, bottom: 200, left: 40, right: 40 });
  }, [map, pendingFitToResults, searchOverride, places, clearPendingFit]);

  // Pan to selected business
  useEffect(() => {
    if (!map || !selectedBusinessId) return;
    const place = places.find((p) => p.id === selectedBusinessId);
    if (place) {
      isProgrammaticMove.current = true;
      map.panTo(place.location);
    }
  }, [map, selectedBusinessId, places]);

  // List view: fit bounds to all list businesses, pan to active
  useEffect(() => {
    if (!map || !listViewMode || listViewMode.businesses.length === 0) return;

    isProgrammaticMove.current = true;
    if (listViewMode.businesses.length === 1) {
      map.panTo(listViewMode.businesses[0].location);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bounds = new (window as any).google.maps.LatLngBounds();
    listViewMode.businesses.forEach((p) => bounds.extend(p.location));
    map.fitBounds(bounds, { top: 80, bottom: 280, left: 40, right: 40 });
  }, [map, listViewMode?.businesses.length, listViewMode?.listId]);

  // Pan to active list card
  useEffect(() => {
    if (!map || !listViewMode || listViewMode.businesses.length === 0) return;
    const active = listViewMode.businesses[listViewMode.activeIndex];
    if (active) {
      isProgrammaticMove.current = true;
      map.panTo(active.location);
    }
  }, [map, listViewMode?.activeIndex]);

  const handleIdle = useCallback(() => {
    if (!map) return;
    const center = map.getCenter();
    if (center) {
      const newCenter = { lat: center.lat(), lng: center.lng() };
      setViewportCenter(newCenter);
      if (!isProgrammaticMove.current && !listViewMode) {
        onMapUserPan(newCenter);
      }
      isProgrammaticMove.current = false;
    }
  }, [map, setViewportCenter, onMapUserPan, listViewMode]);

  const handleRecenter = useCallback(() => {
    if (!map) return;
    const target = userLocation || cityCenter;
    isProgrammaticMove.current = true;
    map.panTo(target);
    map.setZoom(DEFAULT_ZOOM);
    setViewportCenter(target);
  }, [map, userLocation, cityCenter, setViewportCenter]);

  const visiblePlaces = useMemo(() => {
    if (listViewMode) {
      return listViewMode.businesses;
    }

    if (showShortlistOnly) {
      const savedSet = new Set(shortlistIds);
      return places.filter((p) => savedSet.has(p.id));
    }

    if (searchOverride) {
      return places.filter((p) => p.source === 'google').slice(0, MAX_PINS);
    }

    if (selectedBusinessId && !hasActiveFilter) {
      const selected = places.find((p) => p.id === selectedBusinessId);
      return selected ? [selected] : [];
    }

    const pinCap = MAX_PINS;

    if (!hasActiveFilter) {
      const curated = places.filter((p) => p.source === 'curated').slice(0, pinCap);
      const remaining = pinCap - curated.length;
      if (remaining > 0) {
        const dynamic = places.filter((p) => p.source === 'google').slice(0, remaining);
        return [...curated, ...dynamic];
      }
      return curated;
    }

    const dynamic = places.filter((p) => p.source === 'google');
    return dynamic.slice(0, pinCap);
  }, [places, hasActiveFilter, showShortlistOnly, shortlistIds, searchOverride, selectedBusinessId, hasUserInteracted, listViewMode]);

  // Compute which pins get labels (top 4 closest to viewport + selected)
  const labeledPinIds = useMemo(() => {
    const ids = new Set<string>();
    if (selectedBusinessId) ids.add(selectedBusinessId);
    if (listViewMode && listViewMode.businesses[listViewMode.activeIndex]) {
      ids.add(listViewMode.businesses[listViewMode.activeIndex].id);
    }

    if (viewportCenter && visiblePlaces.length > 0) {
      const withDist = visiblePlaces
        .filter((p) => !ids.has(p.id))
        .map((p) => ({ id: p.id, dist: haversineDistance(viewportCenter, p.location) }))
        .sort((a, b) => a.dist - b.dist);
      withDist.slice(0, 4).forEach((p) => ids.add(p.id));
    }

    return ids;
  }, [visiblePlaces, viewportCenter, selectedBusinessId, listViewMode]);

  const handleMarkerClick = useCallback((business: Business) => {
    if (listViewMode) {
      const idx = listViewMode.businesses.findIndex((b) => b.id === business.id);
      if (idx >= 0) setListActiveIndex(idx);
    } else {
      setSelectedBusinessId(business.id);
    }
  }, [setSelectedBusinessId, listViewMode, setListActiveIndex]);

  return (
    <div className="absolute inset-0">
      <Map
        defaultCenter={cityCenter}
        defaultZoom={DEFAULT_ZOOM}
        mapId="6891744d9000b9738574e55f"
        colorScheme="LIGHT"
        gestureHandling="greedy"
        disableDefaultUI
        clickableIcons={false}
        onIdle={handleIdle}
        onClick={() => !listViewMode && setSelectedBusinessId(null)}
        style={{ width: '100%', height: '100%' }}
      >
        {visiblePlaces.map((place) => {
          const emoji = getCuisineEmoji(place.cuisine);
          const isGoogle = place.source === 'google';
          const isSelected = place.id === selectedBusinessId ||
            (listViewMode && listViewMode.businesses[listViewMode.activeIndex]?.id === place.id);
          const color = isSelected ? '#E00707' : hasActiveFilter || listViewMode ? '#E00707' : '#6B7280';

          return (
            <AdvancedMarker
              key={place.id}
              position={place.location}
              onClick={() => handleMarkerClick(place)}
            >
              <MarkerPin
                emoji={emoji}
                color={color}
                isActive={hasActiveFilter || !!isSelected || !!listViewMode}
                pulse={!!isSelected}
                small={isGoogle && !hasActiveFilter && !isSelected && !listViewMode}
                badge={badgeMap.get(place.id)}
                label={place.name}
                showLabel={labeledPinIds.has(place.id)}
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

      {showRedoButton && !listViewMode && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={triggerRedoSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-lg text-xs font-medium text-gray-700 border border-gray-200 whitespace-nowrap hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            <RefreshCw size={14} className="text-gray-500" />
            <span>Redo search in this area</span>
          </button>
        </div>
      )}

      {!listViewMode && (
        <button
          onClick={handleRecenter}
          className={`absolute ${hasSecondaryRow ? 'bottom-56' : 'bottom-48'} right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-all duration-200`}
          title="Center on my location"
        >
          <Locate size={20} className="text-gray-700" />
        </button>
      )}
    </div>
  );
}

export function MapContainer() {
  return <MapInner />;
}
