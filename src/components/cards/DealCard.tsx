'use client';

import { Deal } from '@/types';
import { formatTimeRemaining } from '@/lib/utils';
import { Clock, Tag } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';
import { useEffect, useState } from 'react';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const [timeLeft, setTimeLeft] = useState(formatTimeRemaining(deal.timeEnd));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeRemaining(deal.timeEnd));
    }, 60000);
    return () => clearInterval(interval);
  }, [deal.timeEnd]);

  return (
    <div className="flex-shrink-0 w-64 snap-start bg-white rounded-xl border border-yellow-100 shadow-sm overflow-hidden">
      <div className="relative">
        {deal.imageUrl ? (
          <img src={deal.imageUrl} alt={deal.title} className="w-full h-28 object-cover" />
        ) : (
          <div className="w-full h-28 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
            <Tag size={32} className="text-yellow-500" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <SaveButton itemId={deal.id} />
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
          <Clock size={10} />
          {timeLeft}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 truncate">{deal.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{deal.description}</p>
        <p className="text-xs text-orange-600 font-medium mt-1">{deal.businessName}</p>
      </div>
    </div>
  );
}
