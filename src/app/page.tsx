'use client';

import { useCallback, useRef } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { BusinessDetailCard } from '@/components/map/BusinessDetailCard';
import { Feed } from '@/components/feed/Feed';
import { useAppContext } from '@/providers/AppContextProvider';
import { Search, MapPin } from 'lucide-react';

export default function HomePage() {
  const { feedExpanded, setFeedExpanded, selectedBusiness } = useAppContext();
  const dragStartY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.changedTouches[0].clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      setFeedExpanded((prev: boolean) => !prev);
      return;
    }
    if (diff > 0) setFeedExpanded(true);
    else setFeedExpanded(false);
  }, [setFeedExpanded]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      setFeedExpanded((prev: boolean) => !prev);
      return;
    }
    if (diff > 0) setFeedExpanded(true);
    else setFeedExpanded(false);
  }, [setFeedExpanded]);

  return (
    <main className="h-full flex flex-col overflow-hidden relative">
      {/* Map section — fills available space */}
      <div className="relative flex-1">
        <MapContainer />

        {/* Header */}
        <header className="absolute top-3 left-3 right-3 z-30 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-full">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">Search restaurants, bars...</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex-shrink-0">
            <MapPin size={12} className="text-brand-600" />
            <span className="text-xs font-semibold text-gray-900">Toronto</span>
          </div>
        </header>

        {/* Business detail card — shows when pin tapped */}
        {selectedBusiness && <BusinessDetailCard />}
      </div>

      {/* Feed bottom card */}
      {!selectedBusiness && (
        <div
          className={`bg-white rounded-t-2xl shadow-[0_-2px_16px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-300 ${
            feedExpanded ? 'max-h-[60vh]' : 'max-h-[80px]'
          }`}
        >
          {/* Drag handle */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className="flex-shrink-0 cursor-grab active:cursor-grabbing select-none pt-2 pb-1 flex justify-center"
          >
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>

          {/* Feed content */}
          <div className={`flex-1 overflow-y-auto ${feedExpanded ? '' : 'overflow-hidden'}`}>
            <Feed />
          </div>
        </div>
      )}
    </main>
  );
}
