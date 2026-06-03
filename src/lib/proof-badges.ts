import { Business, ProofBadge } from '@/types';
import { CityId } from '@/data/city-meta';
import { YELP_TOP_100, JAMES_BEARD, TOP_50_BEST, MOCK_FRIENDS } from '@/data/proof-badges-data';

function stableHash(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function nameMatches(businessName: string, listName: string): boolean {
  const a = businessName.toLowerCase().trim();
  const b = listName.toLowerCase().trim();
  return a.includes(b) || b.includes(a);
}

function getAwardBadge(place: Business, city: CityId): ProofBadge | null {
  if (place.michelinStatus) {
    const status = place.michelinStatus.toLowerCase();
    if (status.includes('star')) {
      return { type: 'award', emoji: '🏆', label: 'Michelin', detail: place.michelinStatus };
    }
    if (status.includes('bib gourmand')) {
      return { type: 'award', emoji: '🏆', label: 'Bib Gourmand', detail: 'Michelin Bib Gourmand' };
    }
  }

  if (TOP_50_BEST.some((n) => nameMatches(place.name, n))) {
    return { type: 'award', emoji: '🏆', label: "World's 50 Best", detail: "Featured in World's 50 Best" };
  }

  const jbEntry = JAMES_BEARD[city]?.find((j) => nameMatches(place.name, j.name));
  if (jbEntry) {
    return { type: 'award', emoji: '🏆', label: 'James Beard', detail: jbEntry.award };
  }

  return null;
}

function isTopRated(place: Business, city: CityId): boolean {
  const list = YELP_TOP_100[city];
  if (!list) return false;
  return list.some((n) => nameMatches(place.name, n));
}

function isNewOpening(place: Business): boolean {
  if (!place.buzzFactor) return false;
  const buzz = place.buzzFactor.toLowerCase();
  return buzz.includes('new addition') || buzz.includes('new stars') || buzz.includes('2026');
}

export function computeBadgeMap(
  places: Business[],
  shortlistIds: string[],
  city: CityId
): Map<string, ProofBadge> {
  const badgeMap = new Map<string, ProofBadge>();
  const shortlistSet = new Set(shortlistIds);

  const assignedIds = new Set<string>();

  // Pre-assign saved and award badges (deterministic, high priority)
  for (const place of places) {
    if (shortlistSet.has(place.id)) {
      badgeMap.set(place.id, { type: 'saved', emoji: '🔖', label: 'Saved', detail: 'On your shortlist' });
      assignedIds.add(place.id);
    } else {
      const award = getAwardBadge(place, city);
      if (award) {
        badgeMap.set(place.id, award);
        assignedIds.add(place.id);
      }
    }
  }

  // Friend candidates: 2 businesses not already assigned
  const unassigned = places.filter((p) => !assignedIds.has(p.id));
  const friendCandidates = [...unassigned]
    .sort((a, b) => stableHash(a.id) - stableHash(b.id))
    .slice(0, 2);

  const FRIEND_ACTIONS = [
    (name: string) => ({ label: `${name} added to "Been here"`, detail: `${name} added to their "Been here" list` }),
    (name: string) => ({ label: `${name} added to "Want to go"`, detail: `${name} added to their "Want to go" list` }),
    (name: string) => ({ label: `${name} reviewed this`, detail: `${name} reviewed this` }),
  ];

  for (let i = 0; i < friendCandidates.length; i++) {
    const place = friendCandidates[i];
    const friend = MOCK_FRIENDS[i % MOCK_FRIENDS.length];
    const actionIndex = stableHash(place.id + 'friend') % FRIEND_ACTIONS.length;
    const action = FRIEND_ACTIONS[actionIndex](friend.name);
    badgeMap.set(place.id, {
      type: 'friend',
      emoji: '👤',
      label: action.label,
      detail: action.detail,
      friendInitial: friend.initial,
      friendAvatar: friend.avatar,
    });
    assignedIds.add(place.id);
  }

  // Trending candidate: 1 business not already assigned
  const stillUnassigned = places.filter((p) => !assignedIds.has(p.id));
  const trendingCandidate = [...stillUnassigned]
    .sort((a, b) => stableHash(b.id + 'trend') - stableHash(a.id + 'trend'))
    .slice(0, 1);

  for (const place of trendingCandidate) {
    badgeMap.set(place.id, { type: 'trending', emoji: '🔥', label: 'Trending', detail: 'Lots of recent buzz' });
    assignedIds.add(place.id);
  }

  // Top Rated and New for remaining
  for (const place of places) {
    if (assignedIds.has(place.id)) continue;

    if (isTopRated(place, city)) {
      badgeMap.set(place.id, { type: 'topRated', emoji: '⭐', label: 'Top 100', detail: "Featured in Yelp's Top 100" });
      assignedIds.add(place.id);
      continue;
    }

    if (isNewOpening(place)) {
      badgeMap.set(place.id, { type: 'new', emoji: '✨', label: 'New', detail: 'Recently opened' });
      assignedIds.add(place.id);
    }
  }

  return badgeMap;
}
