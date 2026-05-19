'use client';

import { useCallback, useMemo, useState } from 'react';
import { Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Business } from '@/types';
import { useAppContext } from '@/providers/AppContextProvider';
import { DEFAULT_LOCATION, DEFAULT_ZOOM } from '@/lib/constants';
import { MapMarkers } from './MapMarkers';
import { MapInfoCard } from './MapInfoCard';

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

  const handleMarkerClick = useCallback((business: Business) => {
    setSelectedBusiness(business);
  }, []);

  return (
    <div
      className="relative w-full transition-[height] duration-300 ease-out"
      style={{ height: `${height}vh` }}
    >
      <GoogleMap
        defaultCenter={center}
        defaultZoom={DEFAULT_ZOOM}
        mapId="right-now-feed-map"
        disableDefaultUI
        gestureHandling="greedy"
        className="w-full h-full"
      >
        <MapMarkers
          places={places}
          activeFilterIds={activeFilterIds}
          filterCategoryMap={filterCategoryMap}
          onMarkerClick={handleMarkerClick}
        />
      </GoogleMap>

      {selectedBusiness && (
        <MapInfoCard
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  );
}
