'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { X, GripVertical, MapPin, Share2, Navigation } from 'lucide-react';
import { Reorder } from 'framer-motion';
import { Business } from '@/types';

interface PlanItem {
  businessId: string;
  note: string;
}

function buildDirectionsUrl(items: PlanItem[], places: Business[], userLocation?: { lat: number; lng: number }): string {
  const orderedPlaces = items
    .map((item) => places.find((p) => p.id === item.businessId))
    .filter(Boolean) as Business[];

  if (orderedPlaces.length === 0) return '';

  const origin = userLocation
    ? `${userLocation.lat},${userLocation.lng}`
    : `${orderedPlaces[0].location.lat},${orderedPlaces[0].location.lng}`;

  const destination = orderedPlaces[orderedPlaces.length - 1];
  const waypoints = orderedPlaces
    .slice(0, -1)
    .map((p) => `${p.location.lat},${p.location.lng}`)
    .join('|');

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination.location.lat},${destination.location.lng}`;
  if (waypoints) url += `&waypoints=${waypoints}`;
  return url;
}

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanModal({ isOpen, onClose }: PlanModalProps) {
  const { shortlistIds, places, selectedCity } = useAppContext();
  const [isSharing, setIsSharing] = useState(false);

  const shortlistedPlaces = useMemo(
    () => places.filter((p) => shortlistIds.includes(p.id)),
    [places, shortlistIds]
  );

  const [planItems, setPlanItems] = useState<PlanItem[]>(() =>
    shortlistedPlaces.map((p) => ({ businessId: p.id, note: '' }))
  );

  const updateNote = (businessId: string, note: string) => {
    setPlanItems((prev) =>
      prev.map((item) => (item.businessId === businessId ? { ...item, note } : item))
    );
  };

  const handleGetDirections = () => {
    const url = buildDirectionsUrl(planItems, places);
    if (url) window.open(url, '_blank');
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const orderedIds = planItems.map((item) => item.businessId);
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: 'Anonymous',
          city: selectedCity,
          businessIds: orderedIds,
        }),
      });
      const data = await res.json();
      const url = `${window.location.origin}/list/${data.id}`;

      if (navigator.share) {
        await navigator.share({ title: 'My Plan', url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // silent
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-brand" />
          <h2 className="text-base font-bold text-gray-900">Plan Your Route</h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {planItems.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Add items to your shortlist to plan a route.</p>
        ) : (
          <Reorder.Group values={planItems} onReorder={setPlanItems} axis="y" className="space-y-3">
            {planItems.map((item, index) => {
              const place = shortlistedPlaces.find((p) => p.id === item.businessId);
              if (!place) return null;

              return (
                <Reorder.Item key={item.businessId} value={item}>
                  <div className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-grab active:cursor-grabbing">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                      <GripVertical size={14} className="text-gray-400" />
                      <span className="w-5 h-5 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                      <p className="text-xs text-gray-500">{place.neighborhood} · {place.cuisine}</p>
                      <input
                        type="text"
                        value={item.note}
                        onChange={(e) => updateNote(item.businessId, e.target.value)}
                        placeholder="Add a note..."
                        className="mt-2 w-full text-xs px-2 py-1.5 bg-white rounded-md border border-gray-200 placeholder:text-gray-400 focus:outline-none focus:border-brand-300"
                      />
                    </div>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}
      </div>

      <div className="flex gap-2 px-4 py-3 border-t border-gray-100">
        <button
          onClick={handleGetDirections}
          disabled={planItems.length < 2}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-brand text-white text-sm font-medium disabled:opacity-50"
        >
          <Navigation size={14} />
          Get Directions
        </button>
        <button
          onClick={handleShare}
          disabled={isSharing || planItems.length === 0}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>
    </div>
  );
}
