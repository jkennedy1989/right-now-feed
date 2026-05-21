import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

export async function POST(req: NextRequest) {
  const { signals, activePrimaryIds, existingPrimaryIds } = await req.json();

  const isSecondaryRequest = activePrimaryIds && activePrimaryIds.length > 0;

  const timeStr = signals?.timestamp
    ? new Date(signals.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : 'unknown';

  const weatherStr = signals?.weather
    ? `${signals.weather.description}, ${signals.weather.temp}°F`
    : 'unknown';

  let prompt: string;

  if (isSecondaryRequest) {
    prompt = `You are a restaurant filter system. The user has selected these primary filters: ${activePrimaryIds.join(', ')}. Generate 3-4 additional refinement filters that would help narrow down results further.

Context: ${timeStr}, ${signals?.mealPeriod || 'unknown'} period, weather: ${weatherStr}

Return ONLY a JSON array. Each item: { "id": "kebab-case", "label": "2-3 words", "keyword": "google places search terms", "group": "speed"|"budget"|"work"|"transit"|"healthy"|"indulgent" }
No markdown, no explanation.`;
  } else {
    prompt = `You are a restaurant discovery engine. Based on the current context, generate 2-3 unique, creative filter pill suggestions that go beyond generic time-of-day filters. Think local events, weather opportunities, trending food movements, or niche dining styles.

Context: ${timeStr}, ${signals?.mealPeriod || 'unknown'} period, ${signals?.isWeekend ? 'weekend' : 'weekday'}, weather: ${weatherStr}

Avoid duplicating these existing IDs: ${(existingPrimaryIds || []).join(', ')}

Return ONLY a JSON array. Each item: { "id": "kebab-case", "label": "2-4 words", "emoji": "single emoji", "keyword": "google places search terms", "signal": "vibe"|"events"|"season", "secondaryGroups": ["budget","speed","healthy","indulgent","work","transit"] (pick 2-3 relevant) }
No markdown, no explanation.`;
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const parsed = JSON.parse(text);

    if (isSecondaryRequest) {
      const pills = parsed.map((p: Record<string, unknown>) => ({
        ...p,
        isLlmGenerated: true,
      }));
      return NextResponse.json({ secondaryPills: pills });
    } else {
      const pills = parsed.map((p: Record<string, unknown>) => ({
        ...p,
        isLlmGenerated: true,
      }));
      return NextResponse.json({ primaryPills: pills });
    }
  } catch {
    return NextResponse.json(isSecondaryRequest ? { secondaryPills: [] } : { primaryPills: [] });
  }
}
