'use client';

import { useMemo } from 'react';
import { useAppContext } from '@/providers/AppContextProvider';
import { ScrollRow } from '@/components/cards/ScrollRow';
import { BusinessCard } from '@/components/cards/BusinessCard';
import { MEAL_PERIOD_LABELS } from '@/lib/constants';
import { Business, MealPeriod } from '@/types';

const MEAL_CATEGORY_ALLOWLIST: Record<string, string[]> = {
  'early-morning': [
    'breakfast spot', 'breakfast spot / bakery', 'breakfast & lunch spot',
    'breakfast & lunch', 'breakfast & brunch', 'deli / bakery', 'cafe',
  ],
  breakfast: [
    'breakfast spot', 'breakfast spot / bakery', 'breakfast & lunch spot',
    'breakfast & lunch', 'breakfast & brunch', 'deli / bakery', 'cafe',
    'diner', 'casual / diner', 'diner & brunch', 'diner / casual',
  ],
  brunch: [
    'breakfast spot', 'breakfast spot / bakery', 'breakfast & lunch spot',
    'breakfast & lunch', 'breakfast & brunch', 'diner & brunch',
    'diner', 'casual / diner', 'diner / casual', 'gastropub', 'bistro / bar',
  ],
  lunch: [
    'deli', 'deli / bakery', 'deli / lunch', 'deli / casual counter',
    'deli / sandwich shop', 'classic deli', 'taco stand', 'taco stand / diner',
    'taco counter', 'taqueria counter', 'diner', 'casual / diner',
    'diner / casual', 'diner / counter', 'casual / counter', 'classic counter',
    'smashburger stand', 'casual slice shop', 'sushi counter',
  ],
  afternoon: [
    'deli / bakery', 'cafe', 'breakfast spot / bakery',
  ],
  dinner: [
    'fine dining', 'fine dining destination', 'trendy dining', 'trendy dining / bar',
    'trendy fine dining', 'luxe dining', 'luxe bar & dining', 'gastropub',
    'casual fine', 'fine casual', 'trendy hotspot', 'fusion bistro',
    'tasting menu counter', 'museum dining', 'market dining / casual',
  ],
  'late-night': [
    'bar / lounge', 'bar / nightlife', 'bar & grill', 'bar & restaurant',
    'bar & diner', 'bar / bistro', 'bar / gastropub', 'gastropub',
    'gastropub / wine bar', 'trendy casual / bar', 'trendy restaurant & bar',
    'trendy lounge', 'trendy wine bar', 'wine bar / diner',
    'taco stand', 'taco stand / diner', 'taco counter', 'taqueria counter',
    'diner', 'smoke-driven diner',
  ],
};

const MEAL_HOOK_PREFIXES: Record<string, string[]> = {
  'early-morning': ['Early morning pick-me-up', 'Start your day with', 'Morning ritual'],
  breakfast: ['Great for breakfast', 'Breakfast highlight', 'Morning must-try'],
  brunch: ['Perfect for brunch', 'Brunch standout', 'Weekend brunch pick'],
  lunch: ['Ideal for lunch', 'Quick lunch spot', 'Lunch go-to'],
  afternoon: ['Afternoon treat', 'Perfect pick-me-up', 'Afternoon escape'],
  dinner: ['Reserve for dinner', 'Dinner destination', 'Tonight\'s move'],
  'late-night': ['Open late', 'Late-night spot', 'After-hours pick'],
};

function getMealContextHook(business: Business, mealPeriod: MealPeriod): string {
  const hook = business.hook || '';
  const prefixes = MEAL_HOOK_PREFIXES[mealPeriod] || MEAL_HOOK_PREFIXES.dinner;
  const prefix = prefixes[Math.abs(business.name.charCodeAt(0)) % prefixes.length];

  const hookLower = hook.toLowerCase();
  const hasMealKeyword =
    (mealPeriod === 'breakfast' || mealPeriod === 'early-morning' || mealPeriod === 'brunch') &&
    (hookLower.includes('egg') || hookLower.includes('toast') || hookLower.includes('pancake') ||
     hookLower.includes('waffle') || hookLower.includes('croissant') || hookLower.includes('latte') ||
     hookLower.includes('brunch') || hookLower.includes('morning') || hookLower.includes('breakfast'));

  const hasLunchKeyword = mealPeriod === 'lunch' &&
    (hookLower.includes('sandwich') || hookLower.includes('burger') || hookLower.includes('taco') ||
     hookLower.includes('bowl') || hookLower.includes('salad') || hookLower.includes('quick'));

  const hasDinnerKeyword = mealPeriod === 'dinner' &&
    (hookLower.includes('tasting') || hookLower.includes('reserve') || hookLower.includes('course') ||
     hookLower.includes('dinner') || hookLower.includes('wine'));

  const hasLateNightKeyword = mealPeriod === 'late-night' &&
    (hookLower.includes('cocktail') || hookLower.includes('bar') || hookLower.includes('night') ||
     hookLower.includes('martini') || hookLower.includes('drink'));

  if (hasMealKeyword || hasLunchKeyword || hasDinnerKeyword || hasLateNightKeyword) {
    return hook;
  }

  if (hook && hook.length > 5) {
    const snippet = hook.length > 35 ? hook.slice(0, 35).trim() + '…' : hook;
    return `${prefix} — ${snippet}`;
  }

  return `${prefix} · ${business.cuisine}`;
}

export function MealTimeRow() {
  const { signals, places } = useAppContext();

  const mealInfo = MEAL_PERIOD_LABELS[signals.mealPeriod];
  const allowlist = MEAL_CATEGORY_ALLOWLIST[signals.mealPeriod] || [];

  const relevantPlaces = useMemo(() => {
    return places
      .filter((p) => {
        const catLower = p.category.toLowerCase();
        return allowlist.some((allowed) => catLower === allowed || catLower.includes(allowed));
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
  }, [places, allowlist]);

  if (relevantPlaces.length === 0) return null;

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">
          {mealInfo.title} {mealInfo.emoji}
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">Curated for this time of day</p>
      </div>
      <ScrollRow>
        {relevantPlaces.map((place) => (
          <BusinessCard
            key={place.id}
            business={place}
            variant="compact"
            hookOverride={getMealContextHook(place, signals.mealPeriod)}
          />
        ))}
      </ScrollRow>
    </section>
  );
}
