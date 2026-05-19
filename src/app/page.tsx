'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { FilterPillBar } from '@/components/filters/FilterPillBar';
import { FeedContainer } from '@/components/feed/FeedContainer';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { FeedSkeleton } from '@/components/ui/Skeleton';
import { useAppContext } from '@/providers/AppContextProvider';
import { useMapScroll } from '@/hooks/useMapScroll';
import { Bookmark, MapPin } from 'lucide-react';

export default function HomePage() {
  const { signals, savedItemIds, setPlaces, setEvents, setDeals, isLoading, setIsLoading } = useAppContext();
  const [savedSheetOpen, setSavedSheetOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { mapHeight } = useMapScroll(scrollRef);

  const fetchData = useCallback(async () => {
    if (!signals.location) return;
    setIsLoading(true);

    const { lat, lng } = signals.location;

    try {
      const [placesRes, eventsRes, dealsRes] = await Promise.allSettled([
        fetch(`/api/places?lat=${lat}&lng=${lng}&radius=1500&openNow=true`),
        fetch(`/api/yelp/events?lat=${lat}&lng=${lng}`),
        fetch(`/api/yelp/deals?lat=${lat}&lng=${lng}`),
      ]);

      if (placesRes.status === 'fulfilled') {
        const data = await placesRes.value.json();
        if (Array.isArray(data)) setPlaces(data);
      }
      if (eventsRes.status === 'fulfilled') {
        const data = await eventsRes.value.json();
        if (Array.isArray(data)) setEvents(data);
      }
      if (dealsRes.status === 'fulfilled') {
        const data = await dealsRes.value.json();
        if (Array.isArray(data)) setDeals(data);
      }
    } catch {
      // Graceful degradation
    } finally {
      setIsLoading(false);
    }
  }, [signals.location, setPlaces, setEvents, setDeals, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="h-dvh flex flex-col overflow-hidden bg-white">
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-20">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-red-500" />
          <h1 className="text-lg font-bold text-gray-900">Right Now</h1>
        </div>
        <button
          onClick={() => setSavedSheetOpen(true)}
          className="relative p-2 rounded-full hover:bg-gray-100"
        >
          <Bookmark size={20} className="text-gray-700" />
          {savedItemIds.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {savedItemIds.length}
            </span>
          )}
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="relative sticky top-0 z-10">
          <MapContainer height={mapHeight} />
          <FilterPillBar />
        </div>

        {isLoading ? <FeedSkeleton /> : <FeedContainer />}
      </div>

      <BottomSheet isOpen={savedSheetOpen} onClose={() => setSavedSheetOpen(false)} />
    </main>
  );
}
