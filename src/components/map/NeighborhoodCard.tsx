'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { Business } from '@/types';
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
  const { selectedCity, places, signals, setSearchOverride, setSelectedBusinessId, setViewportCenter, injectPlace } = useAppContext();
  const city = CITIES[selectedCity];
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [events, setEvents] = useState<{ id: string; title: string; start: string; venueName: string; category: string }[]>([]);
  const [newOpenings, setNewOpenings] = useState<Business[]>([]);
  const fetchedForCity = useRef<string | null>(null);
  const eventsFetchedForCity = useRef<string | null>(null);
  const hour = new Date().getHours();

  const { topCuisines, trendingDishes } = useMemo(() => {
    const cuisineCounts: Record<string, number> = {};
    places.forEach((p) => {
      const c = p.cuisine.split('/')[0].trim();
      if (c) cuisineCounts[c] = (cuisineCounts[c] || 0) + 1;
    });

    const topCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const hooks = places
      .filter((p) => p.hook)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 15)
      .map((p) => p.hook);

    const extracted = extractTrendingDishes(hooks);
    const trendingDishes = extracted.length >= 3 ? extracted.slice(0, 3) : city.iconicDishes?.slice(0, 3) || [];

    return { topCuisines, trendingDishes };
  }, [places, city.iconicDishes]);

  useEffect(() => {
    if (topCuisines.length === 0 || fetchedForCity.current === selectedCity) return;
    fetchedForCity.current = selectedCity;
    setSummaryLoading(true);

    fetch('/api/neighborhood-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        city: city.name,
        topCuisines,
        trendingDishes,
        mealPeriod: signals?.mealPeriod,
        isWeekend: signals?.isWeekend,
        hour,
      }),
    })
      .then((r) => r.json())
      .then((data) => setAiSummary(data.summary || ''))
      .catch(() => setAiSummary(''))
      .finally(() => setSummaryLoading(false));
  }, [selectedCity, topCuisines, trendingDishes, city.name, signals, hour]);

  useEffect(() => {
    if (!isExpanded || eventsFetchedForCity.current === selectedCity) return;
    eventsFetchedForCity.current = selectedCity;

    const center = CITIES[selectedCity].center;
    fetch(`/api/events?lat=${center.lat}&lng=${center.lng}&limit=3`)
      .then((r) => r.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
        }
      })
      .catch(() => setEvents([]));

    fetch(`/api/places?lat=${center.lat}&lng=${center.lng}&radius=3219&keyword=new+restaurant+opening&maxResults=3`)
      .then((r) => r.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setNewOpenings(data.results.slice(0, 3));
        }
      })
      .catch(() => setNewOpenings([]));
  }, [isExpanded, selectedCity]);

  const blurb = aiSummary || "Here's what locals are visiting and ordering right now.";

  const handleChipClick = (keyword: string) => {
    setSearchOverride(keyword);
    setIsExpanded(false);
  };

  const handlePlaceClick = (place: Business) => {
    injectPlace(place);
    setSelectedBusinessId(place.id);
    setViewportCenter(place.location);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden max-h-[60vh] flex flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left flex-shrink-0"
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
            summaryLoading ? (
              <div className="mt-1 space-y-1">
                <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{blurb}</p>
            )
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
        <div className="px-4 pb-4 animate-[slideUp_200ms_ease-out] overflow-y-auto flex-1 min-h-0">
          <p className="text-xs text-gray-500 mb-3">{blurb}</p>

          {topCuisines.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span>🍽️</span> Popular cuisines
              </p>
              <div className="flex flex-wrap gap-1.5">
                {topCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleChipClick(`${cuisine} restaurant`)}
                    className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-100 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors"
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trendingDishes.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span>🔥</span> Trending dishes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trendingDishes.map((dish) => (
                  <button
                    key={dish}
                    onClick={() => handleChipClick(dish)}
                    className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-100 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors"
                  >
                    {dish}
                  </button>
                ))}
              </div>
            </div>
          )}

          {newOpenings.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span>✨</span> New openings
              </p>
              <div className="flex flex-wrap gap-1.5">
                {newOpenings.map((opening) => (
                  <button
                    key={opening.id}
                    onClick={() => handlePlaceClick(opening)}
                    className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-100 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors"
                  >
                    {opening.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {events.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span>📅</span> Upcoming events
              </p>
              <div className="space-y-2.5">
                {events.map((event) => (
                  <div key={event.id} className="flex flex-col gap-0.5">
                    <p className="text-xs font-medium text-gray-900">{event.title}</p>
                    <p className="text-[11px] text-gray-500">
                      {new Date(event.start).toLocaleString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                      {event.venueName && ` · ${event.venueName}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
