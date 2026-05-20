import { NextRequest, NextResponse } from 'next/server';
import { searchNearbyPlaces, textSearchPlaces } from '@/lib/api-clients/google-places';
import { getCached, setCache } from '@/lib/places-cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const radius = parseInt(searchParams.get('radius') || '8047');
  const type = searchParams.get('type') || undefined;
  const keyword = searchParams.get('keyword') || undefined;
  const openNow = searchParams.get('openNow') === 'true';
  const maxResults = Math.min(parseInt(searchParams.get('maxResults') || '40'), 60);

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  const cached = getCached(lat, lng, radius, type, keyword);
  if (cached) {
    return NextResponse.json(
      { results: cached.slice(0, maxResults) },
      { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } }
    );
  }

  try {
    let places;

    if (keyword && !type) {
      places = await textSearchPlaces({
        query: keyword,
        location: { lat, lng },
        radius,
      });
    } else {
      places = await searchNearbyPlaces({
        location: { lat, lng },
        radius,
        type,
        keyword,
        openNow: openNow || undefined,
      });
    }

    setCache(lat, lng, radius, places, type, keyword);

    return NextResponse.json(
      { results: places.slice(0, maxResults) },
      { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}
