'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { FilterPill } from './FilterPill';

export function FilterPillBar() {
  const { filters, activeFilterIds, toggleFilter } = useAppContext();

  if (filters.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-0 right-0 z-10 px-4">
      <div className="flex gap-2 overflow-x-auto scroll-snap-x scrollbar-hide pb-1">
        {filters.map((pill) => (
          <FilterPill
            key={pill.id}
            pill={pill}
            isActive={activeFilterIds.includes(pill.id)}
            onToggle={() => toggleFilter(pill.id)}
          />
        ))}
      </div>
    </div>
  );
}
