"use client";

import { CuratedList } from "@/data/lists";
import { ListThumb } from "../shared/ListThumb";
import { useSavedItems } from "@/hooks/useSavedItems";

interface ListOfListsCarouselProps {
  lists: CuratedList[];
}

export function ListOfListsCarousel({ lists }: ListOfListsCarouselProps) {
  const { isSaved, toggle } = useSavedItems();

  return (
    <div className="py-4">
      <h2 className="px-4 text-lg font-bold text-gray-900 mb-3">❤️ Curated for you</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2 w-max">
          {lists.map((list) => (
            <ListThumb
              key={list.id}
              list={list}
              saved={isSaved(list.id)}
              onToggleSave={() => toggle(list.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
