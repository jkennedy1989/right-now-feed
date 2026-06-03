'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { useBusinessDescription } from '@/hooks/useBusinessDescription';
import { PhotoSlot } from '@/components/cards/PhotoSlot';
import { CITIES } from '@/data/city-meta';
import { formatPrice } from '@/lib/utils';
import { X, Star, Bookmark } from 'lucide-react';


export function BusinessDetailCard() {
  const {
    selectedBusinessId,
    setSelectedBusinessId,
    selectedCity,
    places,
    shortlistItem,
    unshortlistItem,
    isShortlisted,
    activePrimaryIds,
    primaryFilters,
    activeSecondaryIds,
    secondaryFilters,
    signals,
    badgeMap,
  } = useAppContext();

  const business = useMemo(
    () => places.find((p) => p.id === selectedBusinessId) || null,
    [places, selectedBusinessId]
  );

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];
    primaryFilters.filter((p) => activePrimaryIds.includes(p.id)).forEach((p) => labels.push(p.label));
    secondaryFilters.filter((s) => activeSecondaryIds.includes(s.id)).forEach((s) => labels.push(s.label));
    return labels;
  }, [primaryFilters, activePrimaryIds, secondaryFilters, activeSecondaryIds]);

  const { description, isLoading: descLoading } = useBusinessDescription(
    business,
    activeFilterLabels,
    signals
  );

  const [activePhoto, setActivePhoto] = useState(0);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<number>>(new Set());
  const touchStartX = useRef<number | null>(null);

  const handlePhotoLoad = useCallback((index: number) => {
    setLoadedPhotos((prev) => new Set(prev).add(index));
  }, []);

  const handlePhotoError = useCallback((_index: number) => {
    // Photo at this index failed - don't add to loaded set
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return;

    const sortedLoaded = Array.from(loadedPhotos).sort();
    const currentIdx = sortedLoaded.indexOf(activePhoto);
    if (diff > 0 && currentIdx < sortedLoaded.length - 1) {
      setActivePhoto(sortedLoaded[currentIdx + 1]);
    } else if (diff < 0 && currentIdx > 0) {
      setActivePhoto(sortedLoaded[currentIdx - 1]);
    }
  }, [activePhoto, loadedPhotos]);

  if (!business) return null;

  const shortlisted = isShortlisted(business.id);
  const cityName = CITIES[selectedCity].name;
  const photoCount = loadedPhotos.size;

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.1)] overflow-hidden animate-[slideUp_250ms_ease-out]">
      <div className="relative">
        <div
          className="h-32 w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activePhoto * 100}%)` }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-full h-full flex-shrink-0">
                <PhotoSlot
                  name={business.name}
                  city={cityName}
                  index={i}
                  className="h-full w-full"
                  onLoad={() => handlePhotoLoad(i)}
                  onError={() => handlePhotoError(i)}
                />
              </div>
            ))}
          </div>
          {photoCount > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from(loadedPhotos).sort().map((i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activePhoto ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setSelectedBusinessId(null)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <X size={14} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="text-base font-bold text-gray-900 leading-tight">{business.name}</h3>
        </div>

        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">{business.rating}</span>
          <span className="text-xs text-gray-500">({business.reviewCount || 0} reviews)</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <span>{formatPrice(business.priceLevel)}</span>
          <span>•</span>
          <span className="text-green-600 font-medium">Open</span>
          {business.cuisine && (
            <>
              <span>•</span>
              <span className="truncate">{business.cuisine}</span>
            </>
          )}
        </div>

        {badgeMap.get(business.id) && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-sm">{badgeMap.get(business.id)!.emoji}</span>
            <span className="text-xs font-semibold text-gray-700">{badgeMap.get(business.id)!.detail || badgeMap.get(business.id)!.label}</span>
          </div>
        )}

        {descLoading ? (
          <div className="space-y-1.5 mb-3">
            <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
          </div>
        ) : description ? (
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">{description}</p>
        ) : business.hook ? (
          <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{business.hook}</p>
        ) : null}

        <button
          onClick={() => shortlisted ? unshortlistItem(business.id) : shortlistItem(business.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            shortlisted
              ? 'bg-brand-50 text-brand-600 border-brand-200'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Bookmark size={12} className={shortlisted ? 'fill-brand-600' : ''} />
          <span>Shortlist</span>
        </button>
      </div>
    </div>
  );
}
