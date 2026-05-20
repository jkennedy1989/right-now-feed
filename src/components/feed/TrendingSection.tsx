'use client';

import { useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { TrendingUp } from 'lucide-react';

const BUZZ_SCORES: Record<string, number> = {
  'michelin': 10,
  'resy hit list': 9,
  'eater': 8,
  'infatuation': 7,
  'time out': 6,
  'bon appétit': 6,
  'toronto life': 5,
  'blogto': 4,
  'tiktok': 3,
};

function scoreBuzz(buzzFactor: string): number {
  const lower = buzzFactor.toLowerCase();
  let score = 0;
  for (const [keyword, points] of Object.entries(BUZZ_SCORES)) {
    if (lower.includes(keyword)) score += points;
  }
  return score;
}

export function TrendingSection() {
  const { places } = useAppContext();

  const trending = useMemo(() => {
    return [...places]
      .map((p) => ({ place: p, score: scoreBuzz(p.buzzFactor) }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((p) => p.place);
  }, [places]);

  if (trending.length === 0) return null;

  return (
    <section className="mt-6 mb-8">
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-rose-500" />
          <h2 className="text-base font-bold text-gray-900">Top 10 trending</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">What locals are talking about</p>
      </div>
      <div className="px-4 space-y-2">
        {trending.map((business, index) => (
          <BusinessCard
            key={business.id}
            business={business}
            variant="full"
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
