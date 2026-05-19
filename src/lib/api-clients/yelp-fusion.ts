import { Deal, EventItem } from '@/types';

const BASE_URL = 'https://api.yelp.com/v3';

function getHeaders(): HeadersInit {
  const apiKey = process.env.YELP_FUSION_API_KEY;
  if (!apiKey) throw new Error('Missing YELP_FUSION_API_KEY');
  return { Authorization: `Bearer ${apiKey}` };
}

export async function searchEvents(
  lat: number,
  lng: number,
  limit = 10
): Promise<EventItem[]> {
  const url = `${BASE_URL}/events?latitude=${lat}&longitude=${lng}&limit=${limit}&sort_on=time_start&sort_by=asc`;

  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 1800 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.events) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.events.map((e: any) => ({
    id: e.id,
    name: e.name,
    description: e.description || '',
    imageUrl: e.image_url || '',
    timeStart: e.time_start,
    timeEnd: e.time_end || e.time_start,
    cost: e.cost ?? null,
    category: e.category || 'other',
    businessId: e.business_id || undefined,
    businessName: e.business_id ? undefined : undefined,
    location: { lat: e.latitude || lat, lng: e.longitude || lng },
    url: e.event_site_url || '',
  }));
}

export async function searchDeals(
  lat: number,
  lng: number,
  limit = 10
): Promise<Deal[]> {
  const url = `${BASE_URL}/businesses/search?latitude=${lat}&longitude=${lng}&limit=${limit}&attributes=deals&sort_by=distance`;

  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 1800 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.businesses) return [];

  return data.businesses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b.transactions?.length > 0 || b.special_hours)
    .slice(0, limit)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => ({
      id: `deal-${b.id}`,
      title: `Special at ${b.name}`,
      description: b.categories?.[0]?.title || 'Limited time offer',
      imageUrl: b.image_url || '',
      businessId: b.id,
      businessName: b.name,
      timeStart: Date.now(),
      timeEnd: Date.now() + 86400000,
      url: b.url || '',
      location: {
        lat: b.coordinates?.latitude || lat,
        lng: b.coordinates?.longitude || lng,
      },
    }));
}
