'use client';

import { useEffect, useState, use } from 'react';
import { Business } from '@/types';
import { CuratedBusiness } from '@/types/curated';
import { curatedToBusiness } from '@/lib/utils';
import { Star, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

import laData from '@/data/la.json';
import sfData from '@/data/sf.json';
import torontoData from '@/data/toronto.json';

const ALL_DATA = [
  ...(laData as CuratedBusiness[]),
  ...(sfData as CuratedBusiness[]),
  ...(torontoData as CuratedBusiness[]),
];

export default function SharedListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voterName, setVoterName] = useState('');
  const [votedFor, setVotedFor] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = atob(id).split(',');
    const matched = ids
      .map((bizId) => ALL_DATA.find((b) => b.id === bizId))
      .filter(Boolean)
      .map((c) => curatedToBusiness(c!));
    setBusinesses(matched);
    setLoading(false);
  }, [id]);

  const handleVote = async (businessId: string) => {
    if (!voterName.trim()) return;
    setVotedFor((prev) => new Set([...prev, businessId]));
    setVotes((prev) => ({
      ...prev,
      [businessId]: (prev[businessId] || 0) + 1,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading shortlist...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-8">
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-bold text-gray-900">Shared Shortlist</h1>
        <p className="text-xs text-gray-500 mt-0.5">{businesses.length} places to choose from — vote for your favorite!</p>
      </header>

      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <label className="text-xs text-gray-500 block mb-1">Your name (to vote)</label>
        <input
          type="text"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="px-4 mt-4 space-y-3">
        {businesses.map((biz) => {
          const voteCount = votes[biz.id] || 0;
          const hasVoted = votedFor.has(biz.id);

          return (
            <div key={biz.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900">{biz.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-700">{biz.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatPrice(biz.priceLevel)}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{biz.cuisine}</span>
                  </div>
                  {biz.hook && (
                    <p className="text-xs text-gray-600 italic mt-1">{biz.hook}</p>
                  )}
                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin size={10} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{biz.neighborhood}</span>
                  </div>
                  {biz.michelinStatus && (
                    <span className="inline-block mt-1 text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded">
                      ⭐ {biz.michelinStatus}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleVote(biz.id)}
                  disabled={hasVoted || !voterName.trim()}
                  className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all ${
                    hasVoted
                      ? 'bg-brand-50'
                      : voterName.trim()
                        ? 'bg-gray-100 hover:bg-brand-50'
                        : 'bg-gray-50 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="text-lg">{hasVoted ? '🔥' : '👍'}</span>
                  <span className="text-xs font-semibold text-gray-700">{voteCount}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
