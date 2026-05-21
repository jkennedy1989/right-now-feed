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
    : 'No specific filters active — the user is browsing nearby.';

  const prompt = `You are a concise restaurant recommender. In 1-2 short sentences, explain why "${business.name}" is a great pick right now.

Context:
- Cuisine: ${business.cuisine || 'Unknown'}
- Rating: ${business.rating || 'N/A'} stars
- Neighborhood: ${business.neighborhood || 'Unknown'}
- Known for: ${business.hook || 'N/A'}
- Time: ${signals?.mealPeriod || 'unknown'} (${signals?.isWeekend ? 'weekend' : 'weekday'})
- ${filtersStr}

Write a compelling 1-2 sentence description that highlights why this spot fits what the user wants. Be specific and conversational. Do not use quotes or generic phrases.`;

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
