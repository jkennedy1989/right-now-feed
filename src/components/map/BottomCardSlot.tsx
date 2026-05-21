'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { NeighborhoodCard } from './NeighborhoodCard';
import { BusinessDetailCard } from './BusinessDetailCard';

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
    <div className="absolute bottom-[72px] left-4 right-4 z-20">
      <NeighborhoodCard />
    </div>
  );
}
