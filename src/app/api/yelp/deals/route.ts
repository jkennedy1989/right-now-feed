import { NextRequest, NextResponse } from 'next/server';
import { searchDeals } from '@/lib/api-clients/yelp-fusion';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  try {
    const deals = await searchDeals(lat, lng, limit);
    return NextResponse.json(deals);
  } catch {
    return NextResponse.json([]);
  }
}
