'use client';

import { cn } from '@/lib/utils';
import { ProofBadge } from '@/types';

interface MarkerPinProps {
  emoji: string;
  color: string;
  isActive: boolean;
  pulse?: boolean;
  small?: boolean;
  badge?: ProofBadge;
  label?: string;
  showLabel?: boolean;
}

export function MarkerPin({ emoji, color, isActive, pulse, small, badge, label, showLabel }: MarkerPinProps) {
  return (
    <div className="relative flex flex-col items-center">
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
        {badge && (
          <div className="absolute -top-1.5 -right-2 flex items-center px-1 py-0.5 bg-white rounded-full shadow-sm border border-gray-100 text-[9px] leading-none">
            {badge.type === 'friend' && badge.friendAvatar ? (
              <img src={badge.friendAvatar} alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
            ) : (
              <span>{badge.emoji}</span>
            )}
          </div>
        )}
      </div>
      {showLabel && label && (
        <div className="mt-1 whitespace-nowrap text-[10px] font-semibold text-gray-900 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm max-w-[80px] truncate text-center">
          {label}
        </div>
      )}
    </div>
  );
}
