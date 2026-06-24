"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { CuratedList } from "@/data/lists";
import { SaveButton } from "../shared/SaveButton";
import { useSavedItems } from "@/hooks/useSavedItems";

const mockTimes = [
  ["6:30 PM", "7:00 PM", "8:15 PM"],
  ["7:00 PM", "7:30 PM", "9:00 PM"],
  ["6:00 PM", "7:15 PM", "8:00 PM", "9:30 PM"],
  ["7:30 PM", "8:00 PM", "8:45 PM"],
  ["6:15 PM", "7:00 PM", "8:30 PM"],
  ["7:00 PM", "8:00 PM", "9:15 PM"],
  ["6:45 PM", "7:30 PM", "8:15 PM", "9:00 PM"],
];

export function SavedListCarousel({ list }: { list: CuratedList }) {
  const { toggle } = useSavedItems();
  const [booked, setBooked] = useState<Record<string, string>>({});

  const handleBook = (bizId: string, time: string) => {
    setBooked((prev) => ({ ...prev, [bizId]: time }));
    setTimeout(() => {
      setBooked((prev) => {
        const next = { ...prev };
        delete next[bizId];
        return next;
      });
    }, 2000);
  };

  return (
    <div className="py-5">
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">{list.title}</h2>
            {list.description && <p className="text-xs text-gray-500 mt-0.5">{list.description}</p>}
          </div>
          <Link href={`/list/${list.id}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <ChevronRight size={18} className="text-gray-600" />
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 pb-2 w-max">
          {list.businesses.map((biz, i) => (
            <div key={biz.id} className="w-[240px] flex-shrink-0">
              <div className="relative h-[140px] rounded-[20px] overflow-hidden">
                <Image
                  src={biz.imageUrl}
                  alt={biz.name}
                  fill
                  className="object-cover"
                  sizes="240px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <SaveButton
                  saved={true}
                  onToggle={() => toggle(biz.id)}
                  size={14}
                  className="absolute top-2 right-2"
                />
              </div>
              <div className="mt-2 px-0.5">
                <h4 className="font-semibold text-gray-900 text-sm truncate">{biz.name}</h4>
                {booked[biz.id] ? (
                  <div className="mt-2 py-1.5 px-3 bg-green-50 rounded-lg text-center">
                    <span className="text-green-700 text-xs font-semibold">✓ Booked for {booked[biz.id]}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto scrollbar-hide">
                    <Clock size={11} className="text-gray-400 flex-shrink-0" />
                    {mockTimes[i % mockTimes.length].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleBook(biz.id, time)}
                        className="flex-shrink-0 px-2 py-1 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
