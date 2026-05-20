'use client';

import { useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { FilterPillBar } from '@/components/filters/FilterPillBar';
import { FeedContainer } from '@/components/feed/FeedContainer';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useAppContext } from '@/providers/AppContextProvider';
import { CityToggle } from '@/components/header/CityToggle';
import { CITIES } from '@/data/city-meta';
import { Bookmark, MapPin } from 'lucide-react';
import { FeedOverlay } from '@/components/feed/FeedOverlay';

export default function HomePage() {
  const { selectedCity, savedItemIds } = useAppContext();
  const [savedSheetOpen, setSavedSheetOpen] = useState(false);

  const cityName = CITIES[selectedCity].name;

  return (
    <main className="h-dvh relative overflow-hidden bg-gray-50">
      <MapContainer />

      <header className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between px-4 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-red-500" />
          <h1 className="text-base font-bold text-gray-900 leading-tight">{cityName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <CityToggle />
          <button
            onClick={() => setSavedSheetOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <Bookmark size={20} className="text-gray-700" />
            {savedItemIds.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedItemIds.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <FilterPillBar />
      <FeedOverlay>
        <FeedContainer />
      </FeedOverlay>

      <BottomSheet isOpen={savedSheetOpen} onClose={() => setSavedSheetOpen(false)} />
    </main>
  );
}
