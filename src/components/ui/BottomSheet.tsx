'use client';

import { useState } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { X, Bookmark, Trash2, ArrowUpFromLine, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Business } from '@/types';
import { formatPrice } from '@/lib/utils';
import { PlanModal } from '@/components/plan/PlanModal';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

function CompareView({ places }: { places: Business[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-2 px-2 text-gray-500 font-medium">Name</th>
            <th className="text-left py-2 px-2 text-gray-500 font-medium">Rating</th>
            <th className="text-left py-2 px-2 text-gray-500 font-medium">Price</th>
            <th className="text-left py-2 px-2 text-gray-500 font-medium">Cuisine</th>
            <th className="text-left py-2 px-2 text-gray-500 font-medium">Area</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.id} className="border-b border-gray-50">
              <td className="py-2.5 px-2 font-medium text-gray-900 max-w-[120px] truncate">{place.name}</td>
              <td className="py-2.5 px-2">
                <span className="flex items-center gap-0.5">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  {place.rating}
                </span>
              </td>
              <td className="py-2.5 px-2 text-gray-600">{formatPrice(place.priceLevel)}</td>
              <td className="py-2.5 px-2 text-gray-600 max-w-[80px] truncate">{place.cuisine}</td>
              <td className="py-2.5 px-2 text-gray-600 max-w-[80px] truncate">{place.neighborhood}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const { shortlistIds, unshortlistItem, places, selectedCity } = useAppContext();
  const [compareMode, setCompareMode] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [planOpen, setPlanOpen] = useState(false);

  const shortlistedPlaces = places.filter((p) => shortlistIds.includes(p.id));

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: 'Anonymous',
          city: selectedCity,
          businessIds: shortlistIds,
        }),
      });
      const data = await res.json();
      const url = `${window.location.origin}/list/${data.id}`;
      setShareUrl(url);

      if (navigator.share) {
        await navigator.share({ title: 'My Shortlist', url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // silent fail
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[80vh] flex flex-col"
          >
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-brand" />
                <h2 className="text-base font-bold text-gray-900">
                  Shortlisted ({shortlistedPlaces.length})
                </h2>
              </div>
              <div className="flex items-center gap-1">
                {shortlistedPlaces.length >= 2 && (
                  <>
                    <button
                      onClick={() => setCompareMode(!compareMode)}
                      className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                        compareMode ? 'bg-brand-50 text-brand-600' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => setPlanOpen(true)}
                      className="text-xs font-medium px-2 py-1 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      Plan
                    </button>
                  </>
                )}
                {shortlistedPlaces.length > 0 && (
                  <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    title="Share shortlist"
                  >
                    <ArrowUpFromLine size={16} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {shortlistedPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No items shortlisted yet</p>
                  <p className="text-xs text-gray-400 mt-1">Tap the shortlist button on a business to add it here</p>
                </div>
              ) : compareMode ? (
                <CompareView places={shortlistedPlaces} />
              ) : (
                <div className="space-y-2">
                  {shortlistedPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                        <p className="text-xs text-gray-500">{place.neighborhood} · {place.cuisine}</p>
                      </div>
                      <button
                        onClick={() => unshortlistItem(place.id)}
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0 ml-2"
                      >
                        <Trash2 size={14} className="text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {shareUrl && (
                <p className="text-xs text-green-600 text-center mt-3">Link copied to clipboard!</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <PlanModal isOpen={planOpen} onClose={() => setPlanOpen(false)} />
    </>
  );
}
