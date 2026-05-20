import { NextRequest, NextResponse } from 'next/server';
import { createSharedList, getSharedList } from '@/lib/db';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { creatorName, city, businessIds } = body;

  if (!businessIds || !Array.isArray(businessIds) || businessIds.length === 0) {
    return NextResponse.json({ error: 'businessIds required' }, { status: 400 });
  }

  const list = await createSharedList(
    creatorName || 'Anonymous',
    city || 'la',
    businessIds
  );

  return NextResponse.json(list);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id required' }, { status: 400 });
  }

  const list = await getSharedList(id);
  if (!list) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  return NextResponse.json(list);
}
