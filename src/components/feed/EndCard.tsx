"use client";

import { Search } from "lucide-react";

interface EndCardProps {
  listTitle: string;
}

function getSearchCTA(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("speakeasi")) return "Search Speakeasies";
  if (lower.includes("dumpling")) return "Search Dumplings";
  if (lower.includes("taco")) return "Search Tacos";
  if (lower.includes("bakeri")) return "Search Bakeries";
  if (lower.includes("wine")) return "Search Wine Bars";
  if (lower.includes("burger") || lower.includes("eats")) return "Search Restaurants";
  if (lower.includes("dessert") || lower.includes("cake")) return "Search Desserts";
  if (lower.includes("movie") || lower.includes("theatre")) return "Search Theatres";
  if (lower.includes("dog")) return "Search Dog-Friendly";
  if (lower.includes("nature") || lower.includes("park")) return "Search Nature";
  if (lower.includes("architect")) return "Search Architecture";
  return "Search for more like this";
}

export function EndCard({ listTitle }: EndCardProps) {
  return (
    <div className="w-[170px] h-[176px] flex-shrink-0 rounded-[20px] bg-gray-50 border border-gray-100 flex flex-col items-center justify-center gap-3 snap-start">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Search size={18} className="text-gray-400" />
      </div>
      <p className="text-xs font-medium text-gray-500 text-center px-4">{getSearchCTA(listTitle)}</p>
    </div>
  );
}
