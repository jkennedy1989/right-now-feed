'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { ContentBusiness, ContentModule, TORONTO_MODULES } from '@/data/toronto-content';

interface AppContextValue {
  selectedBusiness: ContentBusiness | null;
  activeModule: ContentModule | null;
  activeBusinessIndex: number;
  feedExpanded: boolean;
  setSelectedBusiness: (biz: ContentBusiness | null) => void;
  setActiveModule: (mod: ContentModule | null) => void;
  setActiveBusinessIndex: (index: number) => void;
  setFeedExpanded: (expanded: boolean | ((prev: boolean) => boolean)) => void;
  selectBusinessByName: (name: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedBusiness, setSelectedBusiness] = useState<ContentBusiness | null>(null);
  const [activeModule, setActiveModule] = useState<ContentModule | null>(null);
  const [activeBusinessIndex, setActiveBusinessIndex] = useState(0);
  const [feedExpanded, setFeedExpanded] = useState(true);

  const selectBusinessByName = useCallback((name: string) => {
    for (const mod of TORONTO_MODULES) {
      const idx = mod.businesses.findIndex((b) => b.name === name);
      if (idx >= 0) {
        setActiveModule(mod);
        setActiveBusinessIndex(idx);
        setSelectedBusiness(mod.businesses[idx]);
        setFeedExpanded(false);
        return;
      }
    }
    // Business not in any list — just select it solo
    const allBiz = TORONTO_MODULES.flatMap((m) => m.businesses);
    const biz = allBiz.find((b) => b.name === name);
    if (biz) {
      setSelectedBusiness(biz);
      setActiveModule(null);
      setActiveBusinessIndex(0);
      setFeedExpanded(false);
    }
  }, []);

  const value: AppContextValue = {
    selectedBusiness,
    activeModule,
    activeBusinessIndex,
    feedExpanded,
    setSelectedBusiness,
    setActiveModule,
    setActiveBusinessIndex,
    setFeedExpanded,
    selectBusinessByName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
