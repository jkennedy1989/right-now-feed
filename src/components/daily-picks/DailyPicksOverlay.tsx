"use client";

import { useState, useRef, useCallback } from "react";
import { X, Bookmark } from "lucide-react";
import { weeklyPicks, WeeklyPick } from "@/data/weekly-picks";
import { RatingPill } from "../shared/RatingPill";
import { useSavedItems } from "@/hooks/useSavedItems";

interface DailyPicksOverlayProps {
  onClose: () => void;
}

function haptic(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

export function DailyPicksOverlay({ onClose }: DailyPicksOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flyOff, setFlyOff] = useState<"left" | "right" | null>(null);
  const { isSaved, toggle } = useSavedItems();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const isDragging = useRef(false);

  const totalPicks = weeklyPicks.length;
  const rank = totalPicks - currentIndex;

  const nextCard = useCallback(() => {
    haptic(10);
    setCurrentIndex((prev) => (prev + 1) % totalPicks);
    setFlyOff(null);
    setDragX(0);
  }, [totalPicks]);

  const handleMeh = () => {
    haptic(10);
    setFlyOff("left");
    setTimeout(nextCard, 350);
  };

  const handleSave = () => {
    haptic([20, 50, 30]);
    const pick = weeklyPicks[currentIndex];
    if (!isSaved(pick.id)) toggle(pick.id);
    setFlyOff("right");
    setTimeout(nextCard, 350);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current || !isDragging.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    setDragX(dx);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragX < -80) {
      haptic(10);
      setCurrentIndex((prev) => (prev + 1) % totalPicks);
    } else if (dragX > 80) {
      haptic(10);
      setCurrentIndex((prev) => (prev - 1 + totalPicks) % totalPicks);
    }
    setDragX(0);
    touchStart.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStart.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    const handleMouseMove = (ev: MouseEvent) => {
      if (!touchStart.current) return;
      setDragX(ev.clientX - touchStart.current.x);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      if (dragX < -80) {
        haptic(10);
        setCurrentIndex((prev) => (prev + 1) % totalPicks);
      } else if (dragX > 80) {
        haptic(10);
        setCurrentIndex((prev) => (prev - 1 + totalPicks) % totalPicks);
      }
      setDragX(0);
      touchStart.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getCardTransform = (position: number): React.CSSProperties => {
    if (position === 0) {
      const rot = dragX * 0.05;
      const tx = flyOff === "left" ? -500 : flyOff === "right" ? 500 : dragX;
      const flyRot = flyOff === "left" ? -20 : flyOff === "right" ? 20 : rot;
      return {
        transform: `translateX(${tx}px) rotate(${flyRot}deg) scale(1)`,
        opacity: flyOff ? 0 : 1,
        zIndex: 30,
        transition: flyOff || !isDragging.current ? "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease" : "none",
      };
    }
    if (position === 1) {
      return {
        transform: "translateY(12px) scale(0.95)",
        opacity: 0.85,
        zIndex: 20,
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
      };
    }
    if (position === 2) {
      return {
        transform: "translateY(24px) scale(0.90)",
        opacity: 0.6,
        zIndex: 10,
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
      };
    }
    return {
      transform: "translateY(36px) scale(0.85)",
      opacity: 0,
      zIndex: 0,
      transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
      pointerEvents: "none" as const,
    };
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 overflow-hidden flex flex-col select-none md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[381px] md:h-[840px] md:max-h-[calc(90vh-12px)] md:rounded-[2.5rem]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 z-40">
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 text-white">
          <X size={20} />
        </button>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative flex items-center justify-center px-6">
        {weeklyPicks.map((pick, idx) => {
          const position = (idx - currentIndex + totalPicks) % totalPicks;
          if (position > 3) return null;

          return (
            <div
              key={pick.id}
              ref={position === 0 ? cardRef : undefined}
              className="absolute w-[calc(100%-48px)] max-w-[320px] h-[430px] rounded-[20px] overflow-hidden shadow-2xl"
              style={getCardTransform(position)}
              onTouchStart={position === 0 ? handleTouchStart : undefined}
              onTouchMove={position === 0 ? handleTouchMove : undefined}
              onTouchEnd={position === 0 ? handleTouchEnd : undefined}
              onMouseDown={position === 0 ? handleMouseDown : undefined}
            >
              <CardContent pick={pick} idx={idx} totalPicks={totalPicks} saved={isSaved(pick.id)} />
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-8 pt-4 flex items-center justify-center gap-4 z-40">
        <button
          onClick={handleMeh}
          className="flex-1 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm text-center hover:bg-white/20 active:scale-95 transition-all"
        >
          👎 Not for me
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm text-center flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all"
        >
          Save this
          <Bookmark size={16} />
        </button>
      </div>
    </div>
  );
}

const bubbleTypes = ["/bubbles/added.png", "/bubbles/bookmarked.png", "/bubbles/reviewed.png", "/bubbles/saved.png"];
const bubbleIndices = new Set([1, 4, 7]);

function CardContent({ pick, idx, totalPicks, saved }: { pick: WeeklyPick; idx: number; totalPicks: number; saved: boolean }) {
  const showBubble = bubbleIndices.has(idx);
  const bubbleSrc = bubbleTypes[idx % bubbleTypes.length];

  return (
    <>
      {pick.videoUrl ? (
        <video
          src={pick.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={pick.imageUrl} alt={pick.name} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
          <path d="M15.602 1.14242C17.1571 -0.380739 19.6448 -0.38074 21.1999 1.14242L23.1452 3.04779C23.8826 3.77 24.8705 4.17924 25.9026 4.18995L28.6255 4.21821C30.8021 4.2408 32.5611 5.99981 32.5837 8.17648L32.612 10.8993C32.6227 11.9314 33.0319 12.9194 33.7541 13.6567L35.6595 15.6021C37.1827 17.1572 37.1827 19.6448 35.6595 21.1999L33.7542 23.1453C33.0319 23.8826 32.6227 24.8706 32.612 25.9027L32.5837 28.6255C32.5611 30.8022 30.8021 32.5612 28.6255 32.5838L25.9026 32.6121C24.8705 32.6228 23.8826 33.032 23.1452 33.7542L21.1999 35.6596C19.6448 37.1827 17.1571 37.1827 15.602 35.6596L13.6567 33.7542C12.9193 33.032 11.9313 32.6228 10.8993 32.6121L8.17642 32.5838C5.99975 32.5612 4.24074 30.8022 4.21815 28.6255L4.18989 25.9027C4.17918 24.8706 3.76994 23.8826 3.04773 23.1453L1.14236 21.1999C-0.3808 19.6448 -0.3808 17.1572 1.14236 15.6021L3.04773 13.6567C3.76994 12.9194 4.17918 11.9314 4.18989 10.8993L4.21815 8.17648C4.24074 5.99981 5.99975 4.2408 8.17642 4.21821L10.8993 4.18995C11.9313 4.17924 12.9193 3.77 13.6567 3.04779L15.602 1.14242Z" fill="#D71616"/>
        </svg>
        <span className="relative text-white font-bold text-[11px]">{totalPicks - idx}</span>
      </div>
      {showBubble && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={bubbleSrc} alt="" className="absolute bottom-[140px] left-5 z-20 animate-bubble-float" style={{ width: "36px", height: "auto" }} />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {pick.rating && <div className="mb-1.5"><RatingPill rating={pick.rating} /></div>}
        <h3 className="text-lg font-bold text-white">{pick.name}</h3>
        <p className="text-white/70 text-xs mt-1 leading-snug">{pick.description}</p>
        {pick.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {pick.tags.map((tag) => (
              <span key={tag} className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
