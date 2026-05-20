import { NextRequest, NextResponse } from 'next/server';
import { getSharedList, getVotes } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const list = await getSharedList(id);

  if (!list) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  const votes = await getVotes(id);
  return NextResponse.json({ ...list, votes });
}
