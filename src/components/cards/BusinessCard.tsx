'use client';

import { Business } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Star, MapPin } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';
import { PhotoSlot } from '@/components/cards/PhotoSlot';

interface BusinessCardProps {
  business: Business;
  variant?: 'compact' | 'full';
  actionBadge?: string;
  rank?: number;
  hookOverride?: string;
}

export function BusinessCard({ business, variant = 'compact', actionBadge, rank, hookOverride }: BusinessCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex-shrink-0 w-64 snap-start bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="relative">
          <PhotoSlot name={business.name} city={business.city} className="w-full h-32" />
          <div className="absolute top-2 right-2">
            <SaveButton itemId={business.id} />
          </div>
          {actionBadge && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-brand text-white text-xs font-medium rounded-full">
              {actionBadge}
            </div>
          )}
          {rank && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-black/70 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {rank}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{business.name}</h3>
          {(hookOverride || business.hook) && (
            <p className="text-xs text-gray-500 italic mt-0.5 truncate">{hookOverride || business.hook}</p>
          )}
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-gray-700">{business.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">{formatPrice(business.priceLevel)}</span>
            {business.michelinStatus && (
              <span className="text-[10px] bg-red-50 text-red-700 px-1 rounded ml-auto">⭐</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={10} className="text-gray-400" />
            <span className="text-xs text-gray-500 truncate">{business.neighborhood}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
      <PhotoSlot name={business.name} city={business.city} className="w-20 h-20 rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {rank && (
              <span className="w-5 h-5 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {rank}
              </span>
            )}
            <h3 className="font-semibold text-sm text-gray-900 truncate">{business.name}</h3>
          </div>
          <SaveButton itemId={business.id} />
        </div>
        {(hookOverride || business.hook) && (
          <p className="text-xs text-gray-500 italic mt-0.5 line-clamp-1">{hookOverride || business.hook}</p>
        )}
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-gray-700">{business.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">{formatPrice(business.priceLevel)}</span>
          {business.michelinStatus && (
            <span className="text-[10px] bg-red-50 text-red-700 px-1 rounded">{business.michelinStatus}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-gray-500">{business.neighborhood}</span>
          {actionBadge && (
            <span className="text-xs bg-brand-50 text-brand px-1.5 py-0.5 rounded-full font-medium">
              {actionBadge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
