export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MarkerData {
  id: string;
  position: { lat: number; lng: number };
  emoji: string;
  color: string;
  category: string;
  title: string;
  isActive: boolean;
  pulse?: boolean;
}
