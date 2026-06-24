"use client";

import { useState } from "react";
import Image from "next/image";
import { SaveButton } from "./SaveButton";

interface BusinessCardBiz {
  id: string;
  name: string;
  imageUrl: string;
  hook?: string;
  description?: string;
  address?: string;
  source?: string;
  friendActivity?: string;
}

interface BusinessCardProps {
  business: BusinessCardBiz;
  saved: boolean;
  onToggleSave: () => void;
  variant?: "horizontal" | "vertical";
  rank?: number;
}

export function BusinessCard({ business, saved, onToggleSave, variant = "vertical", rank }: BusinessCardProps) {
  const [imgError, setImgError] = useState(false);
  const desc = business.hook || business.description || "";

  if (variant === "horizontal") {
    return (
      <div className="flex gap-4 p-4 bg-white rounded-[20px] shadow-sm border border-gray-100">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-[14px] overflow-hidden">
          {!imgError ? (
            <Image src={business.imageUrl} alt={business.name} fill className="object-cover" sizes="96px" unoptimized onError={() => setImgError(true)} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{business.name}</h4>
          {business.address && <p className="text-sm text-gray-500 mt-0.5 truncate">{business.address}</p>}
          <p className="text-sm text-gray-700 mt-1 leading-snug">{desc}</p>
        </div>
        <SaveButton saved={saved} onToggle={onToggleSave} size={18} className="self-start" />
      </div>
    );
  }

  return (
    <div className="relative w-[280px] flex-shrink-0 snap-start">
      <div className="relative h-[180px] rounded-[20px] overflow-hidden">
        {!imgError ? (
          <Image src={business.imageUrl} alt={business.name} fill className="object-cover" sizes="280px" unoptimized onError={() => setImgError(true)} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {rank !== undefined && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#E00707] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">{rank}</span>
          </div>
        )}
        <SaveButton saved={saved} onToggle={onToggleSave} size={16} className="absolute top-3 right-3" />
      </div>
      <div className="mt-2.5 px-1">
        <h4 className="font-semibold text-gray-900 text-sm truncate">{business.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
