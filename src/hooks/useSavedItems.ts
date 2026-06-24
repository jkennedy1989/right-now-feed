"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "inspiration-feed-saved";

export function useSavedItems() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedIds(new Set(JSON.parse(stored)));
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  return { savedIds, toggle, isSaved };
}
