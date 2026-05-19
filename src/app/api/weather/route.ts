import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather } from '@/lib/api-clients/openweather';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  try {
    const weather = await getCurrentWeather(lat, lng);
    return NextResponse.json(weather);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    );
  }
}
