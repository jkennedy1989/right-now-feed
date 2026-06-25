'use client';

import { useCallback, useRef } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { BusinessDetailCard } from '@/components/map/BusinessDetailCard';
import { MapFilterPills } from '@/components/map/MapFilterPills';
import { FeedContainer } from '@/components/feed/FeedContainer';
import { useAppContext } from '@/providers/AppContextProvider';
import { Search, MapPin, Map as MapIcon, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const { feedState, setFeedState, selectedBusiness, setSelectedBusiness, setActiveModule, restoreFeedState } = useAppContext();
  const dragStartY = useRef<number | null>(null);

  const handleTap = useCallback(() => {
    if (feedState === 'collapsed') setFeedState('half');
    else if (feedState === 'half') setFeedState('collapsed');
  }, [feedState, setFeedState]);

  const handleDragUp = useCallback(() => {
    if (feedState === 'collapsed') setFeedState('half');
    else if (feedState === 'half') setFeedState('full');
  }, [feedState, setFeedState]);

  const handleDragDown = useCallback(() => {
    if (feedState === 'full') setFeedState('half');
    else if (feedState === 'half') setFeedState('collapsed');
  }, [feedState, setFeedState]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.changedTouches[0].clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      handleTap();
      return;
    }
    if (diff > 0) handleDragUp();
    else handleDragDown();
  }, [handleTap, handleDragUp, handleDragDown]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const diff = dragStartY.current - e.clientY;
    dragStartY.current = null;
    if (Math.abs(diff) < 20) {
      handleTap();
      return;
    }
    if (diff > 0) handleDragUp();
    else handleDragDown();
  }, [handleTap, handleDragUp, handleDragDown]);

  const isFull = feedState === 'full';

  return (
    <main className="h-full flex flex-col overflow-hidden relative">
      {/* Map section — hidden in full feed mode */}
      {!isFull && (
        <div className="relative flex-1">
          <MapContainer />

          {/* Header */}
          <header className="absolute top-3 left-3 right-3 z-30 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-full">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">Search restaurants, bars...</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex-shrink-0">
              <MapPin size={12} className="text-brand-600" />
              <span className="text-xs font-semibold text-gray-900">Toronto</span>
            </div>
          </header>

          {/* Filter pills below header */}
          {!selectedBusiness && <MapFilterPills />}

          {/* Back button in detail view */}
          {selectedBusiness && (
            <button
              onClick={() => { setSelectedBusiness(null); setActiveModule(null); restoreFeedState(); }}
              className="absolute top-[56px] left-3 z-30 mt-2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm"
            >
              <ArrowLeft size={16} className="text-gray-700" />
            </button>
          )}

          {/* Business detail card */}
          {selectedBusiness && <BusinessDetailCard />}
        </div>
      )}

      {/* Feed bottom card */}
      {!selectedBusiness && (
        <div
          className={`bg-white flex flex-col transition-all duration-300 ${
            isFull
              ? 'h-full'
              : 'rounded-t-2xl shadow-[0_-2px_16px_rgba(0,0,0,0.08)]'
          } ${
            feedState === 'collapsed'
              ? 'max-h-[100px]'
              : feedState === 'half'
              ? 'max-h-[50vh]'
              : ''
          }`}
        >
          {/* Fixed header in full mode */}
          {isFull && (
            <header className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-full">
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">Search restaurants, bars...</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex-shrink-0">
                <MapPin size={12} className="text-brand-600" />
                <span className="text-xs font-semibold text-gray-900">Toronto</span>
              </div>
            </header>
          )}

          {/* Drag handle */}
          {!isFull && (
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              className="flex-shrink-0 cursor-grab active:cursor-grabbing select-none py-3 flex justify-center"
            >
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>
          )}

          {/* Feed content */}
          <div className={`relative flex-1 min-h-0 overflow-y-auto ${feedState === 'collapsed' ? 'overflow-hidden' : ''}`}>
            <FeedContainer />
            {/* Map view button — floating in full mode */}
            {isFull && (
              <div className="sticky bottom-4 flex justify-center py-2 pointer-events-none z-40">
                <button
                  onClick={() => setFeedState('half')}
                  className="pointer-events-auto flex items-center gap-1.5 px-5 py-2.5 bg-[#E00707] border-[3px] border-white rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.15)] text-sm font-bold text-white hover:bg-[#c00606] transition-all"
                >
                  <MapIcon size={15} />
                  <span>Map view</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
