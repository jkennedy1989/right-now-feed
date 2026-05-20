import { NextRequest, NextResponse } from 'next/server';

const FIVE_MILES_METERS = 8047;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const type = searchParams.get('type') || 'restaurant';

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${FIVE_MILES_METERS}&type=${type}&rankby=prominence&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: 'Places API error' }, { status: 502 });
  }

  const data = await res.json();
  const results = (data.results || []).slice(0, 20).map((place: Record<string, unknown>) => ({
    id: `gp-${place.place_id}`,
    name: place.name as string,
    location: {
      lat: (place.geometry as { location: { lat: number; lng: number } }).location.lat,
      lng: (place.geometry as { location: { lat: number; lng: number } }).location.lng,
    },
    rating: (place.rating as number) || 4.0,
    reviewCount: (place.user_ratings_total as number) || 0,
    priceLevel: (place.price_level as number) || 2,
    vicinity: place.vicinity as string,
    types: place.types as string[],
    isOpenNow: (place.opening_hours as { open_now?: boolean })?.open_now ?? true,
    photoRef: (place.photos as { photo_reference: string }[])?.[0]?.photo_reference || null,
  }));

  return NextResponse.json({ results }, {
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
  });
}
