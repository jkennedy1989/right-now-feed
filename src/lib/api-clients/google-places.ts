import { Business, BusinessAttributes } from '@/types';
import { CATEGORY_EMOJI } from '@/lib/constants';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

interface PlacesSearchParams {
  location: { lat: number; lng: number };
  radius?: number;
  type?: string;
  keyword?: string;
  openNow?: boolean;
}

export async function searchNearbyPlaces(params: PlacesSearchParams): Promise<Business[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error('Missing GOOGLE_PLACES_API_KEY');

  const { location, radius = 1500, type, keyword, openNow } = params;

  let url = `${BASE_URL}/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&key=${apiKey}`;
  if (type) url += `&type=${type}`;
  if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
  if (openNow) url += `&opennow=true`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Places API error: ${res.status}`);

  const data = await res.json();
  if (!data.results) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.slice(0, 25).map((place: any) => mapPlaceToBusiness(place, apiKey));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPlaceToBusiness(place: any, apiKey: string): Business {
  const types = place.types || [];
  const primaryCategory = getPrimaryCategory(types);

  const photoUrl = place.photos?.[0]
    ? `${BASE_URL}/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`
    : null;

  const attributes: BusinessAttributes = {
    hasDelivery: types.includes('meal_delivery'),
    hasReservations: place.price_level >= 2,
    hasPatio: false,
    hasWifi: types.includes('cafe'),
    cuisineType: primaryCategory,
  };

  return {
    id: place.place_id,
    name: place.name,
    location: {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    },
    rating: place.rating || 0,
    reviewCount: place.user_ratings_total || 0,
    priceLevel: place.price_level || 1,
    categories: types,
    primaryCategory,
    address: place.vicinity || '',
    isOpenNow: place.opening_hours?.open_now ?? true,
    photoUrl,
    attributes,
  };
}

function getPrimaryCategory(types: string[]): string {
  const priority = ['restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway', 'meal_delivery'];
  for (const t of priority) {
    if (types.includes(t)) return t;
  }
  return types[0] || 'restaurant';
}

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] || '📍';
}
