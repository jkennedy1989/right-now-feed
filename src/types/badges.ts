export type BadgeType = 'saved' | 'friend' | 'award' | 'trending' | 'topRated' | 'new';

export interface ProofBadge {
  type: BadgeType;
  emoji: string;
  label: string;
  detail?: string;
  friendInitial?: string;
  friendAvatar?: string;
}
