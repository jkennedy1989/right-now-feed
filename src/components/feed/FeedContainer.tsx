'use client';

import { NeighborhoodModule } from './NeighborhoodModule';
import { DontMissOutModule } from './DontMissOutModule';
import { MealTimeRow } from './MealTimeRow';
import { AvailabilitySection } from './AvailabilitySection';
import { TrendingSection } from './TrendingSection';

export function FeedContainer() {
  return (
    <div className="bg-gray-50 min-h-[60vh] pb-24">
      <NeighborhoodModule />
      <DontMissOutModule />
      <MealTimeRow />
      <AvailabilitySection />
      <TrendingSection />
    </div>
  );
}
