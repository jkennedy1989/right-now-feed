'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { NeighborhoodCard } from './NeighborhoodCard';
import { BusinessDetailCard } from './BusinessDetailCard';

export function BottomCardSlot() {
  const { selectedBusinessId } = useAppContext();

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20">
      {selectedBusinessId ? <BusinessDetailCard /> : <NeighborhoodCard />}
    </div>
  );
}
