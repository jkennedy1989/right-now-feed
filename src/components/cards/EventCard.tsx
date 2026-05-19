'use client';

import { EventItem } from '@/types';
import { Calendar } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.timeStart);
  const timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const isToday = new Date().toDateString() === startDate.toDateString();

  return (
    <div className="flex-shrink-0 w-64 snap-start bg-white rounded-xl border border-purple-100 shadow-sm overflow-hidden">
      <div className="relative">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.name} className="w-full h-28 object-cover" />
        ) : (
          <div className="w-full h-28 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
            <Calendar size={32} className="text-purple-500" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <SaveButton itemId={event.id} />
        </div>
        {isToday && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
            Today
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{event.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Calendar size={10} className="text-purple-500" />
          <span className="text-xs text-gray-600">{isToday ? `Today at ${timeStr}` : timeStr}</span>
        </div>
        {event.cost !== null && (
          <span className="text-xs text-gray-500 mt-0.5 block">
            {event.cost === 0 ? 'Free' : `$${event.cost}`}
          </span>
        )}
      </div>
    </div>
  );
}
