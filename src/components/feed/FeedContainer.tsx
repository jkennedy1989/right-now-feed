'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { NeighborhoodModule } from './NeighborhoodModule';
import { DontMissOutModule } from './DontMissOutModule';
import { MealTimeRow } from './MealTimeRow';
import { AvailabilitySection } from './AvailabilitySection';
import { TrendingSection } from './TrendingSection';
import { NearYouSection } from './NearYouSection';

export function FeedContainer() {
  const { activePrimaryId, primaryFilters } = useAppContext();

  const activePill = primaryFilters.find((p) => p.id === activePrimaryId);
  const signal = activePill?.signal;

  const showMeal = !signal || signal === 'time';
  const showAllSections = !signal || signal === 'weather' || signal === 'vibe' || signal === 'events';

  return (
    <div className="bg-white min-h-[60vh] pb-24">
      <NeighborhoodModule />
      {(showMeal || showAllSections) && <MealTimeRow />}
      {showAllSections && <DontMissOutModule />}
      {showAllSections && <AvailabilitySection />}
      {showAllSections && <TrendingSection />}
      <NearYouSection />
    </div>
  );
}
