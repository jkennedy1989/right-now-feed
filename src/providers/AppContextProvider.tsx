'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { ContentBusiness, ContentModule, CategoryFilter, TORONTO_MODULES, getAllBusinesses } from '@/data/toronto-content';
import { lists, singleItems } from '@/data/lists';
import { weeklyPicks } from '@/data/weekly-picks';

const locationLookup = new Map<string, { lat: number; lng: number }>();
for (const biz of getAllBusinesses()) {
  if (biz.location.lat !== 43.6532 || biz.location.lng !== -79.3832) {
    locationLookup.set(biz.name, biz.location);
  }
}
// Single item locations (resolved via Google Places)
const singleItemLocations: Record<string, { lat: number; lng: number }> = {
  "Prime Seafood Palace": { lat: 43.6449, lng: -79.4167 },
  "Tilt Arcade Bar": { lat: 43.6416, lng: -79.4308 },
  "Lee": { lat: 43.6472, lng: -79.3993 },
  "Art Gallery of Ontario": { lat: 43.6536, lng: -79.3925 },
  "Chica’s Chicken": { lat: 43.6653, lng: -79.4643 },
  "Tiflisi": { lat: 43.6698, lng: -79.3016 },
  "Quetzal": { lat: 43.6563, lng: -79.4068 },
  "Prehistoria Museum & SkullStore": { lat: 43.6571, lng: -79.3811 },
  "Pizzeria Badialdi": { lat: 43.6461, lng: -79.4233 },
  "Piggy's Island": { lat: 43.8055, lng: -79.4203 },
  "Aloette": { lat: 43.6485, lng: -79.3960 },
  "Takja BBQ House": { lat: 43.6535, lng: -79.4273 },
};
for (const [name, loc] of Object.entries(singleItemLocations)) {
  locationLookup.set(name, loc);
}

interface AppContextValue {
  selectedBusiness: ContentBusiness | null;
  activeModule: ContentModule | null;
  activeBusinessIndex: number;
  feedState: 'collapsed' | 'half' | 'full';
  activeCategory: CategoryFilter;
  activeSubFilter: string | null;
  setSelectedBusiness: (biz: ContentBusiness | null) => void;
  setActiveModule: (mod: ContentModule | null) => void;
  setActiveBusinessIndex: (index: number) => void;
  setFeedState: (state: 'collapsed' | 'half' | 'full') => void;
  setActiveCategory: (cat: CategoryFilter) => void;
  setActiveSubFilter: (filter: string | null) => void;
  selectBusinessByName: (name: string) => void;
  openWeeklyPicks: () => void;
  restoreFeedState: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedBusiness, setSelectedBusiness] = useState<ContentBusiness | null>(null);
  const [activeModule, setActiveModule] = useState<ContentModule | null>(null);
  const [activeBusinessIndex, setActiveBusinessIndex] = useState(0);
  const [feedState, setFeedState] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const previousFeedState = useRef<'collapsed' | 'half' | 'full'>('collapsed');
  const [activeCategory, setActiveCategoryRaw] = useState<CategoryFilter>('all');
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);

  const setActiveCategory = useCallback((cat: CategoryFilter) => {
    setActiveCategoryRaw(cat);
    setActiveSubFilter(null);
  }, []);

  const selectBusinessByName = useCallback((name: string) => {
    previousFeedState.current = feedState;
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
            location: locationLookup.get(b.name) || { lat: b.lat || 43.6532, lng: b.lng || -79.3832 },
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
    // Try weekly picks
    const wpIdx = weeklyPicks.findIndex((b) => b.name === name);
    if (wpIdx >= 0) {
      const converted: ContentModule = {
        id: 'weekly-top-10',
        type: 'ranked-list',
        title: 'Your Top 10 Weekly Picks',
        description: '',
        author: 'Yelp',
        emoji: '🥇',
        businesses: weeklyPicks.map((b) => ({
          name: b.name,
          rating: b.rating || 0,
          description: b.description || '',
          imageUrl: b.imageUrl,
          googleMapsUrl: '',
          location: locationLookup.get(b.name) || { lat: 43.6532, lng: -79.3832 },
        })),
      };
      setActiveModule(converted);
      setActiveBusinessIndex(wpIdx);
      setSelectedBusiness(converted.businesses[wpIdx]);
      setFeedState('collapsed');
      return;
    }
    // Try single items (standalone businesses)
    const singleItem = singleItems.find((s) => s.name === name);
    if (singleItem) {
      const biz: ContentBusiness = {
        name: singleItem.name,
        rating: singleItem.rating || 0,
        description: singleItem.description || '',
        imageUrl: singleItem.mediaUrls[0] || '',
        googleMapsUrl: singleItem.location || '',
        location: locationLookup.get(singleItem.name) || { lat: 43.6532, lng: -79.3832 },
      };
      setActiveModule(null);
      setActiveBusinessIndex(0);
      setSelectedBusiness(biz);
      setFeedState('collapsed');
      return;
    }
  }, [feedState]);

  const openWeeklyPicks = useCallback(() => {
    previousFeedState.current = feedState;
    const converted: ContentModule = {
      id: 'weekly-top-10',
      type: 'ranked-list',
      title: 'Your Top 10 Weekly Picks',
      description: '',
      author: 'Yelp',
      emoji: '🥇',
      businesses: weeklyPicks.map((b) => ({
        name: b.name,
        rating: b.rating || 0,
        description: b.description || '',
        imageUrl: b.imageUrl,
        googleMapsUrl: '',
        location: locationLookup.get(b.name) || { lat: 43.6532, lng: -79.3832 },
      })),
    };
    setActiveModule(converted);
    setActiveBusinessIndex(0);
    setSelectedBusiness(converted.businesses[0]);
    setFeedState('collapsed');
  }, [feedState]);

  const restoreFeedState = useCallback(() => {
    setFeedState(previousFeedState.current);
  }, []);

  const value: AppContextValue = {
    selectedBusiness,
    activeModule,
    activeBusinessIndex,
    feedState,
    activeCategory,
    activeSubFilter,
    setSelectedBusiness,
    setActiveModule,
    setActiveBusinessIndex,
    setFeedState,
    setActiveCategory,
    setActiveSubFilter,
    selectBusinessByName,
    openWeeklyPicks,
    restoreFeedState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
