import { NextRequest, NextResponse } from 'next/server';

interface PredictHQEvent {
  id: string;
  title: string;
  start: string;
  entities: Array<{ entity_id: string; name: string; type: string }>;
  category: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');
  const limit = parseInt(searchParams.get('limit') || '3');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng required' }, { status: 400 });
  }

  const apiKey = process.env.PREDICTHQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ events: [] });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      'within': `5km@${lat},${lng}`,
      'category': 'concerts,festivals,community,performing-arts',
      'start.gte': today,
      'sort': 'start',
      'limit': limit.toString(),
      'state': 'active',
    });

    const res = await fetch(`https://api.predicthq.com/v1/events/?${params}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ events: [] });
    }

    const data = await res.json();
    const events = (data.results || []).map((e: PredictHQEvent) => {
      const venue = e.entities?.find((ent) => ent.type === 'venue');
      return {
        id: e.id,
        title: e.title,
        start: e.start,
        venueName: venue?.name || '',
        category: e.category,
      };
    });

    return NextResponse.json(
      { events },
      { headers: { 'Cache-Control': 'public, max-age=1800, s-maxage=1800' } }
    );
  } catch {
    return NextResponse.json({ events: [] });
  }
}
