'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { NeighborhoodCard } from './NeighborhoodCard';
import { BusinessDetailCard } from './BusinessDetailCard';
import { FilterPillBar } from '@/components/filters/FilterPillBar';

export function BottomCardSlot() {
  const { selectedBusinessId } = useAppContext();

  if (selectedBusinessId) {
    return (
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <BusinessDetailCard />
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-col gap-2">
      <FilterPillBar />
      <div className="px-4">
        <NeighborhoodCard />
      </div>
    </div>
  );
}
