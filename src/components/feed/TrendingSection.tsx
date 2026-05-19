'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { TrendingUp } from 'lucide-react';

export function TrendingSection() {
  const { places } = useAppContext();

  const trending = [...places]
    .sort((a, b) => {
      const scoreA = a.rating * Math.log10(a.reviewCount + 1);
      const scoreB = b.rating * Math.log10(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  if (trending.length === 0) return null;

  return (
    <section className="mt-6 mb-8">
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-rose-500" />
          <h2 className="text-base font-bold text-gray-900">Trending near you</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">Most popular this week</p>
      </div>
      <div className="px-4 space-y-2">
        {trending.map((business, index) => (
          <div key={business.id} className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-300 w-6 text-center">
              {index + 1}
            </span>
            <div className="flex-1">
              <BusinessCard business={business} variant="full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
