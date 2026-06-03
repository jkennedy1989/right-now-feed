import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

export async function POST(req: NextRequest) {
  const { city, topCuisines, trendingDishes, mealPeriod, isWeekend } = await req.json();

  if (!city) {
    return NextResponse.json({ summary: '' });
  }

  const prompt = `Write one punchy phrase (max 10 words) about what makes ${city}'s food scene special right now.

Context:
- Popular cuisines: ${topCuisines?.join(', ') || 'various'}
- Trending: ${trendingDishes?.join(', ') || 'various'}
- Time: ${mealPeriod || 'daytime'}, ${isWeekend ? 'weekend' : 'weekday'}

Be specific and unique to ${city}. No generic phrases. No quotes.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 60,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ summary: text.trim() });
  } catch {
    return NextResponse.json({ summary: '' });
  }
}
