"use client";

import { Calendar } from "lucide-react";
import { SaveButton } from "../shared/SaveButton";
import { useSavedItems } from "@/hooks/useSavedItems";

export interface FeedEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl: string;
}

export const feedEvents: FeedEvent[] = [
  { id: "evt-jazz", title: "Jazz at the Rex", date: "Tonight · 9 PM", venue: "The Rex Hotel Jazz Bar", imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80" },
  { id: "evt-kensington", title: "Kensington Night Market", date: "Sat Jun 21 · 6 PM", venue: "Kensington Market", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" },
];

export function EventCard({ event }: { event: FeedEvent }) {
  const { isSaved, toggle } = useSavedItems();

  return (
    <div className="px-4 py-5">
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-3 flex gap-3 h-[160px]">
        <div className="relative w-[38%] flex-shrink-0 rounded-[14px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          <SaveButton saved={isSaved(event.id)} onToggle={() => toggle(event.id)} size={14} className="absolute top-2 right-2" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-[#E00707] w-fit mb-2">
            <Calendar size={11} />
            <span className="text-[10px] font-bold uppercase">Event</span>
          </span>
          <h3 className="text-base font-bold text-gray-900">{event.title}</h3>
          <p className="text-sm font-semibold text-gray-700 mt-1">{event.date}</p>
          <p className="text-xs text-gray-500 mt-0.5">{event.venue}</p>
        </div>
      </div>
    </div>
  );
}
