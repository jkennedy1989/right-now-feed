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
        'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap snap-start',
        'border transition-all duration-200 shadow-sm',
        isActive
          ? 'bg-brand-600 text-white border-brand-700 shadow-md scale-105'
          : 'bg-white/90 text-gray-700 border-gray-200 hover:bg-gray-50'
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
          ? 'bg-brand-100 text-brand-700 border-brand-300 shadow-sm'
          : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gray-50'
      )}
    >
      <span>{pill.label}</span>
    </button>
  );
}
