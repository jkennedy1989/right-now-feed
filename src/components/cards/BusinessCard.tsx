'use client';

import { Business } from '@/types';
import { formatDistance, formatPrice } from '@/lib/utils';
import { Star, Clock, MapPin } from 'lucide-react';
import { SaveButton } from '@/components/SaveButton';

interface BusinessCardProps {
  business: Business;
  variant?: 'compact' | 'full';
  actionBadge?: string;
}

export function BusinessCard({ business, variant = 'compact', actionBadge }: BusinessCardProps) {
  if (variant === 'compact') {
    return (
      <div className="flex-shrink-0 w-64 snap-start bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="relative">
          {business.photoUrl ? (
            <img
              src={business.photoUrl}
              alt={business.name}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-3xl">🍽️</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <SaveButton itemId={business.id} />
          </div>
          {actionBadge && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
              {actionBadge}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{business.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-gray-700">{business.rating}</span>
            <span className="text-xs text-gray-400">({business.reviewCount})</span>
            <span className="text-xs text-gray-400 ml-auto">{formatPrice(business.priceLevel)}</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={10} className="text-gray-400" />
            <span className="text-xs text-gray-500 truncate">{business.address}</span>
          </div>
          {business.isOpenNow && (
            <div className="flex items-center gap-1 mt-1">
              <Clock size={10} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">Open now</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
      {business.photoUrl ? (
        <img
          src={business.photoUrl}
          alt={business.name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🍽️</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{business.name}</h3>
          <SaveButton itemId={business.id} />
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-gray-700">{business.rating}</span>
          <span className="text-xs text-gray-400">({business.reviewCount})</span>
          <span className="text-xs text-gray-400 ml-2">{formatPrice(business.priceLevel)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">{business.address}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {business.isOpenNow && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
              <Clock size={10} /> Open
            </span>
          )}
          {business.distance !== undefined && (
            <span className="text-xs text-gray-500">{formatDistance(business.distance)}</span>
          )}
          {actionBadge && (
            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
              {actionBadge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
