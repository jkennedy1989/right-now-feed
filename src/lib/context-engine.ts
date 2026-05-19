import { ContextSignals, Daylight, FilterPill, MealPeriod, WeatherData } from '@/types';
import { getFilterColor } from './filter-color-map';

export function getMealPeriod(hour: number, isWeekend: boolean): MealPeriod {
  if (hour >= 5 && hour < 7) return 'early-morning';
  if (hour >= 7 && hour < 10) return isWeekend ? 'brunch' : 'breakfast';
  if (hour >= 10 && hour < 11) return isWeekend ? 'brunch' : 'breakfast';
  if (hour >= 11 && hour < 14) return isWeekend ? 'brunch' : 'lunch';
  if (hour >= 14 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'dinner';
  if (hour >= 21 || hour < 5) return 'late-night';
  return 'lunch';
}

export function getDaylightStatus(
  now: Date,
  sunriseTs: number,
  sunsetTs: number
): Daylight {
  const currentTs = Math.floor(now.getTime() / 1000);
  const goldenHourStart = sunsetTs - 3600;

  if (currentTs < sunriseTs || currentTs > sunsetTs + 1800) return 'night';
  if (currentTs >= goldenHourStart && currentTs <= sunsetTs) return 'golden-hour';
  return 'day';
}

export function buildContextSignals(
  location: { lat: number; lng: number } | null,
  weather: WeatherData | null
): ContextSignals {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  let daylight: Daylight = 'day';
  if (weather) {
    daylight = getDaylightStatus(now, weather.sunrise, weather.sunset);
  } else {
    if (hour < 6 || hour > 20) daylight = 'night';
    else if (hour >= 18) daylight = 'golden-hour';
  }

  return {
    location,
    timestamp: now,
    mealPeriod: getMealPeriod(hour, isWeekend),
    isWeekend,
    weather,
    daylight,
  };
}

export function getStaticFallbackFilters(signals: ContextSignals): FilterPill[] {
  const pills: FilterPill[] = [];
  let priority = 0;

  pills.push({
    id: 'open-now',
    label: 'Open now',
    emoji: '✅',
    category: 'open-now',
    searchParams: { openNow: true },
    priority: priority++,
    color: getFilterColor('open-now'),
  });

  switch (signals.mealPeriod) {
    case 'breakfast':
    case 'early-morning':
      pills.push({
        id: 'breakfast',
        label: 'Breakfast',
        emoji: '🥞',
        category: 'breakfast',
        searchParams: { keyword: 'breakfast', openNow: true },
        priority: priority++,
        color: getFilterColor('breakfast'),
      });
      pills.push({
        id: 'coffee',
        label: 'Coffee',
        emoji: '☕',
        category: 'coffee',
        searchParams: { type: 'cafe', openNow: true },
        priority: priority++,
        color: getFilterColor('coffee'),
      });
      break;
    case 'brunch':
      pills.push({
        id: 'brunch',
        label: 'Brunch',
        emoji: '🥂',
        category: 'breakfast',
        searchParams: { keyword: 'brunch', openNow: true },
        priority: priority++,
        color: getFilterColor('breakfast'),
      });
      break;
    case 'lunch':
      pills.push({
        id: 'quick-bites',
        label: 'Quick bites',
        emoji: '⚡',
        category: 'quick-bites',
        searchParams: { keyword: 'fast casual', openNow: true, maxDistance: 800 },
        priority: priority++,
        color: getFilterColor('quick-bites'),
      });
      pills.push({
        id: 'lunch-specials',
        label: 'Lunch deals',
        emoji: '💰',
        category: 'deals',
        searchParams: { keyword: 'lunch special', openNow: true },
        priority: priority++,
        color: getFilterColor('deals'),
      });
      break;
    case 'afternoon':
      pills.push({
        id: 'coffee-afternoon',
        label: 'Coffee & tea',
        emoji: '☕',
        category: 'coffee',
        searchParams: { type: 'cafe', openNow: true },
        priority: priority++,
        color: getFilterColor('coffee'),
      });
      pills.push({
        id: 'dessert',
        label: 'Sweet treats',
        emoji: '🍰',
        category: 'quick-bites',
        searchParams: { keyword: 'dessert bakery', openNow: true },
        priority: priority++,
        color: getFilterColor('quick-bites'),
      });
      break;
    case 'dinner':
      pills.push({
        id: 'dinner-res',
        label: 'Reservations',
        emoji: '📅',
        category: 'reservations',
        searchParams: { type: 'restaurant', openNow: true },
        priority: priority++,
        color: getFilterColor('reservations'),
      });
      pills.push({
        id: 'trending-dinner',
        label: 'Trending',
        emoji: '🔥',
        category: 'trending',
        searchParams: { type: 'restaurant', openNow: true },
        priority: priority++,
        color: getFilterColor('trending'),
      });
      break;
    case 'late-night':
      pills.push({
        id: 'late-night',
        label: 'Open late',
        emoji: '🌙',
        category: 'late-night',
        searchParams: { keyword: 'late night food', openNow: true },
        priority: priority++,
        color: getFilterColor('late-night'),
      });
      pills.push({
        id: 'bars',
        label: 'Bars',
        emoji: '🍸',
        category: 'late-night',
        searchParams: { type: 'bar', openNow: true },
        priority: priority++,
        color: getFilterColor('late-night'),
      });
      break;
  }

  if (signals.weather) {
    if (signals.weather.temp >= 75 && signals.weather.condition === 'clear') {
      pills.push({
        id: 'patio',
        label: 'Patio weather',
        emoji: '☀️',
        category: 'patio',
        searchParams: { keyword: 'patio outdoor seating' },
        priority: priority++,
        color: getFilterColor('patio'),
      });
    }
    if (signals.weather.condition === 'rain') {
      pills.push({
        id: 'cozy-indoor',
        label: 'Cozy indoors',
        emoji: '🏠',
        category: 'cozy-indoor',
        searchParams: { keyword: 'cozy indoor' },
        priority: priority++,
        color: getFilterColor('cozy-indoor'),
      });
    }
  }

  pills.push({
    id: 'trending-general',
    label: 'Popular now',
    emoji: '🔥',
    category: 'trending',
    searchParams: { type: 'restaurant' },
    priority: priority++,
    color: getFilterColor('trending'),
  });

  return pills;
}
