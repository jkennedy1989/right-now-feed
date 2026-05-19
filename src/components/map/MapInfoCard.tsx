'use client';

import { Business } from '@/types';
import { formatDistance, formatPrice } from '@/lib/utils';
import { Star, X } from 'lucide-react';

interface MapInfoCardProps {
  business: Business;
  onClose: () => void;
}

export function MapInfoCard({ business, onClose }: MapInfoCardProps) {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-3 w-72 z-50 border border-gray-100">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
      >
        <X size={14} className="text-gray-500" />
      </button>
      <div className="flex gap-3">
        {business.photoUrl && (
          <img
            src={business.photoUrl}
            alt={business.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 truncate">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-gray-700">{business.rating}</span>
            <span className="text-xs text-gray-400">({business.reviewCount})</span>
            <span className="text-xs text-gray-400 ml-1">
              {formatPrice(business.priceLevel)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{business.address}</p>
          {business.distance !== undefined && (
            <p className="text-xs text-blue-600 font-medium mt-0.5">
              {formatDistance(business.distance)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
