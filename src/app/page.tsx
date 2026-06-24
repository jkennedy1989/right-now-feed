'use client';

import { MapContainer } from '@/components/map/MapContainer';
import { Feed } from '@/components/feed/Feed';
import { Search, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="h-full flex flex-col overflow-hidden">
      {/* Map section */}
      <div className="relative h-[40vh] flex-shrink-0">
        <MapContainer />

        {/* Header */}
        <header className="absolute top-3 left-3 right-3 z-30 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 rounded-full">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400">Search restaurants, bars...</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm flex-shrink-0">
            <MapPin size={12} className="text-brand-600" />
            <span className="text-xs font-semibold text-gray-900">Toronto</span>
          </div>
        </header>
      </div>

      {/* Feed section */}
      <div className="flex-1 overflow-y-auto">
        <Feed />
      </div>
    </main>
  );
}
