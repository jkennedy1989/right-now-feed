'use client';

import { useEffect, useRef, useState } from 'react';
import { Business, ContextSignals } from '@/types';

const cache = new Map<string, string>();

export function useBusinessDescription(
  business: Business | null,
  activeFilters: string[],
  signals: ContextSignals
) {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!business) {
      setDescription(null);
      return;
    }

    const cacheKey = `${business.id}_${activeFilters.sort().join(',')}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      setDescription(cached);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setDescription(null);

    fetch('/api/describe-business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business: {
          name: business.name,
          cuisine: business.cuisine,
          category: business.category,
          rating: business.rating,
          neighborhood: business.neighborhood,
          hook: business.hook,
          priceLevel: business.priceLevel,
          attributes: business.attributes,
        },
        activeFilters,
        signals: {
          mealPeriod: signals.mealPeriod,
          isWeekend: signals.isWeekend,
          daylight: signals.daylight,
        },
      }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.description) {
          cache.set(cacheKey, data.description);
          setDescription(data.description);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [business, activeFilters, signals]);

  return { description, isLoading };
}
