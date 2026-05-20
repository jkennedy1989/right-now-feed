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
    <div className="absolute bottom-[27%] left-0 right-0 z-20 px-3 flex flex-col gap-1.5">
      {/* Line 2: Secondary refinement pills (render first so it's above Line 1 visually) */}
      {activePrimaryId && secondaryFilters.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 snap-x snap-mandatory animate-[slideUp_200ms_ease-out]">
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

      {/* Line 1: Primary temporal-cue pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory">
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
