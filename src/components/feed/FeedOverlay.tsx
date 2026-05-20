'use client';

import { useRef, useState, useCallback } from 'react';

interface FeedOverlayProps {
  children: React.ReactNode;
}

export function FeedOverlay({ children }: FeedOverlayProps) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startScroll = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    startScroll.current = scrollRef.current?.scrollTop || 0;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - startY.current;
    const scrollTop = scrollRef.current?.scrollTop || 0;

    if (!expanded && deltaY < -40) {
      setExpanded(true);
    } else if (expanded && scrollTop <= 0 && deltaY > 40) {
      setExpanded(false);
    }
  }, [expanded]);

  const handleDragClick = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`absolute left-0 right-0 bottom-0 z-20 flex flex-col bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-[top] duration-300 ease-out ${
        expanded ? 'top-[10%]' : 'top-[75%]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={handleDragClick}
        className="flex-shrink-0 flex items-center justify-center py-3 cursor-grab active:cursor-grabbing"
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </button>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        {children}
      </div>
    </div>
  );
}
