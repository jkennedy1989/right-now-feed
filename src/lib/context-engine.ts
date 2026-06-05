import { ContextSignals, Daylight, MealPeriod, WeatherData } from '@/types';
import { PrimaryFilterPill, SecondaryFilterPill, SecondaryGroup } from '@/types/filters';

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

// --- PRIMARY PILL POOLS ---

const TIME_PILLS: Record<string, PrimaryFilterPill[]> = {
  'morning': [
    { id: 'quick-coffee', label: 'Quick coffee', emoji: '☕', keyword: 'coffee shop open now', signal: 'time', secondaryGroups: ['speed', 'budget', 'work'] },
    { id: 'breakfast-go', label: 'Breakfast on the go', emoji: '🥐', keyword: 'breakfast takeout', signal: 'time', secondaryGroups: ['speed', 'budget', 'healthy', 'indulgent'] },
    { id: 'open-breakfast', label: 'Open now breakfast', emoji: '🍳', keyword: 'breakfast restaurant open', signal: 'time', secondaryGroups: ['speed', 'budget', 'healthy', 'indulgent'] },
    { id: 'quiet-morning', label: 'Quiet morning spot', emoji: '🌅', keyword: 'quiet cafe morning', signal: 'time', secondaryGroups: ['work', 'budget'] },
    { id: 'bakery-near', label: 'Bakery near me', emoji: '🥖', keyword: 'bakery', signal: 'time', secondaryGroups: ['speed', 'budget', 'indulgent'] },
  ],
  'lunch': [
    { id: 'quick-lunch', label: 'Quick lunch', emoji: '🥪', keyword: 'quick lunch restaurant', signal: 'time', secondaryGroups: ['speed', 'budget', 'healthy', 'indulgent'] },
    { id: 'lunch-specials', label: 'Lunch specials', emoji: '💰', keyword: 'lunch special deal', signal: 'time', secondaryGroups: ['budget', 'speed'] },
    { id: 'fast-casual', label: 'Fast casual', emoji: '🍜', keyword: 'fast casual restaurant', signal: 'time', secondaryGroups: ['speed', 'budget', 'healthy', 'indulgent'] },
    { id: 'desk-pickup', label: 'Desk lunch pickup', emoji: '📦', keyword: 'lunch pickup takeout', signal: 'time', secondaryGroups: ['speed', 'budget'] },
    { id: 'business-lunch', label: 'Business lunch', emoji: '👔', keyword: 'business lunch restaurant', signal: 'time', secondaryGroups: ['budget', 'transit'] },
  ],
  'afternoon': [
    { id: 'coffee-pastry', label: 'Coffee & pastry', emoji: '🧁', keyword: 'coffee pastry cafe', signal: 'time', secondaryGroups: ['speed', 'budget', 'work', 'indulgent'] },
    { id: 'afternoon-pickup', label: 'Afternoon pick-me-up', emoji: '⚡', keyword: 'cafe smoothie afternoon', signal: 'time', secondaryGroups: ['speed', 'healthy'] },
    { id: 'wifi-coffee', label: 'Wi-Fi & coffee', emoji: '💻', keyword: 'cafe wifi laptop', signal: 'time', secondaryGroups: ['work', 'budget'] },
    { id: 'quiet-workspace', label: 'Quiet workspace', emoji: '📚', keyword: 'quiet cafe workspace', signal: 'time', secondaryGroups: ['work', 'budget'] },
    { id: 'smoothies', label: 'Smoothies near me', emoji: '🥤', keyword: 'smoothie juice bar', signal: 'time', secondaryGroups: ['speed', 'healthy'] },
  ],
  'dinner': [
    { id: 'sitdown-dinner', label: 'Sit-down dinner', emoji: '🍽️', keyword: 'sit down dinner restaurant', signal: 'time', secondaryGroups: ['budget', 'transit', 'indulgent'] },
    { id: 'date-night', label: 'Date night spots', emoji: '🌹', keyword: 'date night restaurant romantic', signal: 'time', secondaryGroups: ['budget', 'transit', 'indulgent'] },
    { id: 'late-dinner', label: 'Late dinner', emoji: '🕘', keyword: 'late dinner restaurant open', signal: 'time', secondaryGroups: ['budget', 'speed'] },
    { id: 'casual-dinner', label: 'Casual dinner', emoji: '🍕', keyword: 'casual dinner restaurant', signal: 'time', secondaryGroups: ['budget', 'speed', 'healthy', 'indulgent'] },
    { id: 'dinner-view', label: 'Dinner with a view', emoji: '🏙️', keyword: 'restaurant rooftop view dinner', signal: 'time', secondaryGroups: ['budget', 'transit'] },
  ],
  'late-night': [
    { id: 'open-midnight', label: 'Open past midnight', emoji: '🌙', keyword: 'open late night food', signal: 'time', secondaryGroups: ['speed', 'budget', 'indulgent'] },
    { id: 'late-bites', label: 'Late night bites', emoji: '🌯', keyword: 'late night food bites', signal: 'time', secondaryGroups: ['speed', 'budget', 'indulgent'] },
    { id: '24hr-food', label: '24-hour food', emoji: '🔄', keyword: '24 hour restaurant food', signal: 'time', secondaryGroups: ['speed', 'budget'] },
    { id: 'nightcap', label: 'Nightcap spots', emoji: '🥃', keyword: 'cocktail bar nightcap', signal: 'time', secondaryGroups: ['budget', 'transit'] },
    { id: 'post-event', label: 'Post-event drinks', emoji: '🍻', keyword: 'bar drinks late open', signal: 'time', secondaryGroups: ['budget', 'speed'] },
  ],
};

const WEATHER_PILLS: Record<string, PrimaryFilterPill[]> = {
  'sunny-warm': [
    { id: 'patio-seating', label: 'Patio seating', emoji: '☀️', keyword: 'patio outdoor seating restaurant', signal: 'weather', secondaryGroups: ['budget', 'indulgent'] },
    { id: 'rooftop-bars', label: 'Rooftop bars', emoji: '🍹', keyword: 'rooftop bar', signal: 'weather', secondaryGroups: ['budget', 'transit'] },
    { id: 'outdoor-dining', label: 'Outdoor dining', emoji: '🌿', keyword: 'outdoor dining restaurant', signal: 'weather', secondaryGroups: ['budget', 'healthy', 'indulgent'] },
    { id: 'ice-cream', label: 'Ice cream nearby', emoji: '🍦', keyword: 'ice cream gelato', signal: 'weather', secondaryGroups: ['speed', 'budget', 'indulgent'] },
    { id: 'beer-garden', label: 'Beer garden', emoji: '🍺', keyword: 'beer garden outdoor', signal: 'weather', secondaryGroups: ['budget', 'transit'] },
  ],
  'rainy': [
    { id: 'cozy-inside', label: 'Cozy inside', emoji: '🏠', keyword: 'cozy indoor restaurant cafe', signal: 'weather', secondaryGroups: ['budget', 'work', 'indulgent'] },
    { id: 'comfort-food', label: 'Comfort food', emoji: '🍲', keyword: 'comfort food restaurant', signal: 'weather', secondaryGroups: ['budget', 'indulgent'] },
    { id: 'warm-drinks', label: 'Warm drinks', emoji: '☕', keyword: 'hot coffee tea cafe', signal: 'weather', secondaryGroups: ['speed', 'budget', 'work'] },
    { id: 'rainy-friendly', label: 'Rainy day friendly', emoji: '☔', keyword: 'indoor restaurant cozy', signal: 'weather', secondaryGroups: ['budget', 'transit'] },
  ],
  'hot': [
    { id: 'air-conditioned', label: 'Air-conditioned', emoji: '❄️', keyword: 'indoor air conditioned restaurant', signal: 'weather', secondaryGroups: ['budget', 'speed'] },
    { id: 'shaded-seating', label: 'Shaded seating', emoji: '🌳', keyword: 'shaded outdoor seating', signal: 'weather', secondaryGroups: ['budget', 'healthy'] },
    { id: 'waterfront', label: 'Waterfront views', emoji: '🌊', keyword: 'waterfront restaurant view', signal: 'weather', secondaryGroups: ['budget', 'transit'] },
    { id: 'frozen-drinks', label: 'Frozen drinks', emoji: '🧊', keyword: 'frozen drinks smoothie bar', signal: 'weather', secondaryGroups: ['speed', 'budget', 'healthy'] },
  ],
  'cold': [
    { id: 'heated-patio', label: 'Heated patio', emoji: '🔥', keyword: 'heated patio restaurant', signal: 'weather', secondaryGroups: ['budget', 'transit'] },
    { id: 'cozy-booths', label: 'Cozy booths', emoji: '🛋️', keyword: 'cozy booth restaurant', signal: 'weather', secondaryGroups: ['budget', 'indulgent'] },
    { id: 'soups-stews', label: 'Soups & stews', emoji: '🥣', keyword: 'soup stew ramen pho', signal: 'weather', secondaryGroups: ['budget', 'healthy', 'indulgent'] },
    { id: 'hot-cocoa', label: 'Hot cider/cocoa', emoji: '🍫', keyword: 'hot chocolate cider cafe', signal: 'weather', secondaryGroups: ['speed', 'budget'] },
  ],
};

const DAY_PILLS: Record<string, PrimaryFilterPill[]> = {
  'weekday': [
    { id: 'happy-hour', label: 'Happy hour now', emoji: '🍷', keyword: 'happy hour bar restaurant', signal: 'day', secondaryGroups: ['budget', 'transit', 'speed'] },
    { id: 'post-work', label: 'Post-work drinks', emoji: '🍺', keyword: 'bar after work drinks', signal: 'day', secondaryGroups: ['budget', 'transit'] },
    { id: 'quick-bite', label: 'Quick bite', emoji: '🥡', keyword: 'quick food bite restaurant', signal: 'day', secondaryGroups: ['speed', 'budget', 'healthy'] },
    { id: 'remote-work', label: 'Remote work friendly', emoji: '💼', keyword: 'cafe wifi laptop work', signal: 'day', secondaryGroups: ['work', 'budget'] },
    { id: 'solo-dining', label: 'Solo dining', emoji: '🧘', keyword: 'solo dining counter restaurant', signal: 'day', secondaryGroups: ['budget', 'speed'] },
  ],
  'weekend': [
    { id: 'bottomless-brunch', label: 'Bottomless brunch', emoji: '🥂', keyword: 'bottomless brunch restaurant', signal: 'day', secondaryGroups: ['budget', 'transit', 'indulgent'] },
    { id: 'saturday-brunch', label: 'Saturday brunch', emoji: '🥞', keyword: 'brunch restaurant', signal: 'day', secondaryGroups: ['budget', 'healthy', 'indulgent'] },
    { id: 'sunday-roast', label: 'Sunday roast', emoji: '🍖', keyword: 'sunday roast restaurant', signal: 'day', secondaryGroups: ['budget', 'indulgent'] },
    { id: 'weekend-markets', label: 'Weekend markets', emoji: '🛍️', keyword: 'weekend market food', signal: 'day', secondaryGroups: ['budget', 'speed', 'healthy'] },
    { id: 'live-music', label: 'Live music tonight', emoji: '🎵', keyword: 'live music bar restaurant', signal: 'day', secondaryGroups: ['budget', 'transit'] },
  ],
};

const SEASON_PILLS: PrimaryFilterPill[] = [
  { id: 'farmers-market', label: 'Farmers market', emoji: '🥬', keyword: 'farmers market food', signal: 'season', secondaryGroups: ['budget', 'healthy'] },
  { id: 'food-trucks', label: 'Food trucks', emoji: '🚚', keyword: 'food truck', signal: 'season', secondaryGroups: ['speed', 'budget', 'indulgent'] },
  { id: 'rooftop-views', label: 'Rooftop views', emoji: '🌇', keyword: 'rooftop bar view', signal: 'season', secondaryGroups: ['budget', 'transit'] },
  { id: 'holiday-markets', label: 'Holiday markets', emoji: '🎄', keyword: 'holiday market food', signal: 'season', secondaryGroups: ['budget', 'speed'] },
  { id: 'cozy-cafes', label: 'Cozy cafes', emoji: '🧣', keyword: 'cozy cafe warm', signal: 'season', secondaryGroups: ['budget', 'work', 'indulgent'] },
];

const VIBE_PILLS: PrimaryFilterPill[] = [
  { id: 'hidden-gem', label: 'Hidden gem', emoji: '💎', keyword: 'hidden gem local restaurant', signal: 'vibe', secondaryGroups: ['budget', 'indulgent'] },
  { id: 'local-favorite', label: 'Local favorite', emoji: '⭐', keyword: 'popular local restaurant', signal: 'vibe', secondaryGroups: ['budget', 'healthy', 'indulgent'] },
  { id: 'low-key', label: 'Low-key spot', emoji: '😌', keyword: 'low key casual restaurant', signal: 'vibe', secondaryGroups: ['budget', 'speed'] },
  { id: 'live-music-now', label: 'Live music now', emoji: '🎶', keyword: 'live music bar tonight', signal: 'events', secondaryGroups: ['budget', 'transit'] },
  { id: 'trivia-night', label: 'Trivia night', emoji: '🧠', keyword: 'trivia night bar', signal: 'events', secondaryGroups: ['budget', 'transit'] },
];

// --- SECONDARY PILL POOLS ---

const SECONDARY_POOLS: Record<SecondaryGroup, SecondaryFilterPill[]> = {
  speed: [
    { id: 'drive-thru', label: 'Drive-thru', keyword: 'drive thru', group: 'speed' },
    { id: 'counter-service', label: 'Counter service', keyword: 'counter service fast', group: 'speed' },
    { id: 'no-reservation', label: 'No reservation needed', keyword: 'no reservation walk in', group: 'speed' },
    { id: 'fast-service', label: 'Fast service', keyword: 'fast service quick', group: 'speed' },
    { id: 'street-food', label: 'Street food', keyword: 'street food', group: 'speed' },
  ],
  budget: [
    { id: 'cheap-eats', label: 'Cheap eats', keyword: 'cheap affordable', group: 'budget' },
    { id: 'happy-hour-food', label: 'Happy hour food', keyword: 'happy hour specials', group: 'budget' },
    { id: 'budget-friendly', label: 'Budget-friendly', keyword: 'budget friendly affordable', group: 'budget' },
    { id: 'special-offers', label: 'Special offers', keyword: 'special offer deal', group: 'budget' },
  ],
  work: [
    { id: 'has-wifi', label: 'Has Wi-Fi', keyword: 'wifi', group: 'work' },
    { id: 'outlets', label: 'Outlets available', keyword: 'outlets charging', group: 'work' },
    { id: 'quiet-bg', label: 'Quiet background', keyword: 'quiet calm', group: 'work' },
    { id: 'laptop-friendly', label: 'Laptop friendly', keyword: 'laptop friendly cafe', group: 'work' },
  ],
  transit: [
    { id: 'easy-parking', label: 'Easy parking', keyword: 'parking', group: 'transit' },
    { id: 'near-transit', label: 'Near transit', keyword: 'near subway transit', group: 'transit' },
    { id: 'walkable', label: 'Walkable', keyword: 'walkable nearby', group: 'transit' },
    { id: 'wheelchair', label: 'Wheelchair accessible', keyword: 'wheelchair accessible', group: 'transit' },
  ],
  healthy: [
    { id: 'healthy-bites', label: 'Healthy bites', keyword: 'healthy food', group: 'healthy' },
    { id: 'vegan', label: 'Vegan options', keyword: 'vegan restaurant', group: 'healthy' },
    { id: 'gluten-free', label: 'Gluten-free friendly', keyword: 'gluten free', group: 'healthy' },
    { id: 'salad-bars', label: 'Salad bars', keyword: 'salad bar healthy', group: 'healthy' },
    { id: 'fresh-juices', label: 'Fresh juices', keyword: 'juice bar fresh', group: 'healthy' },
  ],
  indulgent: [
    { id: 'cheat-meal', label: 'Cheat meal', keyword: 'indulgent comfort food', group: 'indulgent' },
    { id: 'sweet-tooth', label: 'Sweet tooth', keyword: 'dessert bakery sweet', group: 'indulgent' },
    { id: 'pizza-slice', label: 'Pizza slice', keyword: 'pizza slice', group: 'indulgent' },
    { id: 'street-tacos', label: 'Street tacos', keyword: 'street tacos', group: 'indulgent' },
    { id: 'comfort-classics', label: 'Comfort classics', keyword: 'comfort food classic', group: 'indulgent' },
  ],
};

// --- GENERATION LOGIC ---

function getTimeKey(mealPeriod: MealPeriod): string {
  switch (mealPeriod) {
    case 'early-morning':
    case 'breakfast':
    case 'brunch':
      return 'morning';
    case 'lunch':
      return 'lunch';
    case 'afternoon':
      return 'afternoon';
    case 'dinner':
      return 'dinner';
    case 'late-night':
      return 'late-night';
    default:
      return 'lunch';
  }
}

function getWeatherKey(weather: WeatherData | null): string | null {
  if (!weather) return null;
  if (weather.temp >= 90) return 'hot';
  if (weather.temp < 45) return 'cold';
  if (weather.condition === 'rain') return 'rainy';
  if (weather.temp >= 75 && (weather.condition === 'clear' || weather.condition === 'clouds')) return 'sunny-warm';
  return null;
}

function isSpringSummer(): boolean {
  const month = new Date().getMonth();
  return month >= 2 && month <= 7; // Mar-Aug
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generatePrimaryPills(signals: ContextSignals): PrimaryFilterPill[] {
  const pills: PrimaryFilterPill[] = [];

  // 2 time-of-day pills
  const timeKey = getTimeKey(signals.mealPeriod);
  const timePills = TIME_PILLS[timeKey] || TIME_PILLS['lunch'];
  pills.push(...pickRandom(timePills, 2));

  // 1-2 weather pills
  const weatherKey = getWeatherKey(signals.weather);
  if (weatherKey) {
    const weatherPills = WEATHER_PILLS[weatherKey];
    pills.push(...pickRandom(weatherPills, 2));
  }

  // 1 day-of-week pill
  const dayKey = signals.isWeekend ? 'weekend' : 'weekday';
  const dayPills = DAY_PILLS[dayKey];
  pills.push(...pickRandom(dayPills, 1));

  // 1 seasonal or event pill
  const seasonPills = isSpringSummer()
    ? SEASON_PILLS.filter((p) => ['farmers-market', 'food-trucks', 'rooftop-views'].includes(p.id))
    : SEASON_PILLS.filter((p) => ['holiday-markets', 'cozy-cafes'].includes(p.id));
  if (seasonPills.length > 0) {
    pills.push(pickRandom(seasonPills, 1)[0]);
  }

  // 1 vibe/events pill
  pills.push(...pickRandom(VIBE_PILLS, 1));

  return pills.slice(0, 5);
}

export function getSecondaryPills(primaryPills: PrimaryFilterPill | PrimaryFilterPill[]): SecondaryFilterPill[] {
  const pillArray = Array.isArray(primaryPills) ? primaryPills : [primaryPills];
  const allGroups = new Set<SecondaryGroup>();
  pillArray.forEach((p) => p.secondaryGroups.forEach((g) => allGroups.add(g)));

  const walkablePill = SECONDARY_POOLS.transit.find(p => p.id === 'walkable')!;
  const pills: SecondaryFilterPill[] = [walkablePill];

  for (const group of allGroups) {
    const pool = SECONDARY_POOLS[group];
    if (pool) {
      const filtered = pool.filter(p => p.id !== 'walkable');
      pills.push(...pickRandom(filtered, 2));
    }
  }

  return pills.slice(0, 10);
}
