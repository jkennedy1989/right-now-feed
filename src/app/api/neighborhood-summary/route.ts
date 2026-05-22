import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

export async function POST(req: NextRequest) {
  const { city, topCuisines, trendingDishes, mealPeriod, isWeekend, hour } = await req.json();

  if (!city) {
    return NextResponse.json({ summary: '' });
  }

  const timeOfDay = hour >= 21 ? 'late night' : hour >= 17 ? 'evening' : hour >= 12 ? 'afternoon' : 'morning';
  const dayType = isWeekend ? 'weekend' : 'weekday';

  const prompt = `You are a local food guide for ${city}. Write a single short sentence (max 20 words) about what's happening in the food scene right now.

Context:
- Time: ${timeOfDay} on a ${dayType}
- Meal period: ${mealPeriod || timeOfDay}
- Popular cuisines nearby: ${topCuisines?.join(', ') || 'various'}
- Trending dishes: ${trendingDishes?.join(', ') || 'various'}

Be specific to the city and time of day. Mention what locals are doing or eating right now. Conversational and warm tone. No quotes, no generic phrases like "there's something for everyone." Keep it to one short sentence that fits on two lines of a mobile screen.`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ summary: text.trim() });
  } catch {
    return NextResponse.json({ summary: '' });
  }
}
