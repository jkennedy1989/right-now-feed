"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CuratedList } from "@/data/lists";
import { SaveButton } from "../shared/SaveButton";
import { EndCard } from "./EndCard";
import { useSavedItems } from "@/hooks/useSavedItems";

interface ListCarouselProps {
  list: CuratedList;
  ranked?: boolean;
}

export function ListCarousel({ list, ranked = false }: ListCarouselProps) {
  const { isSaved, toggle } = useSavedItems();
  const displayBusinesses = ranked ? [...list.businesses].reverse() : list.businesses;
  const count = list.businesses.length;
  const isCelebrity = list.moduleType === "celebrity";
  const isAward = list.moduleType === "award";

  const wrapperClass = isCelebrity
    ? "py-5 bg-gray-100/70"
    : "py-5";

  return (
    <div className={wrapperClass}>
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">{list.title}</h2>
          </div>
          <Link href={`/list/${list.id}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight size={18} className="text-gray-600" />
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2 w-max">
          {displayBusinesses.map((biz, i) => (
            <CompactCard
              key={biz.id}
              business={biz}
              saved={isSaved(biz.id)}
              onToggleSave={() => toggle(biz.id)}
              rank={ranked ? count - i : undefined}
              showDescription={isAward || isCelebrity || list.id === "eats-under-20-new" || list.id === "secret-speakeasies"}
              unclapDescription={isCelebrity}
              showLocation={false}
              showAsSearchPill={list.id === "iconic-toronto-dishes"}
              showPricePill={list.id === "eats-under-20-new"}
              href={`/list/${list.id}?item=${ranked ? count - 1 - i : i}`}
            />
          ))}
          <EndCard listTitle={list.title} />
        </div>
      </div>
    </div>
  );
}

function CompactCard({ business, saved, onToggleSave, rank, showDescription, showLocation, showAsSearchPill, showPricePill, unclapDescription, href }: {
  business: { id: string; name: string; imageUrl: string; videoUrl?: string; description?: string; location?: string; price?: string };
  saved: boolean;
  onToggleSave: () => void;
  rank?: number;
  showDescription?: boolean;
  showLocation?: boolean;
  showAsSearchPill?: boolean;
  showPricePill?: boolean;
  unclapDescription?: boolean;
  href?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const isVideo = !!business.videoUrl;

  if (showAsSearchPill) {
    return (
      <Link href={href || "#"} className="relative w-[240px] flex-shrink-0 snap-start block">
        <div className="relative h-[140px] rounded-[20px] overflow-hidden">
          {!imgError ? (
            <Image src={business.imageUrl} alt={business.name} fill className="object-cover" sizes="240px" unoptimized onError={() => setImgError(true)} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500" />
          )}
          {rank !== undefined && (
            <div className="absolute top-2 left-2 w-9 h-9 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <path d="M15.602 1.14242C17.1571 -0.380739 19.6448 -0.38074 21.1999 1.14242L23.1452 3.04779C23.8826 3.77 24.8705 4.17924 25.9026 4.18995L28.6255 4.21821C30.8021 4.2408 32.5611 5.99981 32.5837 8.17648L32.612 10.8993C32.6227 11.9314 33.0319 12.9194 33.7541 13.6567L35.6595 15.6021C37.1827 17.1572 37.1827 19.6448 35.6595 21.1999L33.7542 23.1453C33.0319 23.8826 32.6227 24.8706 32.612 25.9027L32.5837 28.6255C32.5611 30.8022 30.8021 32.5612 28.6255 32.5838L25.9026 32.6121C24.8705 32.6228 23.8826 33.032 23.1452 33.7542L21.1999 35.6596C19.6448 37.1827 17.1571 37.1827 15.602 35.6596L13.6567 33.7542C12.9193 33.032 11.9313 32.6228 10.8993 32.6121L8.17642 32.5838C5.99975 32.5612 4.24074 30.8022 4.21815 28.6255L4.18989 25.9027C4.17918 24.8706 3.76994 23.8826 3.04773 23.1453L1.14236 21.1999C-0.3808 19.6448 -0.3808 17.1572 1.14236 15.6021L3.04773 13.6567C3.76994 12.9194 4.17918 11.9314 4.18989 10.8993L4.21815 8.17648C4.24074 5.99981 5.99975 4.2408 8.17642 4.21821L10.8993 4.18995C11.9313 4.17924 12.9193 3.77 13.6567 3.04779L15.602 1.14242Z" fill="#D71616"/>
              </svg>
              <span className="relative text-white font-bold text-[12px]">{rank}</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-bold text-gray-800 transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>
            {business.name}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href || "#"} className="relative w-[187px] flex-shrink-0 snap-start block">
      <div className="relative h-[194px] rounded-[20px] overflow-hidden">
        {isVideo ? (
          <video src={business.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : !imgError ? (
          <Image
            src={business.imageUrl}
            alt={business.name}
            fill
            className="object-cover"
            sizes="170px"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {rank !== undefined && (
          <div className="absolute top-2 left-2 w-9 h-9 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
              <path d="M15.602 1.14242C17.1571 -0.380739 19.6448 -0.38074 21.1999 1.14242L23.1452 3.04779C23.8826 3.77 24.8705 4.17924 25.9026 4.18995L28.6255 4.21821C30.8021 4.2408 32.5611 5.99981 32.5837 8.17648L32.612 10.8993C32.6227 11.9314 33.0319 12.9194 33.7541 13.6567L35.6595 15.6021C37.1827 17.1572 37.1827 19.6448 35.6595 21.1999L33.7542 23.1453C33.0319 23.8826 32.6227 24.8706 32.612 25.9027L32.5837 28.6255C32.5611 30.8022 30.8021 32.5612 28.6255 32.5838L25.9026 32.6121C24.8705 32.6228 23.8826 33.032 23.1452 33.7542L21.1999 35.6596C19.6448 37.1827 17.1571 37.1827 15.602 35.6596L13.6567 33.7542C12.9193 33.032 11.9313 32.6228 10.8993 32.6121L8.17642 32.5838C5.99975 32.5612 4.24074 30.8022 4.21815 28.6255L4.18989 25.9027C4.17918 24.8706 3.76994 23.8826 3.04773 23.1453L1.14236 21.1999C-0.3808 19.6448 -0.3808 17.1572 1.14236 15.6021L3.04773 13.6567C3.76994 12.9194 4.17918 11.9314 4.18989 10.8993L4.21815 8.17648C4.24074 5.99981 5.99975 4.2408 8.17642 4.21821L10.8993 4.18995C11.9313 4.17924 12.9193 3.77 13.6567 3.04779L15.602 1.14242Z" fill="#D71616"/>
            </svg>
            <span className="relative text-white font-bold text-[12px]">{rank}</span>
          </div>
        )}
        <SaveButton saved={saved} onToggle={onToggleSave} size={14} className="absolute top-2 right-2" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-[13px] font-bold text-white truncate">{business.name}</p>
          {showLocation && business.location && (
            <p className="text-[10px] text-white/70 mt-0.5 truncate">📍 {business.location}</p>
          )}
        </div>
      </div>
      {showDescription && business.description && (
        <p className={`text-[12px] text-gray-600 mt-1.5 leading-snug ${unclapDescription ? "" : "line-clamp-2"}`}>{business.description}</p>
      )}
      {showPricePill && business.price && (
        <span className="inline-block mt-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-gray-800" style={{ backgroundColor: "#DEF6E7" }}>
          {business.price}
        </span>
      )}
    </Link>
  );
}

const brandColors: Record<string, string> = {
  Yelp: "bg-red-500",
  "Michelin Guide": "bg-red-600",
  "Toronto Life": "bg-blue-500",
  Drake: "bg-purple-500",
};

const userAvatars: Record<string, string> = {
  "Terrene H.": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "Brian S.": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "Catherine B.": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
  "Anna B.": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
};

function AuthorBadge({ author }: { author: string }) {
  const parenMatch = author.match(/\(([^)]+)\)/);
  const attribute = parenMatch ? parenMatch[1] : null;
  const nameOnly = author.replace(/\s*\([^)]+\)/, "").trim();

  const isUser = author.includes("(") || Object.keys(userAvatars).some((k) => author.includes(k));
  const brandColor = brandColors[nameOnly] || brandColors[author];
  const avatarUrl = Object.entries(userAvatars).find(([k]) => nameOnly.includes(k) || author.includes(k))?.[1];

  return (
    <div className="flex items-center gap-1.5 mt-1">
      {isUser && avatarUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
      ) : brandColor ? (
        <div className={`w-4 h-4 rounded-full ${brandColor} flex items-center justify-center`}>
          <span className="text-white text-[8px] font-bold">{nameOnly[0]}</span>
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">{nameOnly[0]}</span>
        </div>
      )}
      <span className="text-[11px] font-semibold text-gray-700">{nameOnly}</span>
      {attribute && (
        <span className="text-[9px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">{attribute}</span>
      )}
    </div>
  );
}
