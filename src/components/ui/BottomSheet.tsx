'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { X, Bookmark, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const { savedItemIds, unsaveItem, places, events, deals } = useAppContext();

  const savedPlaces = places.filter((p) => savedItemIds.includes(p.id));
  const savedEvents = events.filter((e) => savedItemIds.includes(e.id));
  const savedDeals = deals.filter((d) => savedItemIds.includes(d.id));

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
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[70vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-blue-600 fill-blue-600" />
                <h2 className="font-bold text-gray-900">Saved ({savedItemIds.length})</h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4">
              {savedItemIds.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No saved items yet</p>
                  <p className="text-xs text-gray-400 mt-1">Tap the bookmark icon on any item to save it</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedPlaces.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Places</h3>
                      <div className="space-y-2">
                        {savedPlaces.map((p) => (
                          <SavedItemRow
                            key={p.id}
                            name={p.name}
                            subtitle={p.address}
                            imageUrl={p.photoUrl}
                            onRemove={() => unsaveItem(p.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {savedEvents.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Events</h3>
                      <div className="space-y-2">
                        {savedEvents.map((e) => (
                          <SavedItemRow
                            key={e.id}
                            name={e.name}
                            subtitle={e.category}
                            imageUrl={e.imageUrl}
                            onRemove={() => unsaveItem(e.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {savedDeals.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Deals</h3>
                      <div className="space-y-2">
                        {savedDeals.map((d) => (
                          <SavedItemRow
                            key={d.id}
                            name={d.title}
                            subtitle={d.businessName}
                            imageUrl={d.imageUrl}
                            onRemove={() => unsaveItem(d.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SavedItemRow({
  name,
  subtitle,
  imageUrl,
  onRemove,
}: {
  name: string;
  subtitle: string;
  imageUrl: string | null;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-10 h-10 rounded-lg object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <Bookmark size={14} className="text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
      <button onClick={onRemove} className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500">
        <Trash2 size={14} />
      </button>
    </div>
  );
}
