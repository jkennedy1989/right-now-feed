export interface Business {
  id: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  category: string;
  location: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  priceLevel: number;
  categories: string[];
  primaryCategory: string;
  address: string;
  distance?: number;
  isOpenNow: boolean;
  photoUrl: string | null;
  phone?: string;
  website?: string;
  hook: string;
  buzzFactor: string;
  michelinStatus: string | null;
  city: string;
  source: 'curated' | 'google';
  attributes: BusinessAttributes;
}

export interface BusinessAttributes {
  hasWifi?: boolean;
  hasPatio?: boolean;
  hasDelivery?: boolean;
  hasReservations?: boolean;
  hasWaitlist?: boolean;
  orderAhead?: boolean;
  avgTicketTime?: number;
  cuisineType?: string;
}

export interface DishItem {
  id: string;
  name: string;
  businessId: string;
  businessName: string;
  photoUrl: string;
  price?: number;
  category: string;
}
