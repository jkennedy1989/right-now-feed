'use client';

import { useAppContext } from '@/providers/AppContextProvider';
import { Cloud, Utensils, Calendar, TrendingUp } from 'lucide-react';

export function NeighborhoodModule() {
  const { signals, places, events } = useAppContext();

  const topCuisine = getTopCuisine(places.map((p) => p.primaryCategory));
  const weatherDesc = signals.weather
    ? `${signals.weather.temp}°F, ${signals.weather.condition}`
    : 'Loading...';

  const trendingCount = places.filter((p) => p.reviewCount > 100).length;

  return (
    <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-100">
      <h2 className="text-sm font-bold text-gray-900 mb-3">Your neighborhood right now</h2>
      <div className="grid grid-cols-2 gap-3">
        <StatBlock
          icon={<Cloud size={16} className="text-blue-500" />}
          label="Weather"
          value={weatherDesc}
        />
        <StatBlock
          icon={<Utensils size={16} className="text-orange-500" />}
          label="Popular cuisine"
          value={topCuisine || 'Varied'}
        />
        <StatBlock
          icon={<Calendar size={16} className="text-purple-500" />}
          label="Events today"
          value={`${events.length} happening`}
        />
        <StatBlock
          icon={<TrendingUp size={16} className="text-rose-500" />}
          label="Trending"
          value={`${trendingCount} spots`}
        />
      </div>
    </div>
  );
}

function StatBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function getTopCuisine(categories: string[]): string {
  const counts: Record<string, number> = {};
  categories.forEach((c) => {
    if (c !== 'restaurant' && c !== 'food') {
      counts[c] = (counts[c] || 0) + 1;
    }
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return 'Varied';
  return sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1);
}
