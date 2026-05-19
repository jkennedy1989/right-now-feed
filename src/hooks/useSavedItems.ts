'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'rightnow-saved-items';

export interface SavedItem {
  id: string;
  type: 'business' | 'event' | 'deal' | 'dish';
  name: string;
  imageUrl: string;
  savedAt: string;
  metadata: Record<string, unknown>;
}

function loadFromStorage(): SavedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useSavedItems() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    setSavedItems(loadFromStorage());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const saveItem = useCallback((item: Omit<SavedItem, 'savedAt'>) => {
    setSavedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, { ...item, savedAt: new Date().toISOString() }];
    });
  }, []);

  const unsaveItem = useCallback((id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isSaved = useCallback(
    (id: string) => savedItems.some((i) => i.id === id),
    [savedItems]
  );

  const clearAll = useCallback(() => {
    setSavedItems([]);
  }, []);

  return { savedItems, saveItem, unsaveItem, isSaved, clearAll };
}
