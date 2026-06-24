"use client";

import Image from "next/image";
import Link from "next/link";
import { CuratedList } from "@/data/lists";
import { SaveButton } from "./SaveButton";

interface ListThumbProps {
  list: CuratedList;
  saved: boolean;
  onToggleSave: () => void;
  size?: "small" | "large";
}

export function ListThumb({ list, saved, onToggleSave, size = "small" }: ListThumbProps) {
  const heightClass = size === "large" ? "h-[320px]" : "h-[220px]";
  const widthClass = size === "large" ? "w-full" : "w-[170px]";
  const coverImage = list.businesses[0]?.imageUrl || "";

  return (
    <Link href={`/list/${list.id}`} className={`${widthClass} flex-shrink-0 snap-start block`}>
      <div className={`relative ${heightClass} rounded-[20px] overflow-hidden group`}>
        <Image
          src={coverImage}
          alt={list.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={size === "large" ? "100vw" : "170px"}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <SaveButton
          saved={saved}
          onToggle={onToggleSave}
          size={16}
          className="absolute top-3 right-3"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-bold text-white leading-tight ${size === "large" ? "text-xl" : "text-sm"}`}>
            {list.title}
          </h3>
          <p className={`text-white/70 mt-1 ${size === "large" ? "text-sm" : "text-[11px]"}`}>
            {list.businesses.length} spots
          </p>
        </div>
      </div>
    </Link>
  );
}
