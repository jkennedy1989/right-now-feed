'use client';

import { cn } from '@/lib/utils';

interface MarkerPinProps {
  emoji: string;
  color: string;
  isActive: boolean;
  pulse?: boolean;
  small?: boolean;
}

export function MarkerPin({ emoji, color, isActive, pulse, small }: MarkerPinProps) {
  return (
    <div className="relative flex items-center justify-center">
      {pulse && (
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ backgroundColor: color, opacity: 0.4 }}
        />
      )}
      <div
        className={cn(
          'flex items-center justify-center rounded-full shadow-lg border-2 border-white transition-transform duration-200',
          small ? 'w-6 h-6 scale-90' : isActive ? 'w-10 h-10 scale-110' : 'w-8 h-8 scale-100'
        )}
        style={{ backgroundColor: color }}
      >
        <span className={cn('select-none', small ? 'text-xs' : isActive ? 'text-lg' : 'text-sm')}>
          {emoji}
        </span>
      </div>
      <div
        className="absolute -bottom-1 w-2 h-2 rotate-45 border-b-2 border-r-2 border-white"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
