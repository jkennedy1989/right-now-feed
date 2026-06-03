import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const cache = new Map<string, { results: unknown[]; expires: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function POST(req: NextRequest) {
  const { names, city, descriptions } = await req.json();

  if (!names || !Array.isArray(names) || names.length === 0) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const cacheKey = `${city}|${names.join(',')}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ results: cached.results });
  }

  const results = await Promise.all(
    names.map(async (name: string, i: number) => {
      try {
        const query = `${name} restaurant ${city}`;
        const findUrl = `${BASE_URL}/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,geometry,rating,user_ratings_total,price_level,types,photos&key=${apiKey}`;

        const res = await fetch(findUrl);
        if (!res.ok) return null;

        const data = await res.json();
        const candidate = data.candidates?.[0];
        if (!candidate) return null;

        const location = candidate.geometry?.location;
        if (!location) return null;

        return {
          id: `list-${candidate.place_id || name.toLowerCase().replace(/\s+/g, '-')}`,
          name: candidate.name || name,
          neighborhood: '',
          cuisine: '',
          category: 'Restaurant',
          location: { lat: location.lat, lng: location.lng },
          rating: candidate.rating || 0,
          reviewCount: candidate.user_ratings_total || 0,
          priceLevel: candidate.price_level || 2,
          categories: candidate.types || [],
          primaryCategory: 'restaurant',
          address: '',
          isOpenNow: true,
          photoUrl: null,
          hook: descriptions?.[i] || '',
          buzzFactor: '',
          michelinStatus: null,
          city,
          source: 'google',
          attributes: {},
        };
      } catch {
        return null;
      }
    })
  );

  const filtered = results.filter(Boolean);
  cache.set(cacheKey, { results: filtered, expires: Date.now() + CACHE_TTL });

  return NextResponse.json({ results: filtered });
}
