'use client';

import { useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { MapPin } from 'lucide-react';

export function NearYouSection() {
  const { places, isDynamicLoading } = useAppContext();

  const dynamicPlaces = useMemo(() => {
    return places
      .filter((p) => p.source === 'google')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 15);
  }, [places]);

  if (dynamicPlaces.length === 0 && !isDynamicLoading) return null;

  return (
    <section className="mt-6 px-4">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-brand" />
          <h2 className="text-base font-bold text-gray-900">More places nearby</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">Discovered from Google Maps</p>
      </div>

      {isDynamicLoading && dynamicPlaces.length === 0 ? (
        <div className="flex items-center gap-2 py-4">
          <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-500">Finding nearby places...</span>
        </div>
      ) : (
        <div className="space-y-2">
          {dynamicPlaces.map((place) => (
            <BusinessCard key={place.id} business={place} variant="full" />
          ))}
        </div>
      )}
    </section>
  );
}
