'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { ContentBusiness } from '@/data/toronto-content';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';

function BusinessCard({ business }: { business: ContentBusiness }) {
  return (
    <div className="w-full flex-shrink-0 snap-center">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4">
        {business.imageUrl && (
          <div className="h-32 w-full bg-gray-100">
            <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-900">{business.name}</h3>
          {business.rating > 0 && (
            <div className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 bg-brand rounded">
              <Star size={10} className="text-white fill-white" />
              <span className="text-[11px] text-white font-semibold">{business.rating}</span>
            </div>
          )}
          {business.description && (
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{business.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function BusinessDetailCard() {
  const {
    selectedBusiness,
    activeModule,
    activeBusinessIndex,
    setActiveBusinessIndex,
    setSelectedBusiness,
    setActiveModule,
    setFeedExpanded,
  } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const businesses = activeModule?.businesses || (selectedBusiness ? [selectedBusiness] : []);
  const total = businesses.length;

  // Scroll to active card when index changes
  useEffect(() => {
    if (!scrollRef.current || total <= 1) return;
    const cardWidth = scrollRef.current.offsetWidth;
    const targetScroll = activeBusinessIndex * cardWidth;
    if (Math.abs(scrollRef.current.scrollLeft - targetScroll) > 10) {
      isScrollingProgrammatically.current = true;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setTimeout(() => { isScrollingProgrammatically.current = false; }, 400);
    }
  }, [activeBusinessIndex, total]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isScrollingProgrammatically.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    const index = Math.round(scrollRef.current.scrollLeft / cardWidth);
    if (index !== activeBusinessIndex && index >= 0 && index < total) {
      setActiveBusinessIndex(index);
      setSelectedBusiness(businesses[index]);
    }
  }, [activeBusinessIndex, total, businesses, setActiveBusinessIndex, setSelectedBusiness]);

  const handleClose = useCallback(() => {
    setSelectedBusiness(null);
    setActiveModule(null);
    setFeedExpanded(true);
  }, [setSelectedBusiness, setActiveModule, setFeedExpanded]);

  const goTo = useCallback((dir: number) => {
    const next = activeBusinessIndex + dir;
    if (next >= 0 && next < total) {
      setActiveBusinessIndex(next);
      setSelectedBusiness(businesses[next]);
    }
  }, [activeBusinessIndex, total, businesses, setActiveBusinessIndex, setSelectedBusiness]);

  if (!selectedBusiness) return null;

  return (
    <div className="absolute bottom-4 left-0 right-0 z-20">
      {/* Header with pagination and close */}
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-2">
          {activeModule && (
            <span className="text-xs font-medium text-gray-500">
              {activeModule.emoji} {activeModule.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {total > 1 && (
            <>
              <button
                onClick={() => goTo(-1)}
                disabled={activeBusinessIndex === 0}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/90 shadow-sm disabled:opacity-30"
              >
                <ChevronLeft size={14} className="text-gray-600" />
              </button>
              <span className="text-[10px] font-medium text-gray-500 mx-1">
                {activeBusinessIndex + 1}/{total}
              </span>
              <button
                onClick={() => goTo(1)}
                disabled={activeBusinessIndex >= total - 1}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/90 shadow-sm disabled:opacity-30"
              >
                <ChevronRight size={14} className="text-gray-600" />
              </button>
            </>
          )}
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-white/90 shadow-sm ml-1"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Card carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {businesses.map((biz) => (
          <BusinessCard key={biz.name} business={biz} />
        ))}
      </div>
    </div>
  );
}
