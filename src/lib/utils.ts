import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CuratedBusiness } from '@/types/curated';
import { Business } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function curatedToBusiness(c: CuratedBusiness): Business {
  const categoryLower = c.category.toLowerCase();
  const cuisineLower = c.cuisine.toLowerCase();
  const categories = [cuisineLower, categoryLower].filter(Boolean);

  let priceLevel = 2;
  if (categoryLower.includes('fine dining') || categoryLower.includes('tasting')) priceLevel = 4;
  else if (categoryLower.includes('casual') || categoryLower.includes('fast')) priceLevel = 1;
  else if (categoryLower.includes('upscale') || c.michelinStatus) priceLevel = 3;

  const hash = c.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return {
    id: c.id,
    name: c.name,
    neighborhood: c.neighborhood,
    cuisine: c.cuisine,
    category: c.category,
    location: c.location,
    rating: 4.0 + (hash % 9) / 10,
    reviewCount: 50 + (hash % 500),
    priceLevel,
    categories,
    primaryCategory: cuisineLower,
    address: c.address,
    isOpenNow: true,
    photoUrl: null,
    hook: c.hook,
    buzzFactor: c.buzzFactor,
    michelinStatus: c.michelinStatus,
    city: c.city,
    source: 'curated',
    attributes: {
      hasPatio: c.hook.toLowerCase().includes('patio') || c.hook.toLowerCase().includes('outdoor'),
      hasDelivery: categoryLower.includes('casual') || categoryLower.includes('fast'),
      hasReservations: priceLevel >= 3,
      cuisineType: c.cuisine,
    },
  };
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) return 'nearby';
  if (miles < 1) return `${Math.round(miles * 10) / 10} mi`;
  return `${Math.round(miles * 10) / 10} mi`;
}

export function formatTimeRemaining(endTime: number): string {
  const now = Date.now();
  const diff = endTime - now;
  if (diff <= 0) return 'Ended';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 24) return `${Math.floor(hours / 24)}d left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function formatPrice(level: number): string {
  return '$'.repeat(level || 1);
}

export function trimSummary(text: string, max = 120): string {
  if (text.length <= max) return text;
  const truncated = text.slice(0, max);
  const lastSentence = Math.max(
    truncated.lastIndexOf('. '),
    truncated.lastIndexOf('! '),
    truncated.lastIndexOf('? ')
  );
  if (lastSentence > max * 0.5) return truncated.slice(0, lastSentence + 1);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > max * 0.5) return truncated.slice(0, lastSpace) + '...';
  return truncated + '...';
}
