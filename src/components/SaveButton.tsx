'use client';

import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/providers/AppContextProvider';

interface SaveButtonProps {
  itemId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function SaveButton({ itemId, size = 'md', className }: SaveButtonProps) {
  const { isSaved, saveItem, unsaveItem } = useAppContext();
  const saved = isSaved(itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveItem(itemId);
    } else {
      saveItem(itemId);
    }
  };

  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'rounded-full transition-all duration-200',
        size === 'sm' ? 'p-1' : 'p-1.5',
        saved ? 'text-brand bg-brand-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        className
      )}
    >
      <Bookmark
        size={iconSize}
        className={cn('transition-transform duration-200', saved && 'fill-brand scale-110')}
      />
    </button>
  );
}
