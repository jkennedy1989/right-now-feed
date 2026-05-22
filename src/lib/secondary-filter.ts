import { Business } from '@/types';
import { SecondaryFilterPill } from '@/types/filters';

const ONE_MILE_METERS = 1609;
const PRICE_KEYWORDS = ['cheap', 'affordable', 'budget'];
const HEALTHY_KEYWORDS = ['healthy', 'vegan', 'gluten free', 'salad', 'juice', 'fresh'];
const INDULGENT_KEYWORDS = ['comfort', 'indulgent', 'dessert', 'sweet', 'pizza', 'tacos'];
const SPEED_KEYWORDS = ['fast', 'quick', 'drive thru', 'counter service', 'street food'];

function haversineDistance(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function textMatchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

function businessSearchableText(place: Business): string {
  return [
    place.name,
    place.cuisine,
    place.category,
    place.primaryCategory,
    ...place.categories,
    place.hook,
  ].join(' ').toLowerCase();
}

export function matchesSecondaryFilter(
  place: Business,
  pill: SecondaryFilterPill,
  viewportCenter?: { lat: number; lng: number } | null
): boolean {
  if (pill.id === 'walkable') {
    if (!viewportCenter) return true;
    return haversineDistance(viewportCenter, place.location) <= ONE_MILE_METERS;
  }

  const group = pill.group;
  const pillKeywords = pill.keyword.toLowerCase().split(/\s+/);
  const searchable = businessSearchableText(place);

  switch (group) {
    case 'budget': {
      if (PRICE_KEYWORDS.some((kw) => pill.keyword.toLowerCase().includes(kw))) {
        return place.priceLevel <= 2;
      }
      return textMatchesAny(searchable, pillKeywords);
    }

    case 'healthy': {
      return HEALTHY_KEYWORDS.some((kw) => searchable.includes(kw)) ||
        textMatchesAny(searchable, pillKeywords);
    }

    case 'indulgent': {
      return INDULGENT_KEYWORDS.some((kw) => searchable.includes(kw)) ||
        textMatchesAny(searchable, pillKeywords);
    }

    case 'speed': {
      if (pill.id === 'drive-thru') {
        return searchable.includes('drive') || searchable.includes('thru');
      }
      if (pill.id === 'street-food') {
        return searchable.includes('street') || searchable.includes('truck') || searchable.includes('stand');
      }
      return SPEED_KEYWORDS.some((kw) => searchable.includes(kw)) ||
        place.attributes.avgTicketTime !== undefined && place.attributes.avgTicketTime <= 15;
    }

    case 'work': {
      if (pill.id === 'has-wifi') return place.attributes.hasWifi === true;
      if (pill.id === 'laptop-friendly') {
        return place.attributes.hasWifi === true || searchable.includes('cafe') || searchable.includes('coffee');
      }
      return textMatchesAny(searchable, pillKeywords);
    }

    case 'transit': {
      if (pill.id === 'easy-parking') {
        return searchable.includes('parking') || place.priceLevel >= 2;
      }
      if (pill.id === 'near-transit') {
        return true; // all results are already nearby based on radius
      }
      return textMatchesAny(searchable, pillKeywords);
    }

    default:
      return textMatchesAny(searchable, pillKeywords);
  }
}
