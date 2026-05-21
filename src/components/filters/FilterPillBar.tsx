'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { PrimaryPill, SecondaryPill } from './FilterPill';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLlmPills } from '@/hooks/useLlmPills';

export function FilterPillBar() {
  const {
    primaryFilters,
    activePrimaryIds,
    secondaryFilters,
    activeSecondaryIds,
    togglePrimary,
    toggleSecondary,
    shortlistIds,
    showShortlistOnly,
    toggleShortlistView,
  } = useAppContext();

  useLlmPills();

  if (primaryFilters.length === 0) return null;

  return (
    <div className="absolute top-[64px] left-0 right-0 z-20 flex flex-col gap-1.5 pt-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory pl-4 pr-3">
        {shortlistIds.length > 0 && (
          <button
            onClick={toggleShortlistView}
            className={cn(
              'flex items-center gap-1 px-3 py-2.5 rounded-full text-sm font-medium whitespace-nowrap snap-start',
              'border transition-all duration-200 shadow-sm',
              showShortlistOnly
                ? 'bg-brand text-white border-brand-700 shadow-md'
                : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
            )}
          >
            <Bookmark size={14} className={showShortlistOnly ? 'fill-white' : ''} />
            <span>{shortlistIds.length}</span>
          </button>
        )}
        {primaryFilters.map((pill) => (
          <PrimaryPill
            key={pill.id}
            pill={pill}
            isActive={activePrimaryIds.includes(pill.id)}
            onToggle={() => togglePrimary(pill.id)}
          />
        ))}
      </div>

      {activePrimaryIds.length > 0 && secondaryFilters.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 snap-x snap-mandatory pl-4 pr-3 animate-[slideUp_200ms_ease-out]">
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
    </div>
  );
}
