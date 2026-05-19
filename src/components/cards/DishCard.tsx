'use client';

import { DishItem } from '@/types';
import { SaveButton } from '@/components/SaveButton';

interface DishCardProps {
  dish: DishItem;
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <div className="flex-shrink-0 w-44 snap-start bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="relative">
        <img src={dish.photoUrl} alt={dish.name} className="w-full h-28 object-cover" />
        <div className="absolute top-2 right-2">
          <SaveButton itemId={dish.id} />
        </div>
      </div>
      <div className="p-2.5">
        <h3 className="font-semibold text-xs text-gray-900 truncate">{dish.name}</h3>
        <p className="text-xs text-gray-500 truncate mt-0.5">{dish.businessName}</p>
        {dish.price && (
          <p className="text-xs text-green-700 font-medium mt-0.5">${dish.price}</p>
        )}
      </div>
    </div>
  );
}
