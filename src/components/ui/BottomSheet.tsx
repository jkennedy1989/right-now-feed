'use client';

import { useState } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { X, Bookmark, Trash2, Share, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const { savedItemIds, unsaveItem, places } = useAppContext();
  const [view, setView] = useState<'list' | 'compare'>('list');
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const savedPlaces = places.filter((p) => savedItemIds.includes(p.id));

  const handleShare = async () => {
    const ids = savedPlaces.map((p) => p.id).join(',');
    const encoded = btoa(ids);
    const url = `${window.location.origin}/list/${encoded}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
  };

  return (
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
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark size={18} className="text-brand fill-brand" />
                  <h2 className="font-bold text-gray-900">Saved ({savedPlaces.length})</h2>
                </div>
                <div className="flex items-center gap-2">
                  {savedPlaces.length >= 2 && (
                    <button
                      onClick={() => setView(view === 'list' ? 'compare' : 'list')}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        view === 'compare'
                          ? 'bg-brand text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Compare
                    </button>
                  )}
                  {savedPlaces.length > 0 && (
                    <button
                      onClick={handleShare}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                      title="Share shortlist"
                    >
                      <Share size={18} />
                    </button>
                  )}
                  <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
              {view === 'compare' && savedPlaces.length >= 2 && (
                <div className="mt-2 px-3 py-1.5 bg-brand-50 rounded-lg flex items-center justify-between">
                  <span className="text-xs text-brand-700">Comparing {savedPlaces.length} places</span>
                  <button
                    onClick={() => setView('list')}
                    className="text-xs text-brand font-medium hover:underline"
                  >
                    Back to list
                  </button>
                </div>
              )}
              {shareUrl && (
                <div className="mt-2 p-2 bg-green-50 rounded-lg text-xs text-green-700">
                  Link copied! Share it so others can vote on your shortlist.
                </div>
              )}
            </div>

            <div className="p-4">
              {savedPlaces.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No saved items yet</p>
                  <p className="text-xs text-gray-400 mt-1">Tap the bookmark icon on any item to save it</p>
                </div>
              ) : view === 'list' ? (
                <div className="space-y-2">
                  {savedPlaces.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🍽️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-500 truncate">{p.neighborhood} · {p.cuisine}</p>
                      </div>
                      <button
                        onClick={() => unsaveItem(p.id)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <CompareView places={savedPlaces} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CompareView({ places }: { places: import('@/types').Business[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        {places.map((p) => (
          <div key={p.id} className="w-48 bg-gray-50 rounded-xl p-3 border border-gray-100">
            <h4 className="font-semibold text-sm text-gray-900 truncate">{p.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{p.neighborhood}</p>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Rating</span>
                <span className="flex items-center gap-0.5 text-xs font-medium">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  {p.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Price</span>
                <span className="text-xs font-medium">{formatPrice(p.priceLevel)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Cuisine</span>
                <span className="text-xs font-medium truncate ml-2">{p.cuisine}</span>
              </div>
              {p.michelinStatus && (
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Michelin</span>
                  <span className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded">{p.michelinStatus}</span>
                </div>
              )}
            </div>

            {p.hook && (
              <p className="text-[11px] text-gray-600 italic mt-2 leading-tight border-t border-gray-100 pt-2">
                {p.hook}
              </p>
            )}

            <button className="w-full mt-3 py-1.5 bg-brand text-white text-xs font-medium rounded-lg hover:bg-brand-700 transition-colors">
              Book / Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
