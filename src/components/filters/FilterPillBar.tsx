'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { PrimaryPill, SecondaryPill } from './FilterPill';
import { FilterResultsCarousel } from './FilterResultsCarousel';
import { Bookmark, X, Search } from 'lucide-react';
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
    selectedBusinessId,
    searchOverride,
    setSearchOverride,
    filteredPlaces,
  } = useAppContext();

  useLlmPills();

  if (primaryFilters.length === 0) return null;
  if (selectedBusinessId) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {!searchOverride && activePrimaryIds.length > 0 && filteredPlaces.length > 0 && (
        <FilterResultsCarousel />
      )}

      {!searchOverride && activePrimaryIds.length > 0 && secondaryFilters.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 animate-[slideUp_200ms_ease-out]" style={{ paddingLeft: 16, paddingRight: 12 }}>
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

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1" style={{ paddingLeft: 16, paddingRight: 12 }}>
        {searchOverride ? (
          <button
            onClick={() => setSearchOverride(null)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-brand text-white border border-brand-700 shadow-sm"
          >
            <span>{searchOverride}</span>
            <X size={14} />
          </button>
        ) : (
          <>
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
            {primaryFilters.slice(0, 5).map((pill) => (
              <PrimaryPill
                key={pill.id}
                pill={pill}
                isActive={activePrimaryIds.includes(pill.id)}
                onToggle={() => togglePrimary(pill.id)}
              />
            ))}
            <div className="flex items-center gap-1 px-3 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border border-gray-200 bg-gray-50 text-gray-400 shadow-sm cursor-default">
              <Search size={14} />
              <span>Search</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
