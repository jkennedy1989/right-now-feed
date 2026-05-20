'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES, CITY_IDS } from '@/data/city-meta';
import { cn } from '@/lib/utils';

export function CityToggle() {
  const { selectedCity, setCity } = useAppContext();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5">
      {CITY_IDS.map((id) => (
        <button
          key={id}
          onClick={() => setCity(id)}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
            selectedCity === id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {CITIES[id].shortName}
        </button>
      ))}
    </div>
  );
}
