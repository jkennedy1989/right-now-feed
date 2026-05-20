import { Business } from '@/types';

interface CacheEntry {
  results: Business[];
  fetchedAt: number;
}

const TTL = 5 * 60 * 1000; // 5 minutes
const MAX_ENTRIES = 200;

const cache = new Map<string, CacheEntry>();

function quantizeKey(lat: number, lng: number, radius: number, type?: string, keyword?: string): string {
  const qLat = lat.toFixed(3);
  const qLng = lng.toFixed(3);
  return `${qLat}_${qLng}_${radius}_${type || ''}_${keyword || ''}`;
}

function evictIfNeeded() {
  if (cache.size <= MAX_ENTRIES) return;
  let oldestKey: string | null = null;
  let oldestTime = Infinity;
  for (const [key, entry] of cache) {
    if (entry.fetchedAt < oldestTime) {
      oldestTime = entry.fetchedAt;
      oldestKey = key;
    }
  }
  if (oldestKey) cache.delete(oldestKey);
}

export function getCached(lat: number, lng: number, radius: number, type?: string, keyword?: string): Business[] | null {
  const key = quantizeKey(lat, lng, radius, type, keyword);
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.results;
}

export function setCache(lat: number, lng: number, radius: number, results: Business[], type?: string, keyword?: string): void {
  const key = quantizeKey(lat, lng, radius, type, keyword);
  cache.set(key, { results, fetchedAt: Date.now() });
  evictIfNeeded();
}
