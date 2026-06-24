'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { ContentBusiness, ContentModule, CategoryFilter, TORONTO_MODULES } from '@/data/toronto-content';
import { lists } from '@/data/lists';

interface AppContextValue {
  selectedBusiness: ContentBusiness | null;
  activeModule: ContentModule | null;
  activeBusinessIndex: number;
  feedState: 'collapsed' | 'half' | 'full';
  activeCategory: CategoryFilter;
  setSelectedBusiness: (biz: ContentBusiness | null) => void;
  setActiveModule: (mod: ContentModule | null) => void;
  setActiveBusinessIndex: (index: number) => void;
  setFeedState: (state: 'collapsed' | 'half' | 'full') => void;
  setActiveCategory: (cat: CategoryFilter) => void;
  selectBusinessByName: (name: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedBusiness, setSelectedBusiness] = useState<ContentBusiness | null>(null);
  const [activeModule, setActiveModule] = useState<ContentModule | null>(null);
  const [activeBusinessIndex, setActiveBusinessIndex] = useState(0);
  const [feedState, setFeedState] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const selectBusinessByName = useCallback((name: string) => {
    // First try toronto-content modules
    for (const mod of TORONTO_MODULES) {
      const idx = mod.businesses.findIndex((b) => b.name === name);
      if (idx >= 0) {
        setActiveModule(mod);
        setActiveBusinessIndex(idx);
        setSelectedBusiness(mod.businesses[idx]);
        setFeedState('collapsed');
        return;
      }
    }
    // Try feed lists data and convert to ContentModule format
    for (const list of lists) {
      const idx = list.businesses.findIndex((b) => b.name === name);
      if (idx >= 0) {
        const converted: ContentModule = {
          id: list.id,
          type: 'list',
          title: list.title,
          description: list.description || '',
          author: list.author || '',
          emoji: '',
          businesses: list.businesses.map((b) => ({
            name: b.name,
            rating: b.rating || 0,
            description: b.description || '',
            imageUrl: b.imageUrl,
            googleMapsUrl: '',
            location: { lat: b.lat || 43.6532, lng: b.lng || -79.3832 },
            friendActivity: b.friendActivity,
          })),
        };
        setActiveModule(converted);
        setActiveBusinessIndex(idx);
        setSelectedBusiness(converted.businesses[idx]);
        setFeedState('collapsed');
        return;
      }
    }
  }, []);

  const value: AppContextValue = {
    selectedBusiness,
    activeModule,
    activeBusinessIndex,
    feedState,
    activeCategory,
    setSelectedBusiness,
    setActiveModule,
    setActiveBusinessIndex,
    setFeedState,
    setActiveCategory,
    selectBusinessByName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
