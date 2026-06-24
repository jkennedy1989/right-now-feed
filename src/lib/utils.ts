import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimSummary(text: string, max = 120): string {
  if (text.length <= max) return text;
  const truncated = text.slice(0, max);
  const lastSentence = Math.max(
    truncated.lastIndexOf('. '),
    truncated.lastIndexOf('! '),
    truncated.lastIndexOf('? ')
  );
  if (lastSentence > max * 0.5) return truncated.slice(0, lastSentence + 1);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > max * 0.5) return truncated.slice(0, lastSpace) + '...';
  return truncated + '...';
}
