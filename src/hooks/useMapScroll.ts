'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';

const MAX_HEIGHT = 40;
const MIN_HEIGHT = 20;
const SCROLL_THRESHOLD = 150;

export function useMapScroll(containerRef: RefObject<HTMLElement | null>) {
  const [mapHeight, setMapHeight] = useState(MAX_HEIGHT);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const progress = Math.min(scrollTop / SCROLL_THRESHOLD, 1);
    const height = MAX_HEIGHT - progress * (MAX_HEIGHT - MIN_HEIGHT);

    requestAnimationFrame(() => setMapHeight(height));
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef, handleScroll]);

  return { mapHeight, isCollapsed: mapHeight <= MIN_HEIGHT + 2 };
}
