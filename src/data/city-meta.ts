export type CityId = 'la' | 'sf' | 'toronto';

export interface CityMeta {
  id: CityId;
  name: string;
  shortName: string;
  center: { lat: number; lng: number };
  timezone: string;
  topCuisines: string[];
  iconicDishes: string[];
  foodCultureSummary: string;
}

export const CITIES: Record<CityId, CityMeta> = {
  la: {
    id: 'la',
    name: 'Los Angeles',
    shortName: 'LA',
    center: { lat: 34.0522, lng: -118.2437 },
    timezone: 'America/Los_Angeles',
    topCuisines: ['Mexican', 'Korean', 'Japanese', 'Vietnamese', 'Thai', 'Ethiopian'],
    iconicDishes: [
      'Birria tacos',
      'Korean BBQ galbi',
      'Smash burgers',
      'Fish tacos',
      'Açaí bowls',
      'Ramen (tsukemen style)',
    ],
    foodCultureSummary:
      'A melting pot of global flavors driven by immigrant communities — from the taco trucks of East LA to the sushi temples of the Westside.',
  },
  sf: {
    id: 'sf',
    name: 'San Francisco',
    shortName: 'SF',
    center: { lat: 37.7749, lng: -122.4194 },
    timezone: 'America/Los_Angeles',
    topCuisines: ['Chinese', 'Japanese', 'Italian', 'Californian', 'Vietnamese', 'Mexican'],
    iconicDishes: [
      'Sourdough bread bowls',
      'Mission-style burritos',
      'Cioppino',
      'Dim sum',
      'Dungeness crab',
      'Irish coffee (the original)',
    ],
    foodCultureSummary:
      'Farm-to-table pioneer with deep roots in Chinatown dim sum, Mission District taquerias, and Michelin-starred tasting menus.',
  },
  toronto: {
    id: 'toronto',
    name: 'Toronto',
    shortName: 'TO',
    center: { lat: 43.6532, lng: -79.3832 },
    timezone: 'America/Toronto',
    topCuisines: ['Chinese', 'Indian', 'Italian', 'Caribbean', 'Korean', 'Middle Eastern'],
    iconicDishes: [
      'Peameal bacon sandwich',
      'Jerk chicken',
      'Hakka Chinese',
      'Butter chicken poutine',
      'Patties (Jamaican)',
      'Veal sandwich',
    ],
    foodCultureSummary:
      'The world on one street — Kensington Market, Chinatown, Little India, and Greektown deliver one of the most diverse food scenes on the planet.',
  },
};

export const CITY_IDS: CityId[] = ['la', 'sf', 'toronto'];
