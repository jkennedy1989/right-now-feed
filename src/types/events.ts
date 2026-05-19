export interface EventItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  timeStart: string;
  timeEnd: string;
  cost: number | null;
  category: string;
  businessId?: string;
  businessName?: string;
  location: { lat: number; lng: number };
  url: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  businessId: string;
  businessName: string;
  timeStart: number;
  timeEnd: number;
  url: string;
  location: { lat: number; lng: number };
}
