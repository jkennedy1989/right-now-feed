'use client';

import { useCallback, useMemo, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import { Business } from '@/types';
import { useAppContext } from '@/providers/AppContextProvider';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from '@/lib/constants';
import { MapInfoCard } from './MapInfoCard';
import { MarkerPin } from './MarkerPin';
import { getCategoryEmoji } from '@/lib/api-clients/google-places';
import { getFilterColor } from '@/lib/filter-color-map';

interface MapContainerProps {
  height: number;
}

export function MapContainer({ height }: MapContainerProps) {
  const { signals, places, filters, activeFilterIds } = useAppContext();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const center = signals.location || DEFAULT_LOCATION;

  const filterCategoryMap = useMemo(() => {
    const map = new globalThis.Map<string, string>();
    filters.forEach((f) => map.set(f.id, f.category));
    return map;
  }, [filters]);

  const hasActiveFilters = activeFilterIds.length > 0;

  const handleMarkerClick = useCallback((business: Business) => {
    setSelectedBusiness(business);
  }, []);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  return (
    <div
      className="relative w-full transition-[height] duration-300 ease-out"
      style={{ height: `${height}vh` }}
    >
      <Map
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: DEFAULT_ZOOM,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />
        {places.map((place) => {
          const matchesFilter = hasActiveFilters
            ? activeFilterIds.some((filterId) => {
                const category = filterCategoryMap.get(filterId);
                if (!category) return false;
                if (category === 'open-now') return place.isOpenNow;
                return (
                  place.categories.includes(category) ||
                  place.primaryCategory === category
                );
              })
            : true;

          const emoji = getCategoryEmoji(place.primaryCategory);
          const color = getFilterColor(place.primaryCategory).marker;

          return (
            <Marker
              key={place.id}
              longitude={place.location.lng}
              latitude={place.location.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(place);
              }}
            >
              <div style={{ opacity: hasActiveFilters && !matchesFilter ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
                <MarkerPin
                  emoji={emoji}
                  color={color}
                  isActive={matchesFilter && hasActiveFilters}
                  pulse={false}
                />
              </div>
            </Marker>
          );
        })}
      </Map>

      {selectedBusiness && (
        <MapInfoCard
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  );
}
