'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { X, Bookmark, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const { shortlistIds, unshortlistItem, clearShortlist, places } = useAppContext();

  const shortlistedPlaces = places.filter((p) => shortlistIds.includes(p.id));

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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[80vh] flex flex-col"
          >
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-brand" />
                <h2 className="text-base font-bold text-gray-900">
                  Your Shortlist ({shortlistedPlaces.length})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {shortlistedPlaces.length > 0 && (
                  <button
                    onClick={clearShortlist}
                    className="text-xs text-gray-500 hover:text-brand px-2 py-1 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Clear all
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
