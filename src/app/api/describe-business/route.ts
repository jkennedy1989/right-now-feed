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

  const prompt = `You are a hyper-local food insider. Write a single "know before you go" tip (max 35 words) for "${business.name}".

Context:
- Cuisine: ${business.cuisine || 'Unknown'}
- Style: ${business.category || 'Restaurant'}
- Price: ${'$'.repeat(business.priceLevel || 2)}
- Known for: ${business.hook || 'N/A'}
- Has patio: ${business.attributes?.hasPatio || 'unknown'}
- Reservations: ${business.attributes?.hasReservations || 'unknown'}
- Time: ${signals?.mealPeriod || 'unknown'} (${signals?.isWeekend ? 'weekend' : 'weekday'})
${filtersStr ? `- ${filtersStr}` : ''}

Write an actionable insider tip — something useful before visiting. Examples:
- "Counter service only, order the birria tacos first"
- "Expect a 20-min wait weekends, patio is dog-friendly"
- "No reservations — put your name in on the waitlist app before arriving"

Be specific, conversational, practical. No quotes around the tip. No generic praise. No rating mentions.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ description: text.trim() });
  } catch {
    return NextResponse.json({ description: '' });
  }
}
