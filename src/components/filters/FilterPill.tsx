'use client';

import { cn } from '@/lib/utils';
import { PrimaryFilterPill, SecondaryFilterPill } from '@/types/filters';

interface PrimaryPillProps {
  pill: PrimaryFilterPill;
  isActive: boolean;
  onToggle: () => void;
}

export function PrimaryPill({ pill, isActive, onToggle }: PrimaryPillProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm whitespace-nowrap snap-start',
        'border transition-all duration-200 shadow-sm',
        isActive
          ? 'bg-brand text-white border-brand-700 shadow-md font-semibold'
          : 'bg-white text-gray-900 border-gray-200 font-medium hover:bg-gray-50'
      )}
    >
      <span className="text-base">{pill.emoji}</span>
      <span>{pill.label}</span>
    </button>
  );
}

interface SecondaryPillProps {
  pill: SecondaryFilterPill;
  isActive: boolean;
  onToggle: () => void;
}

export function SecondaryPill({ pill, isActive, onToggle }: SecondaryPillProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap snap-start',
        'border transition-all duration-200',
        isActive
          ? 'bg-red-50 text-brand-600 border-transparent shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      )}
    >
      <span>{pill.label}</span>
    </button>
  );
}
