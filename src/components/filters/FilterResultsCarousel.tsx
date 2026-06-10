'use client';

import { useEffect, useRef } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { PhotoSlot } from '@/components/cards/PhotoSlot';
import { CITIES } from '@/data/city-meta';

export function FilterResultsCarousel() {
  const { filteredPlaces, focusedBusinessId, setFocusedBusinessId, badgeMap, selectedCity } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cityName = CITIES[selectedCity].name;

  useEffect(() => {
    if (!focusedBusinessId || !scrollRef.current) return;
    const index = filteredPlaces.findIndex((p) => p.id === focusedBusinessId);
    if (index < 0) return;
    const card = scrollRef.current.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [focusedBusinessId, filteredPlaces]);

  if (filteredPlaces.length === 0) return null;

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide max-h-[120px]"
      style={{ paddingLeft: 16, paddingRight: 12 }}
    >
      {filteredPlaces.map((biz) => {
        const badge = badgeMap.get(biz.id);
        const isFocused = biz.id === focusedBusinessId;
        return (
          <button
            key={biz.id}
            onClick={() => setFocusedBusinessId(biz.id)}
            className={`flex-shrink-0 w-[120px] rounded-xl overflow-hidden border transition-all text-left bg-white ${
              isFocused
                ? 'border-brand-500 shadow-md scale-[1.02]'
                : 'border-gray-100 shadow-sm'
            }`}
          >
            <div className="h-[56px] w-full">
              <PhotoSlot name={biz.name} city={cityName} className="h-full w-full" />
            </div>
            <div className="px-1.5 py-1">
              <p className="text-[10px] font-medium text-gray-900 line-clamp-1">{biz.name}</p>
              {badge && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[9px]">{badge.emoji}</span>
                  <span className="text-[8px] text-gray-500 truncate">{badge.label}</span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
