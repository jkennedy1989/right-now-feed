'use client';

import { useRef, useCallback } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { PhotoSlot } from '@/components/cards/PhotoSlot';
import { CITIES } from '@/data/city-meta';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function ListViewMode() {
  const { listViewMode, exitListView, setListActiveIndex, selectedCity } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const city = CITIES[selectedCity].name;

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth - 32;
    scrollRef.current.scrollTo({ left: index * (cardWidth + 12), behavior: 'smooth' });
    setListActiveIndex(index);
  }, [setListActiveIndex]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth - 32;
    const index = Math.round(scrollRef.current.scrollLeft / (cardWidth + 12));
    if (listViewMode && index !== listViewMode.activeIndex && index >= 0 && index < listViewMode.businesses.length) {
      setListActiveIndex(index);
    }
  }, [setListActiveIndex, listViewMode]);

  if (!listViewMode) return null;

  const { list, businesses, activeIndex, isLoading } = listViewMode;

  return (
    <div className="flex flex-col gap-2 px-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-white/30">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{list.emoji}</span>
          <span className="text-sm font-semibold text-gray-900 truncate">{list.title}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {activeIndex + 1} of {businesses.length || list.businesses.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(businesses.length - 1, activeIndex + 1))}
            disabled={activeIndex >= businesses.length - 1}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
          <button
            onClick={exitListView}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 ml-1"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Card carousel */}
      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="h-24 bg-gray-100 rounded-lg animate-pulse mb-3" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3 mb-2" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
        </div>
      ) : businesses.length > 0 ? (
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1"
        >
          {businesses.map((biz, i) => (
            <div
              key={biz.id}
              className="flex-shrink-0 snap-center bg-white rounded-2xl shadow-lg overflow-hidden"
              style={{ width: 'calc(100% - 32px)' }}
            >
              <div className="h-28 w-full">
                <PhotoSlot name={biz.name} city={city} className="h-full w-full" />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-900 mb-1">{biz.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                  {biz.rating > 0 && (
                    <>
                      <Star size={11} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-gray-700">{biz.rating}</span>
                    </>
                  )}
                  {biz.priceLevel > 0 && (
                    <>
                      <span>·</span>
                      <span>{formatPrice(biz.priceLevel)}</span>
                    </>
                  )}
                </div>
                {biz.hook && (
                  <p className="text-xs text-gray-600 line-clamp-2">{biz.hook}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
