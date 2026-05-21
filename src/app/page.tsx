'use client';

import { useCallback, useRef, useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { FilterPillBar } from '@/components/filters/FilterPillBar';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { BottomCardSlot } from '@/components/map/BottomCardSlot';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES, CityId, CITY_IDS } from '@/data/city-meta';
import { Bookmark, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { selectedCity, setCity, shortlistIds } = useAppContext();
  const [shortlistSheetOpen, setShortlistSheetOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cityName = CITIES[selectedCity].name;

  const handleCitySelect = useCallback((city: CityId) => {
    setCity(city);
    setCityDropdownOpen(false);
  }, [setCity]);

  return (
    <main className="h-dvh relative overflow-hidden">
      <MapContainer />

      <header className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between px-4 py-2.5 bg-white/60 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setCityDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5"
          >
            <Image src="/yelp-icon.svg" alt="" width={18} height={22} className="flex-shrink-0" />
            <h1 className="text-base font-bold text-gray-900 leading-tight">{cityName}</h1>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px]">
              {CITY_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => handleCitySelect(id)}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    selectedCity === id
                      ? 'bg-red-50 text-brand-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {CITIES[id].name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setShortlistSheetOpen(true)}
          className="relative p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <Bookmark size={20} className="text-gray-700" />
          {shortlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {String(shortlistIds.length).padStart(2, '0')}
            </span>
          )}
        </button>
      </header>

      <FilterPillBar />
      <BottomCardSlot />

      <BottomSheet isOpen={shortlistSheetOpen} onClose={() => setShortlistSheetOpen(false)} />
    </main>
  );
}
