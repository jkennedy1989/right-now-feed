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
