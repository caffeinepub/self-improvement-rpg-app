import { RANKS } from '../data/ranks';
import { Rank } from '../types';

export function getCurrentRank(xp: number): Rank {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].xpThreshold) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getNextRank(currentRankId: number): Rank | null {
  if (currentRankId >= RANKS.length - 1) {
    return null;
  }
  return RANKS[currentRankId + 1];
}

export function getProgressToNextRank(xp: number): {
  current: number;
  required: number;
  percentage: number;
} {
  const currentRank = getCurrentRank(xp);
  const nextRank = getNextRank(currentRank.id);

  if (!nextRank) {
    return { current: 0, required: 0, percentage: 100 };
  }

  const current = xp - currentRank.xpThreshold;
  const required = nextRank.xpThreshold - currentRank.xpThreshold;
  const percentage = Math.min((current / required) * 100, 100);

  return { current, required, percentage };
}
