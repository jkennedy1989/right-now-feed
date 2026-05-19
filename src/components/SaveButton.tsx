'use client';

import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/providers/AppContextProvider';

interface SaveButtonProps {
  itemId: string;
  className?: string;
}

export function SaveButton({ itemId, className }: SaveButtonProps) {
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

  return (
    <button
      onClick={handleClick}
      className={cn(
        'p-1.5 rounded-full transition-all duration-200',
        saved ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        className
      )}
    >
      <Bookmark
        size={16}
        className={cn('transition-transform duration-200', saved && 'fill-blue-600 scale-110')}
      />
    </button>
  );
}
