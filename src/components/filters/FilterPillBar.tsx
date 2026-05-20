'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { PrimaryPill, SecondaryPill } from './FilterPill';

export function FilterPillBar() {
  const {
    primaryFilters,
    activePrimaryId,
    secondaryFilters,
    activeSecondaryIds,
    selectPrimary,
    toggleSecondary,
  } = useAppContext();

  if (primaryFilters.length === 0) return null;

  return (
    <div className="absolute bottom-[27%] left-0 right-0 z-20 flex flex-col gap-1.5">
      {activePrimaryId && secondaryFilters.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 snap-x snap-mandatory pl-3 pr-3 animate-[slideUp_200ms_ease-out]">
          {secondaryFilters.map((pill) => (
            <SecondaryPill
              key={pill.id}
              pill={pill}
              isActive={activeSecondaryIds.includes(pill.id)}
              onToggle={() => toggleSecondary(pill.id)}
            />
          ))}
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory pl-3 pr-3">
        {primaryFilters.map((pill) => (
          <PrimaryPill
            key={pill.id}
            pill={pill}
            isActive={activePrimaryId === pill.id}
            onToggle={() => selectPrimary(pill.id)}
          />
        ))}
      </div>
    </div>
  );
}
