import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

export async function POST(req: NextRequest) {
  const { business, activeFilters, signals } = await req.json();

  if (!business?.name) {
    return NextResponse.json({ description: '' });
  }

  const filtersStr = activeFilters?.length > 0
    ? `The user is looking for: ${activeFilters.join(', ')}.`
    : '';

  const prompt = `Write 3 short lines (total max 40 words) about "${business.name}":
1. What to order (1-2 popular dishes)
2. The vibe in a few words
3. One practical "know before you go" tip

Context:
- Cuisine: ${business.cuisine || 'Unknown'}
- Style: ${business.category || 'Restaurant'}
- Price: ${'$'.repeat(business.priceLevel || 2)}
- Known for: ${business.hook || 'N/A'}
- Has patio: ${business.attributes?.hasPatio || 'unknown'}
- Reservations: ${business.attributes?.hasReservations || 'unknown'}
- Time: ${signals?.mealPeriod || 'unknown'} (${signals?.isWeekend ? 'weekend' : 'weekday'})
${filtersStr ? `- ${filtersStr}` : ''}

No quotes, no numbering, no labels. Just the content, one line per point. Be specific and practical.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 120,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ description: text.trim() });
  } catch {
    return NextResponse.json({ description: '' });
  }
}
