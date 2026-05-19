'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { ScrollRow } from '@/components/cards/ScrollRow';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { MEAL_PERIOD_LABELS } from '@/lib/constants';

export function MealTimeRow() {
  const { signals, places } = useAppContext();

  const mealInfo = MEAL_PERIOD_LABELS[signals.mealPeriod];
  const relevantPlaces = places
    .filter((p) => p.isOpenNow)
    .sort((a, b) => {
      if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance;
      return b.rating - a.rating;
    })
    .slice(0, 10);

  if (relevantPlaces.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">
          {mealInfo.title} {mealInfo.emoji}
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Open and serving right now</p>
      </div>
      <ScrollRow>
        {relevantPlaces.map((place) => (
          <BusinessCard key={place.id} business={place} variant="compact" />
        ))}
      </ScrollRow>
    </section>
  );
}
