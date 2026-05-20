import { NextRequest, NextResponse } from 'next/server';
import { addVote, getVotes } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { businessId, voterName } = body;

  if (!businessId) {
    return NextResponse.json({ error: 'businessId required' }, { status: 400 });
  }

  await addVote(id, businessId, voterName || 'Anonymous');
  const votes = await getVotes(id);

  return NextResponse.json({ votes });
}
