export type MealPeriod =
  | 'early-morning'
  | 'breakfast'
  | 'brunch'
  | 'lunch'
  | 'afternoon'
  | 'dinner'
  | 'late-night';

export type WeatherCondition =
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'snow'
  | 'hot'
  | 'cold'
  | 'windy';

export type Daylight = 'day' | 'golden-hour' | 'night';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  sunrise: number;
  sunset: number;
}

export interface ContextSignals {
  location: { lat: number; lng: number } | null;
  timestamp: Date;
  mealPeriod: MealPeriod;
  isWeekend: boolean;
  weather: WeatherData | null;
  daylight: Daylight;
}
