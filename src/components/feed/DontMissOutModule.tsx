'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { ScrollRow } from '@/components/cards/ScrollRow';
import { DealCard } from '@/components/cards/DealCard';
import { EventCard } from '@/components/cards/EventCard';
import { Flame } from 'lucide-react';

export function DontMissOutModule() {
  const { deals, events } = useAppContext();

  const todayEvents = events.filter((e) => {
    const start = new Date(e.timeStart);
    return start.toDateString() === new Date().toDateString();
  });

  if (deals.length === 0 && todayEvents.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-orange-500" />
          <h2 className="text-base font-bold text-gray-900">Don&apos;t miss out</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">Ending soon near you</p>
      </div>
      <ScrollRow>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        {todayEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollRow>
    </section>
  );
}
