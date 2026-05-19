'use client';

import { FilterPill as FilterPillType } from '@/types';
import { cn } from '@/lib/utils';

interface FilterPillProps {
  pill: FilterPillType;
  isActive: boolean;
  onToggle: () => void;
}

export function FilterPill({ pill, isActive, onToggle }: FilterPillProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap snap-start',
        'border transition-all duration-200 shadow-sm',
        isActive
          ? `${pill.color.bg} ${pill.color.text} ${pill.color.border} shadow-md scale-105`
          : 'bg-white/90 text-gray-700 border-gray-200 hover:bg-gray-50'
      )}
    >
      <span className="text-base">{pill.emoji}</span>
      <span>{pill.label}</span>
    </button>
  );
}
