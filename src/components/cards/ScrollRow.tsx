'use client';

import { cn } from '@/lib/utils';

interface ScrollRowProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollRow({ children, className }: ScrollRowProps) {
  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto scroll-snap-x scrollbar-hide px-4 pb-2',
        className
      )}
    >
      {children}
    </div>
  );
}
