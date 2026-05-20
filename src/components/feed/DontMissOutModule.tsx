'use client';

import { useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { ScrollRow } from '@/components/cards/ScrollRow';
import { Flame, Clock, Ticket } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';
import { PhotoSlot } from '@/components/cards/PhotoSlot';

const DEAL_TEMPLATES = [
  { prefix: 'Prix fixe dinner', emoji: '🍽️', discount: '$65 tasting menu' },
  { prefix: 'Happy hour special', emoji: '🍸', discount: '50% off cocktails' },
  { prefix: 'Lunch set menu', emoji: '🥗', discount: '3 courses for $35' },
  { prefix: 'Weekend brunch', emoji: '🥂', discount: 'Bottomless mimosas $25' },
  { prefix: 'Chef\'s counter', emoji: '👨‍🍳', discount: 'Last 2 seats tonight' },
  { prefix: 'Seasonal special', emoji: '🌿', discount: 'Limited time menu' },
];

export function DontMissOutModule() {
  const { places, selectedCity } = useAppContext();

  const urgentItems = useMemo(() => {
    const buzzPlaces = places
      .filter((p) => p.buzzFactor.toLowerCase().includes('eater') || p.buzzFactor.toLowerCase().includes('resy') || p.michelinStatus)
      .slice(0, 6);

    return buzzPlaces.map((p, i) => {
      const template = DEAL_TEMPLATES[i % DEAL_TEMPLATES.length];
      const hoursLeft = 2 + (i * 3) % 6;
      return {
        id: `deal-${p.id}`,
        businessId: p.id,
        businessName: p.name,
        neighborhood: p.neighborhood,
        hook: p.hook,
        city: p.city || selectedCity,
        ...template,
        hoursLeft,
      };
    });
  }, [places, selectedCity]);

  if (urgentItems.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-orange-500" />
          <h2 className="text-base font-bold text-gray-900">Don&apos;t miss out</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">Limited time — act now</p>
      </div>
      <ScrollRow>
        {urgentItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-64 snap-start bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden"
          >
            <PhotoSlot name={item.businessName} city={item.city} className="w-full h-28" fallbackEmoji={item.emoji} />
            <div className="p-3">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">{item.businessName}</h3>
                <SaveButton itemId={item.businessId} size="sm" />
              </div>
              <p className="text-xs text-gray-600 italic truncate">{item.hook}</p>
              <div className="flex items-center gap-1 mt-2">
                <Ticket size={12} className="text-orange-600" />
                <span className="text-xs font-medium text-orange-700">{item.discount}</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Clock size={11} className="text-red-500" />
                <span className="text-[11px] text-red-600 font-medium">{item.hoursLeft}h left</span>
              </div>
            </div>
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}
