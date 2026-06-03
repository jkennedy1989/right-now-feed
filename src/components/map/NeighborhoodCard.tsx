'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { Business } from '@/types';
import { CITIES } from '@/data/city-meta';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { getListsForCity } from '@/data/city-lists';
import { PhotoSlot } from '@/components/cards/PhotoSlot';

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

export function NeighborhoodCard() {
  const { selectedCity, places, signals, setSearchOverride, setSelectedBusinessId, setViewportCenter, injectPlace, enterListView, activePrimaryIds, showRedoButton } = useAppContext();
  const city = CITIES[selectedCity];
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [events, setEvents] = useState<{ id: string; title: string; start: string; venueName: string; category: string }[]>([]);
  const [newOpenings, setNewOpenings] = useState<Business[]>([]);
  const fetchedForCity = useRef<string | null>(null);
  const eventsFetchedForCity = useRef<string | null>(null);

  // Collapse when filter selected or map interacted
  useEffect(() => {
    if (activePrimaryIds.length > 0) {
      setIsExpanded(false);
    }
  }, [activePrimaryIds.length]);

  useEffect(() => {
    if (showRedoButton) {
      setIsExpanded(false);
    }
  }, [showRedoButton]);

  const isNight = signals.daylight === 'night';
  const greeting = isNight ? 'Tonight in' : 'Today in';

  const cityLists = useMemo(() => getListsForCity(selectedCity), [selectedCity]);

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
      }),
    })
      .then((r) => r.json())
      .then((data) => setAiSummary(data.summary || ''))
      .catch(() => setAiSummary(''))
      .finally(() => setSummaryLoading(false));
  }, [selectedCity, topCuisines, trendingDishes, city.name, signals]);

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

  const blurb = aiSummary || city.foodCultureSummary?.slice(0, 60) || '';

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

  // Drag anywhere on the card to expand/collapse
  const dragStartY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.changedTouches[0].clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      setIsExpanded((prev) => !prev);
      return;
    }
    if (diff > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      setIsExpanded((prev) => !prev);
      return;
    }
    if (diff > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-all duration-300">
      {/* Handle + Header — draggable area */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="w-full pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              {greeting} {city.name}
            </h2>
            {signals.weather && (
              <div className="flex items-center gap-1 text-xs text-gray-600 font-medium flex-shrink-0 ml-2">
                {signals.weather.condition === 'rain' ? <CloudRain size={14} className="text-blue-400" /> :
                 signals.weather.condition === 'clouds' ? <Cloud size={14} className="text-gray-400" /> :
                 signals.weather.condition === 'snow' ? <Snowflake size={14} className="text-blue-200" /> :
                 <Sun size={14} className="text-yellow-500" />}
                <span>{Math.round(signals.weather.temp)}°F</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content — collapsed shows teaser of list carousel, expanded shows all */}
      <div
        className={`px-4 pb-3 transition-all duration-300 ${
          isExpanded
            ? 'max-h-[50vh] overflow-y-auto'
            : 'max-h-[60px] overflow-hidden'
        }`}
      >
        {/* Local Lists */}
        {cityLists.length > 0 && (
          <div className={isExpanded ? 'mb-3' : ''}>
            <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <span>📋</span> Local lists
            </p>
            <div className="flex items-stretch gap-2.5 overflow-x-auto scrollbar-hide pb-1">
              {cityLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => { enterListView(list.id); setIsExpanded(false); }}
                  className="flex-shrink-0 w-[160px] bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left flex flex-col"
                >
                  <div className="h-[72px] w-full flex-shrink-0">
                    <PhotoSlot name={list.businesses[0].name} city={city.name} className="h-full w-full" />
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <p className="text-[11px] font-semibold text-gray-900">{list.emoji} {list.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{list.businesses.length} spots · {list.source}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isExpanded && topCuisines.length > 0 && (
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

        {isExpanded && trendingDishes.length > 0 && (
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

        {isExpanded && newOpenings.length > 0 && (
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

        {isExpanded && events.length > 0 && (
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
    </div>
  );
}
