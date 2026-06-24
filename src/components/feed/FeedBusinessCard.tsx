'use client';

import { ContentBusiness } from '@/data/toronto-content';
import { RatingPill } from '@/components/ui/RatingPill';

interface FeedBusinessCardProps {
  business: ContentBusiness;
  rank?: number;
  friendActivity?: string;
  onTap?: () => void;
}

export function FeedBusinessCard({ business, rank, friendActivity, onTap }: FeedBusinessCardProps) {
  return (
    <button
      onClick={onTap}
      className="flex-shrink-0 w-[160px] rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="h-[100px] w-full relative bg-gray-100">
        {business.imageUrl && (
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {rank && (
          <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-black/70 text-white text-[10px] font-bold flex items-center justify-center">
            {rank}
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-xs font-semibold text-gray-900 line-clamp-1">{business.name}</p>
        {business.rating > 0 && (
          <div className="mt-0.5">
            <RatingPill rating={business.rating} size="sm" />
          </div>
        )}
        {friendActivity && (
          <p className="text-[10px] text-blue-600 mt-0.5 line-clamp-1">{friendActivity}</p>
        )}
        {!friendActivity && business.description && (
          <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{business.description}</p>
        )}
      </div>
    </button>
  );
}
