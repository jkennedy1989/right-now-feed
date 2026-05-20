import { nanoid } from 'nanoid';

export interface SharedList {
  id: string;
  creatorName: string;
  city: string;
  businessIds: string[];
  createdAt: string;
}

export interface Vote {
  listId: string;
  businessId: string;
  voterName: string;
}

const lists = new Map<string, SharedList>();
const votes: Vote[] = [];

export async function createSharedList(creatorName: string, city: string, businessIds: string[]): Promise<SharedList> {
  const id = nanoid(8);
  const list: SharedList = {
    id,
    creatorName,
    city,
    businessIds,
    createdAt: new Date().toISOString(),
  };
  lists.set(id, list);
  return list;
}

export async function getSharedList(id: string): Promise<SharedList | null> {
  return lists.get(id) || null;
}

export async function addVote(listId: string, businessId: string, voterName: string): Promise<void> {
  const existing = votes.find(
    (v) => v.listId === listId && v.businessId === businessId && v.voterName === voterName
  );
  if (!existing) {
    votes.push({ listId, businessId, voterName });
  }
}

export async function getVotes(listId: string): Promise<Record<string, number>> {
  const listVotes = votes.filter((v) => v.listId === listId);
  const counts: Record<string, number> = {};
  listVotes.forEach((v) => {
    counts[v.businessId] = (counts[v.businessId] || 0) + 1;
  });
  return counts;
}
