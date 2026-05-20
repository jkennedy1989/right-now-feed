'use client';

import { Business } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';
import { PhotoSlot } from '@/components/cards/PhotoSlot';

interface MapInfoCardProps {
  business: Business;
  onClose: () => void;
}

export function MapInfoCard({ business }: MapInfoCardProps) {
  return (
    <div className="w-56 p-0 overflow-hidden">
      <PhotoSlot name={business.name} city={business.city} className="w-full h-24 rounded-t-lg" />
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm text-gray-900 leading-tight pr-1">
            {business.name}
          </h3>
          <SaveButton itemId={business.id} size="sm" />
        </div>
        <div className="flex items-center gap-1">
          <Star size={11} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-gray-700">{business.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">{formatPrice(business.priceLevel)}</span>
          {business.michelinStatus && (
            <span className="text-[10px] bg-red-50 text-red-700 px-1 rounded">⭐ {business.michelinStatus}</span>
          )}
        </div>
        {business.hook && (
          <p className="text-xs text-gray-600 italic leading-tight line-clamp-2">{business.hook}</p>
        )}
        <p className="text-[11px] text-gray-400">{business.neighborhood}</p>
      </div>
    </div>
  );
}
