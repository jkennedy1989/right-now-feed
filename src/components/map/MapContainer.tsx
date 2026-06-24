'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { getTopBusinesses, TORONTO_CENTER, ContentBusiness } from '@/data/toronto-content';

const DEFAULT_ZOOM = 13;
const MAX_PINS = 20;

function MapInner() {
  const map = useMap();
  const hasInitialized = useRef(false);

  const businesses = useMemo(() => getTopBusinesses(MAX_PINS), []);

  useEffect(() => {
    if (!map || hasInitialized.current) return;
    hasInitialized.current = true;

    if (businesses.length >= 10) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bounds = new (window as any).google.maps.LatLngBounds();
      businesses.slice(0, 15).forEach((b) => bounds.extend(b.location));
      map.fitBounds(bounds, { top: 60, bottom: 20, left: 20, right: 20 });
    } else {
      map.panTo(TORONTO_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [map, businesses]);

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
        {businesses.map((biz) => (
          <AdvancedMarker
            key={biz.name}
            position={biz.location}
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-brand shadow-lg border-2 border-white flex items-center justify-center text-sm">
                🍽️
              </div>
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}

export function MapContainer() {
  return <MapInner />;
}
