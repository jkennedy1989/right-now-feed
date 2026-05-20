import { Business } from '@/types';

const DEDUP_DISTANCE_KM = 0.05; // 50 meters

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/^the\s+/, '').replace(/['']/g, '').trim();
}

export function mergePlaces(curated: Business[], dynamic: Business[]): Business[] {
  const curatedNames = new Map<string, Business>();
  for (const c of curated) {
    curatedNames.set(normalizeName(c.name), c);
  }

  const deduped: Business[] = [...curated];

  for (const d of dynamic) {
    const dName = normalizeName(d.name);

    if (curatedNames.has(dName)) continue;

    const isNearCurated = curated.some((c) => {
      if (normalizeName(c.name) !== dName) return false;
      return haversineKm(c.location.lat, c.location.lng, d.location.lat, d.location.lng) < DEDUP_DISTANCE_KM;
    });

    if (isNearCurated) continue;

    const alreadyAdded = deduped.some((existing) =>
      existing.source === 'google' && normalizeName(existing.name) === dName &&
      haversineKm(existing.location.lat, existing.location.lng, d.location.lat, d.location.lng) < DEDUP_DISTANCE_KM
    );

    if (!alreadyAdded) {
      deduped.push(d);
    }
  }

  return deduped;
}
