"use client";

import { Search, MapPin } from "lucide-react";

export function SearchBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="px-4 h-14 flex items-center gap-3">
        <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full overflow-hidden">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-400 truncate">Search restaurants, bars...</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex-shrink-0">
          <MapPin size={12} className="text-[#E00707]" />
          <span className="text-xs font-semibold text-gray-900">Toronto</span>
        </div>
      </div>
    </header>
  );
}
