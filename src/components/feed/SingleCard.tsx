"use client";

import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/providers/AppContextProvider";
import { CuratedList } from "@/data/lists";
import { SaveButton } from "../shared/SaveButton";
import { useSavedItems } from "@/hooks/useSavedItems";

interface SingleCardProps {
  list: CuratedList;
}

export function SingleCard({ list }: SingleCardProps) {
  const { isSaved, toggle } = useSavedItems();
  const { selectBusinessByName } = useAppContext();
  const images = list.businesses.slice(0, 4).map((b) => b.imageUrl);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <div className="px-4 py-4">
      <div onClick={() => selectBusinessByName(list.businesses[0]?.name)} className="block cursor-pointer">
        <div className="relative h-[300px] rounded-[20px] overflow-hidden">
          <div className="absolute inset-0 flex gap-[2px]">
            <div className="relative w-[60%] h-full">
              {!imgErrors[0] ? (
                <Image src={images[0]} alt="" fill className="object-cover" sizes="60vw" unoptimized onError={() => setImgErrors((p) => ({ ...p, 0: true }))} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
              )}
            </div>
            <div className="flex flex-col gap-[2px] w-[40%]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex-1">
                  {images[i] && !imgErrors[i] ? (
                    <Image src={images[i]} alt="" fill className="object-cover" sizes="40vw" unoptimized onError={() => setImgErrors((p) => ({ ...p, [i]: true }))} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <SaveButton saved={isSaved(list.id)} onToggle={() => toggle(list.id)} size={16} className="absolute top-3 right-3" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white leading-tight">{list.title}</h3>
            {list.description && <p className="text-white/70 text-xs mt-1">{list.description}</p>}
            {list.author && <p className="text-white/50 text-[10px] mt-1">{list.author}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
