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
      className="flex-shrink-0 w-[180px] rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="h-[140px] w-full relative bg-gray-100">
        {business.imageUrl && (
          business.imageUrl.includes('.mp4') || business.imageUrl.includes('stream.mux.com') ? (
            <video
              src={business.imageUrl}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              src={business.imageUrl}
              alt={business.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )
        )}
        {rank && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs font-bold flex items-center justify-center">
            {rank}
          </div>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{business.name}</p>
        {business.rating > 0 && (
          <div className="mt-1">
            <RatingPill rating={business.rating} size="sm" />
          </div>
        )}
        {friendActivity && (
          <p className="text-xs font-medium text-blue-600 mt-1 line-clamp-1">{friendActivity}</p>
        )}
        {!friendActivity && business.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{business.description}</p>
        )}
      </div>
    </button>
  );
}
