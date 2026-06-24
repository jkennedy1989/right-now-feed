"use client";

import { useState } from "react";
import Image from "next/image";
import { Business } from "@/data/lists";
import { SaveButton } from "../shared/SaveButton";
import { useSavedItems } from "@/hooks/useSavedItems";

const eyebrowReasons = [
  "Popular in your area",
  "Trending this week",
  "Friends loved this",
  "Editor's pick",
  "Because you saved similar spots",
  "New on the scene",
];

interface SingleRecommendationProps {
  business: Business;
  reason?: string;
}

export function SingleRecommendation({ business, reason }: SingleRecommendationProps) {
  const { isSaved, toggle } = useSavedItems();
  const [imgError, setImgError] = useState(false);
  const displayReason = reason || eyebrowReasons[Math.floor(Math.random() * eyebrowReasons.length)];

  return (
    <div className="px-4 py-4">
      <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm">
        <div className="relative h-[200px]">
          {!imgError ? (
            <Image
              src={business.imageUrl}
              alt={business.name}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <SaveButton
            saved={isSaved(business.id)}
            onToggle={() => toggle(business.id)}
            size={16}
            className="absolute top-3 right-3"
          />
        </div>
        <div className="p-4">
          <p className="text-[10px] font-medium text-[#E00707] uppercase tracking-wide">{displayReason}</p>
          <h3 className="text-base font-bold text-gray-900 mt-1">{business.name}</h3>
          <p className="text-sm text-gray-600 mt-1 leading-snug">{business.description}</p>
        </div>
      </div>
    </div>
  );
}
