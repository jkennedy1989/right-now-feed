'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-gray-200', className)} />
  );
}

export function CardSkeleton() {
  return (
    <div className="flex-shrink-0 w-64 snap-start rounded-xl border border-gray-100 overflow-hidden">
      <Skeleton className="w-full h-32 rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-4xl mb-2">🗺️</div>
        <p className="text-sm text-gray-400">Loading map...</p>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="p-4 space-y-6">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <div>
        <Skeleton className="h-5 w-40 mb-3" />
        <div className="flex gap-3">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
      <div>
        <Skeleton className="h-5 w-36 mb-3" />
        <div className="flex gap-3">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
