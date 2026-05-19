export const DEFAULT_LOCATION = { lat: 34.0407, lng: -118.2468 };
export const DEFAULT_ZOOM = 14;
export const DEFAULT_RADIUS = 1500;
export const MAX_MARKERS = 25;

export const MAP_ID = 'right-now-feed-map';

export const MEAL_PERIOD_LABELS: Record<string, { title: string; emoji: string }> = {
  'early-morning': { title: 'Early morning fuel', emoji: '🌅' },
  breakfast: { title: 'Breakfast spots', emoji: '☀️' },
  brunch: { title: 'Brunch vibes', emoji: '🥂' },
  lunch: { title: 'Lunch, right now', emoji: '🍽️' },
  afternoon: { title: 'Afternoon pick-me-up', emoji: '☕' },
  dinner: { title: "Tonight's dinner", emoji: '🌙' },
  'late-night': { title: 'Still open, still good', emoji: '🦉' },
};

export const CATEGORY_EMOJI: Record<string, string> = {
  restaurant: '🍽️',
  cafe: '☕',
  bar: '🍸',
  bakery: '🥐',
  pizza: '🍕',
  sushi: '🍣',
  mexican: '🌮',
  chinese: '🥡',
  italian: '🍝',
  thai: '🍜',
  indian: '🍛',
  burger: '🍔',
  dessert: '🍰',
  ice_cream: '🍦',
  coffee: '☕',
  patio: '☀️',
  delivery: '🚗',
  trending: '🔥',
  deals: '💰',
  events: '🎉',
};

export const WEATHER_THRESHOLD = {
  HOT: 85,
  WARM: 70,
  COLD: 50,
};
