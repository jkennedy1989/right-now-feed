export interface CuratedBusiness {
  id: string;
  name: string;
  neighborhood: string;
  cuisine: string;
  category: string;
  buzzFactor: string;
  michelinStatus: string | null;
  hook: string;
  address: string;
  city: 'la' | 'sf' | 'toronto';
  location: { lat: number; lng: number };
}
