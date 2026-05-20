import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const photoRefCache = new Map<string, { ref: string | null; expires: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const city = searchParams.get('city');

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const cacheKey = `${name}|${city}`;

  let photoRef: string | null = null;
  const cached = photoRefCache.get(cacheKey);

  if (cached && cached.expires > Date.now()) {
    photoRef = cached.ref;
  } else {
    const query = city ? `${name} restaurant ${city}` : `${name} restaurant`;
    const findUrl = `${BASE_URL}/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=photos&key=${apiKey}`;

    const res = await fetch(findUrl);
    if (!res.ok) {
      return NextResponse.json({ error: 'Places API error' }, { status: 502 });
    }

    const data = await res.json();
    photoRef = data.candidates?.[0]?.photos?.[0]?.photo_reference ?? null;
    photoRefCache.set(cacheKey, { ref: photoRef, expires: Date.now() + CACHE_TTL });
  }

  if (!photoRef) {
    return NextResponse.json({ error: 'No photo found' }, { status: 404 });
  }

  const photoUrl = `${BASE_URL}/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`;
  const photoRes = await fetch(photoUrl, { redirect: 'follow' });

  if (!photoRes.ok) {
    return NextResponse.json({ error: 'Photo fetch failed' }, { status: 502 });
  }

  const imageBuffer = await photoRes.arrayBuffer();
  const contentType = photoRes.headers.get('content-type') || 'image/jpeg';

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
