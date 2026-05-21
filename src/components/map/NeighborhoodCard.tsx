'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherTicker } from '@/components/header/WeatherTicker';

const DISH_PATTERNS = [
  /known for (?:the |its )?(.*?)(?:\.|,|$)/i,
  /famous for (?:the |its )?(.*?)(?:\.|,|$)/i,
  /try (?:the )?(.*?)(?:\.|,|$)/i,
  /signature (.*?)(?:\.|,|$)/i,
  /must-try (.*?)(?:\.|,|$)/i,
  /best (.*?) in/i,
];

function extractTrendingDishes(hooks: string[]): string[] {
  const dishes: string[] = [];
  for (const hook of hooks) {
    for (const pattern of DISH_PATTERNS) {
      const match = hook.match(pattern);
      if (match && match[1]) {
        const dish = match[1].trim();
        if (dish.length > 2 && dish.length < 40 && !dishes.includes(dish)) {
          dishes.push(dish.charAt(0).toUpperCase() + dish.slice(1));
        }
        break;
      }
    }
  }
  return dishes.slice(0, 6);
}

function getTimeGreeting(hour: number): string {
  return hour >= 17 ? 'Tonight in' : 'Today in';
}

function getTimeEmoji(hour: number): string {
  if (hour >= 21 || hour < 5) return '🌙';
  if (hour >= 17) return '🌙';
  if (hour >= 12) return '☀️';
  return '🌤️';
}

export function NeighborhoodCard() {
  const { selectedCity, places } = useAppContext();
  const city = CITIES[selectedCity];
  const [isExpanded, setIsExpanded] = useState(false);
  const hour = new Date().getHours();

  const { topCuisines, trendingDishes, blurb } = useMemo(() => {
    const cuisineCounts: Record<string, number> = {};
    places.forEach((p) => {
      const c = p.cuisine.split('/')[0].trim();
      if (c) cuisineCounts[c] = (cuisineCounts[c] || 0) + 1;
    });

    const topCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    const hooks = places
      .filter((p) => p.hook)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 15)
      .map((p) => p.hook);

    const extracted = extractTrendingDishes(hooks);
    const trendingDishes = extracted.length >= 3 ? extracted : city.iconicDishes?.slice(0, 6) || [];

    const blurb = trendingDishes.length > 0
      ? `This is a placeholder blurb for a summary of today's trends, weather, things to do today in this city. This should always be three lines long and be dynamic.`
      : `Here's what locals are visiting and ordering right now.`;

    return { topCuisines, trendingDishes, blurb };
  }, [places, city.iconicDishes]);

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{getTimeEmoji(hour)}</span>
              <h2 className="text-sm font-bold text-gray-900">
                {getTimeGreeting(hour)} {city.name}
              </h2>
            </div>
            <div className="flex-shrink-0 ml-2">
              <WeatherTicker />
            </div>
          </div>
          {!isExpanded && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-3">{blurb}</p>
          )}
        </div>
        <div className="ml-3 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 animate-[slideUp_200ms_ease-out]">
          <p className="text-xs text-gray-500 mb-3">{blurb}</p>

          {topCuisines.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span>🍽️</span> Popular cuisines
              </p>
              <div className="flex flex-wrap gap-1.5">
                {topCuisines.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-100"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          )}

          {trendingDishes.length > 0 && (
            <div>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span>🔥</span> Trending dishes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trendingDishes.map((dish) => (
                  <span
                    key={dish}
                    className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-100"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
