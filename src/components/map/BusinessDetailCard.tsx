'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { ContentBusiness } from '@/data/toronto-content';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { RatingPill } from '@/components/ui/RatingPill';

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
            <div className="mt-1">
              <RatingPill rating={business.rating} size="md" />
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
    setFeedState,
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
    setFeedState('collapsed');
  }, [setSelectedBusiness, setActiveModule, setFeedState]);

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
      {/* Header pill */}
      {activeModule && (
        <div className="mx-4 mb-2 flex items-center justify-between px-4 py-2.5 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex-1 min-w-0 mr-2">
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
              {activeModule.emoji} {activeModule.title}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-gray-400" />
              <span className="text-[11px] font-semibold text-gray-700">{total} places</span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => goTo(-1)}
              disabled={activeBusinessIndex === 0}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => goTo(1)}
              disabled={activeBusinessIndex >= total - 1}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 ml-0.5"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      )}
      {!activeModule && (
        <div className="flex justify-end px-4 mb-2">
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/30 shadow-sm"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      )}

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
