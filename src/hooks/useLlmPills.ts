'use client';

import { useEffect, useRef } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';

export function useLlmPills() {
  const {
    signals,
    activePrimaryIds,
    primaryFilters,
    setLlmPrimaryPills,
    setLlmSecondaryPills,
  } = useAppContext();

  const hasFetchedPrimary = useRef(false);
  const secondaryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch LLM primary pills on initial load
  useEffect(() => {
    if (hasFetchedPrimary.current) return;
    hasFetchedPrimary.current = true;

    const existingIds = primaryFilters.map((p) => p.id);

    fetch('/api/generate-pills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signals: {
          mealPeriod: signals.mealPeriod,
          isWeekend: signals.isWeekend,
          weather: signals.weather,
          daylight: signals.daylight,
          timestamp: signals.timestamp,
        },
        existingPrimaryIds: existingIds,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.primaryPills?.length > 0) {
          setLlmPrimaryPills(data.primaryPills);
        }
      })
      .catch(() => {});
  }, [signals, primaryFilters, setLlmPrimaryPills]);

  // Fetch LLM secondary pills when primary selection changes (debounced)
  useEffect(() => {
    if (activePrimaryIds.length === 0) {
      setLlmSecondaryPills([]);
      return;
    }

    if (secondaryTimer.current) clearTimeout(secondaryTimer.current);
    secondaryTimer.current = setTimeout(() => {
      const activeLabels = primaryFilters
        .filter((p) => activePrimaryIds.includes(p.id))
        .map((p) => p.label);

      fetch('/api/generate-pills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signals: {
            mealPeriod: signals.mealPeriod,
            isWeekend: signals.isWeekend,
            weather: signals.weather,
            daylight: signals.daylight,
            timestamp: signals.timestamp,
          },
          activePrimaryIds: activeLabels,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secondaryPills?.length > 0) {
            setLlmSecondaryPills(data.secondaryPills);
          }
        })
        .catch(() => {});
    }, 400);

    return () => {
      if (secondaryTimer.current) clearTimeout(secondaryTimer.current);
    };
  }, [activePrimaryIds, primaryFilters, signals, setLlmSecondaryPills]);
}
