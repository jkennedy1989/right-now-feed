'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { CITIES } from '@/data/city-meta';
import { Utensils, TrendingUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

    const words = hook.split(/[,;.!]+/).map((w) => w.trim()).filter((w) => w.length > 3 && w.length < 30);
    for (const word of words) {
      if (/^[A-Z]/.test(word) && !dishes.includes(word) && dishes.length < 8) {
        dishes.push(word);
      }
    }
  }

  return dishes.slice(0, 6);
}

const BUZZ_SCORES: Record<string, number> = {
  michelin: 10,
  'resy hit list': 9,
  eater: 8,
  infatuation: 7,
  'time out': 6,
};

function scoreBuzz(buzzFactor: string): number {
  const lower = buzzFactor.toLowerCase();
  let score = 0;
  for (const [keyword, points] of Object.entries(BUZZ_SCORES)) {
    if (lower.includes(keyword)) score += points;
  }
  return score;
}

function buildLocalBlurb(
  trendingNames: string[],
  trendingDishes: string[],
  topCuisines: string[],
): string {
  const spotMentions = trendingNames.slice(0, 2);
  const dishMentions = trendingDishes.slice(0, 2);

  if (spotMentions.length >= 2 && dishMentions.length >= 1) {
    return `Locals are buzzing about ${spotMentions[0]} and ${spotMentions[1]} — ${dishMentions.join(' and ').toLowerCase()} are what everyone's ordering right now.`;
  }

  if (spotMentions.length >= 1 && dishMentions.length >= 2) {
    return `${spotMentions[0]} is the spot everyone's talking about. ${dishMentions[0]} and ${dishMentions[1].toLowerCase()} are trending across the city.`;
  }

  if (topCuisines.length >= 2) {
    return `${topCuisines[0]} and ${topCuisines[1]} spots are seeing the most foot traffic today. Here's what locals are searching for.`;
  }

  return 'Here\'s what locals are visiting and ordering right now.';
}

export function NeighborhoodModule() {
  const { selectedCity, places, signals } = useAppContext();
  const city = CITIES[selectedCity];
  const [isExpanded, setIsExpanded] = useState(false);

  const { topCuisines, trendingDishes, trendingNames, blurb } = useMemo(() => {
    const cuisineCounts: Record<string, number> = {};
    const mealPeriod = signals.mealPeriod;
    const isMorning = mealPeriod === 'breakfast' || mealPeriod === 'early-morning' || mealPeriod === 'brunch';
    const isNight = mealPeriod === 'late-night' || mealPeriod === 'dinner';

    places.forEach((p) => {
      const c = p.cuisine.split('/')[0].trim();
      if (c) {
        const catLower = p.category.toLowerCase();
        const isRelevant = isMorning
          ? catLower.includes('cafe') || catLower.includes('bakery') || catLower.includes('brunch')
          : isNight
            ? catLower.includes('fine') || catLower.includes('bar') || catLower.includes('dining')
            : true;
        cuisineCounts[c] = (cuisineCounts[c] || 0) + (isRelevant ? 2 : 1);
      }
    });

    const topCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    const trendingPlaces = [...places]
      .map((p) => ({ place: p, score: scoreBuzz(p.buzzFactor) }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((p) => p.place);

    const trendingNames = trendingPlaces.slice(0, 4).map((p) => p.name);
    const extracted = extractTrendingDishes(trendingPlaces.map((p) => p.hook));
    const trendingDishes = extracted.length >= 3 ? extracted : city.iconicDishes.slice(0, 6);
    const blurb = buildLocalBlurb(trendingNames, trendingDishes, topCuisines);

    return { topCuisines, trendingDishes, trendingNames, blurb };
  }, [places, signals.mealPeriod, city.iconicDishes]);

  return (
    <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-white to-orange-50 border border-orange-100/50 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-orange-500" />
              <h2 className="text-sm font-bold text-gray-900">Today in {city.name}</h2>
            </div>
            <div className="flex-shrink-0 ml-2">
              <WeatherTicker />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{blurb}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3 flex-shrink-0"
        >
          <ChevronDown size={16} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="flex items-start gap-2 mb-3">
                <Utensils size={14} className="text-orange-500 mt-0.5" />
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide">Popular right now</p>
                  <p className="text-xs font-medium text-gray-800">{topCuisines.slice(0, 4).join(', ')}</p>
                </div>
              </div>

              {trendingNames.length > 0 && (
                <div className="mb-3">
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5">People are visiting</p>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingNames.map((name) => (
                      <span
                        key={name}
                        className="px-2 py-0.5 bg-orange-50 rounded-full text-[11px] font-medium text-orange-700 border border-orange-100"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5">Trending dishes</p>
                <div className="flex flex-wrap gap-1.5">
                  {trendingDishes.map((dish) => (
                    <span
                      key={dish}
                      className="px-2 py-0.5 bg-white rounded-full text-[11px] font-medium text-gray-700 border border-gray-100"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-3">Updated moments ago</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
