'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { ScrollRow } from '@/components/cards/ScrollRow';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { CalendarCheck, Users, Truck } from 'lucide-react';

export function AvailabilitySection() {
  const { places } = useAppContext();

  const reservationPlaces = places.filter((p) => p.attributes.hasReservations).slice(0, 8);
  const deliveryPlaces = places.filter((p) => p.attributes.hasDelivery).slice(0, 8);
  const waitlistPlaces = places.filter((p) => p.isOpenNow && p.rating >= 4).slice(0, 8);

  if (reservationPlaces.length === 0 && deliveryPlaces.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">Availability</h2>
        <p className="text-xs text-gray-500 mt-0.5">Ready when you are</p>
      </div>

      {reservationPlaces.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 px-4 mb-2">
            <CalendarCheck size={14} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Reserve a table</span>
          </div>
          <ScrollRow>
            {reservationPlaces.map((p) => (
              <BusinessCard key={p.id} business={p} variant="compact" actionBadge="Book" />
            ))}
          </ScrollRow>
        </div>
      )}

      {waitlistPlaces.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 px-4 mb-2">
            <Users size={14} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">Skip the wait</span>
          </div>
          <ScrollRow>
            {waitlistPlaces.map((p) => (
              <BusinessCard key={p.id} business={p} variant="compact" actionBadge="Join waitlist" />
            ))}
          </ScrollRow>
        </div>
      )}

      {deliveryPlaces.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 px-4 mb-2">
            <Truck size={14} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Order delivery</span>
          </div>
          <ScrollRow>
            {deliveryPlaces.map((p) => (
              <BusinessCard key={p.id} business={p} variant="compact" actionBadge="Order" />
            ))}
          </ScrollRow>
        </div>
      )}
    </section>
  );
}
