import { NextRequest, NextResponse } from 'next/server';
import { generateFilterPills } from '@/lib/api-clients/anthropic';
import { getStaticFallbackFilters } from '@/lib/context-engine';
import { ContextSignals } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signals: ContextSignals = {
      ...body.signals,
      timestamp: new Date(body.signals.timestamp),
    };

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 3000)
    );

    const filtersPromise = generateFilterPills(signals);
    const result = await Promise.race([filtersPromise, timeoutPromise]);

    if (result && result.length > 0) {
      return NextResponse.json({ filters: result });
    }

    return NextResponse.json({ filters: getStaticFallbackFilters(signals) });
  } catch {
    return NextResponse.json(
      { filters: [] },
      { status: 200 }
    );
  }
}
