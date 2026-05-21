export interface FilterPill {
  id: string;
  label: string;
  emoji: string;
  category: string;
  searchParams: FilterSearchParams;
  priority: number;
  color: FilterColor;
}

export interface FilterSearchParams {
  type?: string;
  keyword?: string;
  openNow?: boolean;
  maxDistance?: number;
}

export interface FilterColor {
  bg: string;
  marker: string;
  text: string;
  border: string;
}

export type PrimarySignal = 'time' | 'weather' | 'day' | 'season' | 'events' | 'vibe';
export type SecondaryGroup = 'speed' | 'budget' | 'work' | 'transit' | 'healthy' | 'indulgent';

export interface PrimaryFilterPill {
  id: string;
  label: string;
  emoji: string;
  keyword: string;
  signal: PrimarySignal;
  secondaryGroups: SecondaryGroup[];
  isLlmGenerated?: boolean;
}

export interface SecondaryFilterPill {
  id: string;
  label: string;
  keyword: string;
  group: SecondaryGroup;
  isLlmGenerated?: boolean;
}
