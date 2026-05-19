import Anthropic from '@anthropic-ai/sdk';
import { ContextSignals, FilterPill } from '@/types';
import { getFilterColor } from '@/lib/filter-color-map';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });

export async function generateFilterPills(signals: ContextSignals): Promise<FilterPill[]> {
  const dayOfWeek = new Date(signals.timestamp).toLocaleDateString('en-US', { weekday: 'long' });
  const timeStr = new Date(signals.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const weatherStr = signals.weather
    ? `${signals.weather.description}, feels like ${signals.weather.feelsLike}°F, humidity ${signals.weather.humidity}%`
    : 'unknown';

  const prompt = `You are a local discovery engine for a restaurant/business finder app. Based on the current context, generate 6-8 filter pills that would be most relevant to a user RIGHT NOW.

CONTEXT:
- Current time: ${timeStr}
- Meal period: ${signals.mealPeriod}
- Day: ${dayOfWeek} (weekend: ${signals.isWeekend})
- Weather: ${weatherStr}
- Daylight: ${signals.daylight}

RULES:
1. First pill should always relate to what's open and relevant right now
2. Include 1-2 meal-period-specific pills
3. If weather is notable (hot/rain/perfect), include 1 weather-reactive pill
4. Include 1 urgency/FOMO pill if evening or weekend
5. Include 1-2 category pills relevant to the time and context
6. Each pill needs: id (kebab-case), label (2-3 words max), emoji (single emoji), category (one of: open-now, quick-bites, coffee, patio, trending, late-night, deals, cozy-indoor, breakfast, lunch, dinner, reservations, default)
7. Include searchParams object with optional: type (google places type), keyword (search term), openNow (boolean), maxDistance (meters)

Return ONLY a valid JSON array of objects with these fields: id, label, emoji, category, searchParams, priority (number, lower = higher priority).
No markdown, no explanation, just the JSON array.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const parsed = JSON.parse(text);
    return parsed.map((pill: Record<string, unknown>) => ({
      ...pill,
      color: getFilterColor((pill.category as string) || 'default'),
    }));
  } catch {
    return [];
  }
}
