import { NextRequest, NextResponse } from 'next/server';
import { searchNearbyPlaces } from '@/lib/api-clients/google-places';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const radius = parseInt(searchParams.get('radius') || '1500');
  const type = searchParams.get('type') || undefined;
  const keyword = searchParams.get('keyword') || undefined;
  const openNow = searchParams.get('openNow') === 'true';

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  try {
    const places = await searchNearbyPlaces({
      location: { lat, lng },
      radius,
      type,
      keyword,
      openNow: openNow || undefined,
    });
    return NextResponse.json(places);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}
