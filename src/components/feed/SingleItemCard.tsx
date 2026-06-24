"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SingleItem } from "@/data/lists";
import { SaveButton } from "../shared/SaveButton";
import { RatingPill } from "../shared/RatingPill";
import { useSavedItems } from "@/hooks/useSavedItems";

const bubbleTypes = ["/bubbles/added.png", "/bubbles/bookmarked.png", "/bubbles/reviewed.png", "/bubbles/saved.png"];

function formatActivity(text: string): React.ReactNode {
  const boldPhrases = ["Top 10 Pizzas", "Top 100", "Top 10", "5 Stars", "4-star", "Been Here", "Wishlist"];
  const nameMatch = text.match(/^([A-Z][a-z]+(?:\s[A-Z]\.?\(?[A-Za-z]*\)?\.?)?)/);
  const name = nameMatch ? nameMatch[1] : "";
  const rest = name ? text.slice(name.length) : text;

  const parts: React.ReactNode[] = [];
  if (name) parts.push(<span key="name" className="font-bold">{name}</span>);

  let restProcessed = false;
  for (const phrase of boldPhrases) {
    if (rest.includes(phrase)) {
      const idx = rest.indexOf(phrase);
      parts.push(<span key={`pre-${phrase}`}>{rest.slice(0, idx)}</span>);
      parts.push(<span key={`bold-${phrase}`} className="font-bold underline">{phrase}</span>);
      parts.push(<span key={`post-${phrase}`}>{rest.slice(idx + phrase.length)}</span>);
      restProcessed = true;
      break;
    }
  }
  if (!restProcessed) parts.push(<span key="rest">{rest}</span>);

  return <>{parts}</>;
}

interface SingleItemCardProps {
  item: SingleItem;
}

function isVideo(url: string) {
  return url.includes(".mp4") || url.includes("mux.com");
}

const userAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
];

function getAvatarForItem(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = ((hash << 5) - hash) + id.charCodeAt(i);
  return userAvatars[Math.abs(hash) % userAvatars.length];
}

export function SingleItemCard({ item }: SingleItemCardProps) {
  const { isSaved, toggle } = useSavedItems();
  const [currentMedia, setCurrentMedia] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const avatar = getAvatarForItem(item.id);

  const advanceMedia = useCallback(() => {
    setCurrentMedia((prev) => (prev + 1) % item.mediaUrls.length);
  }, [item.mediaUrls.length]);

  const mediaUrl = item.mediaUrls[currentMedia];
  const currentIsVideo = isVideo(mediaUrl);

  const showBubble = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < item.id.length; i++) hash = ((hash << 5) - hash) + item.id.charCodeAt(i);
    return Math.abs(hash) % 2 === 0;
  }, [item.id]);

  const bubbleSrc = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < item.id.length; i++) hash = ((hash << 3) - hash) + item.id.charCodeAt(i);
    return bubbleTypes[Math.abs(hash) % bubbleTypes.length];
  }, [item.id]);

  // For images: advance after 4 seconds
  useEffect(() => {
    if (item.mediaUrls.length <= 1) return;
    if (currentIsVideo) return; // videos handle their own advancement via onEnded

    timerRef.current = setTimeout(() => {
      advanceMedia();
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentMedia, currentIsVideo, advanceMedia, item.mediaUrls.length]);

  const handleVideoEnded = () => {
    if (item.mediaUrls.length > 1) {
      advanceMedia();
    }
  };

  return (
    <div className="px-4 py-5">
      <div className="flex items-center gap-2 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt="" className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0" />
        <p className="text-sm text-gray-900">{formatActivity(item.authorActivity)}</p>
      </div>
      <div className="relative aspect-square rounded-[20px] overflow-hidden">
        {currentIsVideo ? (
          <video
            key={mediaUrl}
            src={mediaUrl}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={mediaUrl}
            src={mediaUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <SaveButton
          saved={isSaved(item.id)}
          onToggle={() => toggle(item.id)}
          size={16}
          className="absolute top-3 right-3"
        />

        {showBubble && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={bubbleSrc}
            alt=""
            className="absolute bottom-[110px] left-3 h-auto z-20 animate-bubble-float"
            style={{ width: "36px" }}
          />
        )}

        {item.mediaUrls.length > 1 && (
          <div className="absolute top-3 left-3 flex gap-1">
            {item.mediaUrls.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === currentMedia ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {item.rating && <div className="mb-1.5"><RatingPill rating={item.rating} /></div>}
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <p className="text-white/90 text-sm mt-1 leading-snug">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
