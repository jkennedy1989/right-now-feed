'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { getAllBusinesses, TORONTO_CENTER, ContentBusiness, CategoryFilter, getBusinessCategory } from '@/data/toronto-content';
import { useAppContext } from '@/providers/AppContextProvider';
import { RefreshCw } from 'lucide-react';

const DEFAULT_ZOOM = 14;
const INITIAL_PIN_COUNT = 40;

const CATEGORY_PILLS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'things-to-do', label: 'Things to do' },
  { id: 'events', label: 'Events' },
  { id: 'services', label: 'Services' },
];

function MapInner() {
  const map = useMap();
  const hasInitialized = useRef(false);
  const isProgrammatic = useRef(false);
  const [showRedoButton, setShowRedoButton] = useState(false);
  const [hasFilterActive, setHasFilterActive] = useState(false);

  const {
    selectedBusiness,
    activeModule,
    activeCategory,
    setActiveCategory,
    selectBusinessByName,
  } = useAppContext();

  const allBusinesses = useMemo(() => {
    return getAllBusinesses().filter(
      (b) => b.location.lat !== 43.6532 || b.location.lng !== -79.3832
    );
  }, []);

  // Initial curated set: pick 40 with a good mix of categories
  const initialBusinesses = useMemo(() => {
    const restaurants = allBusinesses.filter((b) => getBusinessCategory(b.name) === 'restaurants');
    const thingsToDo = allBusinesses.filter((b) => getBusinessCategory(b.name) === 'things-to-do');
    const mixed: ContentBusiness[] = [];
    const rSlice = restaurants.sort((a, b) => b.rating - a.rating).slice(0, 30);
    const tSlice = thingsToDo.sort((a, b) => b.rating - a.rating).slice(0, 10);
    mixed.push(...rSlice, ...tSlice);
    return mixed.slice(0, INITIAL_PIN_COUNT);
  }, [allBusinesses]);

  const visibleBusinesses = useMemo(() => {
    if (activeModule) return activeModule.businesses.filter((b) => b.location.lat !== 43.6532 || b.location.lng !== -79.3832);
    if (hasFilterActive || activeCategory !== 'all') {
      if (activeCategory === 'all') return allBusinesses;
      return allBusinesses.filter((b) => getBusinessCategory(b.name) === activeCategory);
    }
    return initialBusinesses;
  }, [activeModule, activeCategory, allBusinesses, initialBusinesses, hasFilterActive]);

  // Initial load — zoom to a comfortable level
  useEffect(() => {
    if (!map || hasInitialized.current) return;
    hasInitialized.current = true;
    map.panTo(TORONTO_CENTER);
    map.setZoom(DEFAULT_ZOOM);
  }, [map]);

  // When active module changes, fit bounds to its businesses
  useEffect(() => {
    if (!map || !activeModule) return;
    isProgrammatic.current = true;
    const bizes = activeModule.businesses.filter((b) => b.location.lat !== 43.6532 || b.location.lng !== -79.3832);

    if (bizes.length === 1) {
      map.panTo(bizes[0].location);
      map.setZoom(15);
      return;
    }

    if (bizes.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bounds = new (window as any).google.maps.LatLngBounds();
      bizes.forEach((b) => bounds.extend(b.location));
      map.fitBounds(bounds, { top: 60, bottom: 20, left: 20, right: 20 });
    }
  }, [map, activeModule?.id]);

  // Pan to selected business
  useEffect(() => {
    if (!map || !selectedBusiness) return;
    if (selectedBusiness.location.lat === 43.6532 && selectedBusiness.location.lng === -79.3832) return;
    isProgrammatic.current = true;
    map.panTo(selectedBusiness.location);
  }, [map, selectedBusiness]);

  // Show redo button when user pans/zooms (not programmatic)
  const handleIdle = useCallback(() => {
    if (isProgrammatic.current) {
      isProgrammatic.current = false;
      return;
    }
    if (!activeModule) {
      setShowRedoButton(true);
    }
  }, [activeModule]);

  // When filter pill is clicked, show all relevant pins and hide redo button
  const handleCategoryClick = useCallback((cat: CategoryFilter) => {
    setActiveCategory(cat);
    setHasFilterActive(true);
    setShowRedoButton(false);
  }, [setActiveCategory]);

  // "Search in this area" loads all pins for the current category
  const handleRedoSearch = useCallback(() => {
    setHasFilterActive(true);
    setShowRedoButton(false);
  }, []);

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
        onIdle={handleIdle}
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
                  isSelected ? 'w-10 h-10 bg-brand scale-110' : 'w-7 h-7 bg-brand'
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

      {/* Category filter pills */}
      {!activeModule && (
        <div className="absolute top-[72px] left-0 right-0 z-20 flex gap-2 overflow-x-auto scrollbar-hide px-3">
          {CATEGORY_PILLS.map((pill) => (
            <button
              key={pill.id}
              onClick={() => handleCategoryClick(pill.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === pill.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}

      {/* Redo search button */}
      {showRedoButton && !activeModule && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={handleRedoSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-xs font-medium text-gray-700 whitespace-nowrap hover:bg-white/90 active:bg-white transition-all"
          >
            <RefreshCw size={12} className="text-gray-500" />
            <span>Search in this area</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function MapContainer() {
  return <MapInner />;
}
