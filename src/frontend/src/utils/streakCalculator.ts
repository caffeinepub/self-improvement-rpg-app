import { StreakData } from '../types';

export function calculateStreakMultiplier(streak: number): number {
  if (streak >= 30) return 3;
  if (streak >= 14) return 2;
  if (streak >= 7) return 1.5;
  return 1;
}

export function isStreakBroken(lastCompletionDate: string | null): boolean {
  if (!lastCompletionDate) return false;

  const last = new Date(lastCompletionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 1;
}

export function shouldIncrementStreak(lastCompletionDate: string | null): boolean {
  if (!lastCompletionDate) return true;

  const last = new Date(lastCompletionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  return today.getTime() !== last.getTime();
}

export function initializeStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
    multiplier: 1,
  };
}
