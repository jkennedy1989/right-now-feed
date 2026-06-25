'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { CategoryFilter } from '@/data/toronto-content';

const PRIMARY_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All picks' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'things-to-do', label: 'Things To Do' },
  { id: 'events', label: 'Events' },
  { id: 'services', label: 'Services' },
];

const SUB_FILTERS: Record<string, { id: string; label: string; emoji: string }[]> = {
  restaurants: [
    { id: 'award-winning', label: 'Award-Winning', emoji: '🏆' },
    { id: 'budget', label: 'Budget', emoji: '💰' },
    { id: 'celeb-picks', label: 'Celeb Picks', emoji: '⭐' },
    { id: 'speakeasies', label: 'Speakeasies', emoji: '🚪' },
    { id: 'bakeries', label: 'Bakeries', emoji: '🥐' },
    { id: 'wine-bars', label: 'Wine Bars', emoji: '🍷' },
    { id: 'dog-friendly', label: 'Dog-Friendly', emoji: '🐶' },
  ],
  'things-to-do': [
    { id: 'nature', label: 'Nature', emoji: '🌲' },
    { id: 'art', label: 'Art', emoji: '🎨' },
    { id: 'movies', label: 'Movies', emoji: '🍿' },
    { id: 'architecture', label: 'Architecture', emoji: '🏛️' },
    { id: 'karaoke', label: 'Karaoke', emoji: '🎤' },
    { id: 'landmarks', label: 'Landmarks', emoji: '🏛️' },
  ],
};

export const SUB_FILTER_LIST_MAP: Record<string, Record<string, string[]>> = {
  restaurants: {
    'award-winning': ['michelin-on-a-dime-new', 'michelin-starred-new', 'yelps-top-10'],
    'budget': ['eats-under-20-new'],
    'celeb-picks': ['bourdains-faves-new', 'drakes-haunts'],
    'speakeasies': ['secret-speakeasies'],
    'bakeries': ['ossington-bakeries'],
    'wine-bars': ['moody-wine-bars'],
    'dog-friendly': ['dog-friendly-patios'],
  },
  'things-to-do': {
    'nature': ['nature-escapes'],
    'art': ['street-art-beyond-graffiti'],
    'movies': ['indie-movie-theatres'],
    'architecture': ['architectural-gems'],
    'karaoke': ['neon-karaoke-rooms'],
    'landmarks': ['essential-toronto-landmarks'],
  },
};

export function MapFilterPills() {
  const { activeCategory, setActiveCategory, activeSubFilter, setActiveSubFilter } = useAppContext();

  const subFilters = SUB_FILTERS[activeCategory] || [];

  return (
    <div className="absolute top-[64px] left-0 right-0 z-30 flex flex-col gap-2 pt-2">
      {/* Primary filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3">
        {PRIMARY_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === filter.id
                ? 'bg-[#E00707] text-white shadow-md'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 shadow-sm'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sub-filters */}
      {subFilters.length > 0 && (
        <div className="flex gap-1 overflow-x-auto scrollbar-hide px-3">
          {subFilters.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubFilter(activeSubFilter === sub.id ? null : sub.id)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                activeSubFilter === sub.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-200'
              }`}
            >
              {sub.emoji} {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
