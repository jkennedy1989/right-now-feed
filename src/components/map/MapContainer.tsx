'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { getTopBusinesses, TORONTO_CENTER, ContentBusiness } from '@/data/toronto-content';
import { useAppContext } from '@/providers/AppContextProvider';

const DEFAULT_ZOOM = 13;
const MAX_PINS = 20;

function MapInner() {
  const map = useMap();
  const hasInitialized = useRef(false);
  const isProgrammatic = useRef(false);

  const {
    selectedBusiness,
    activeModule,
    activeBusinessIndex,
    selectBusinessByName,
  } = useAppContext();

  const defaultBusinesses = useMemo(() => getTopBusinesses(MAX_PINS), []);

  const visibleBusinesses = useMemo(() => {
    if (activeModule) return activeModule.businesses;
    return defaultBusinesses;
  }, [activeModule, defaultBusinesses]);

  // Initial load — fit bounds to default pins
  useEffect(() => {
    if (!map || hasInitialized.current) return;
    hasInitialized.current = true;

    if (defaultBusinesses.length >= 10) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bounds = new (window as any).google.maps.LatLngBounds();
      defaultBusinesses.slice(0, 15).forEach((b) => bounds.extend(b.location));
      map.fitBounds(bounds, { top: 60, bottom: 20, left: 20, right: 20 });
    } else {
      map.panTo(TORONTO_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [map, defaultBusinesses]);

  // When active module changes, fit bounds to its businesses
  useEffect(() => {
    if (!map || !activeModule) return;
    isProgrammatic.current = true;

    if (activeModule.businesses.length === 1) {
      map.panTo(activeModule.businesses[0].location);
      map.setZoom(15);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bounds = new (window as any).google.maps.LatLngBounds();
    activeModule.businesses.forEach((b) => bounds.extend(b.location));
    map.fitBounds(bounds, { top: 60, bottom: 20, left: 20, right: 20 });
  }, [map, activeModule?.id]);

  // Pan to selected business
  useEffect(() => {
    if (!map || !selectedBusiness) return;
    isProgrammatic.current = true;
    map.panTo(selectedBusiness.location);
  }, [map, selectedBusiness]);

  const handleMarkerClick = useCallback((biz: ContentBusiness) => {
    selectBusinessByName(biz.name);
  }, [selectBusinessByName]);

  return (
    <div className="absolute inset-0">
      <Map
        defaultCenter={TORONTO_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        mapId="6891744d9000b9738574e55f"
        colorScheme="LIGHT"
        gestureHandling="greedy"
        disableDefaultUI
        clickableIcons={false}
        style={{ width: '100%', height: '100%' }}
      >
        {visibleBusinesses.map((biz) => {
          const isSelected = selectedBusiness?.name === biz.name;
          return (
            <AdvancedMarker
              key={biz.name}
              position={biz.location}
              onClick={() => handleMarkerClick(biz)}
            >
              <div className="flex flex-col items-center">
                <div className={`rounded-full shadow-lg border-2 border-white flex items-center justify-center text-sm transition-transform ${
                  isSelected ? 'w-10 h-10 bg-brand scale-110' : 'w-8 h-8 bg-brand'
                }`}>
                  🍽️
                </div>
                {isSelected && (
                  <div className="mt-1 whitespace-nowrap text-[10px] font-semibold text-gray-900 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm max-w-[80px] truncate text-center">
                    {biz.name}
                  </div>
                )}
              </div>
            </AdvancedMarker>
          );
        })}
      </Map>
    </div>
  );
}

export function MapContainer() {
  return <MapInner />;
}
