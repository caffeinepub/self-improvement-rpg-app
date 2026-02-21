import { SkillProgress, SkillCategory } from '../types';
import { getXPForLevel } from '../data/skills';

export function calculateSkillLevel(xp: number): number {
  let level = 1;
  let totalXPNeeded = 0;

  while (totalXPNeeded <= xp) {
    totalXPNeeded += getXPForLevel(level);
    if (totalXPNeeded <= xp) {
      level++;
    }
  }

  return level;
}

export function getXPForNextLevel(currentLevel: number): number {
  return getXPForLevel(currentLevel + 1);
}

export function getProgressToNextLevel(skill: SkillProgress): {
  current: number;
  required: number;
  percentage: number;
} {
  let totalXPForCurrentLevel = 0;
  for (let i = 1; i < skill.currentLevel; i++) {
    totalXPForCurrentLevel += getXPForLevel(i);
  }

  const current = skill.totalXP - totalXPForCurrentLevel;
  const required = getXPForLevel(skill.currentLevel);
  const percentage = Math.min((current / required) * 100, 100);

  return { current, required, percentage };
}

export function initializeSkills(): SkillProgress[] {
  return Object.values(SkillCategory).map((category) => ({
    category,
    currentLevel: 1,
    currentXP: 0,
    totalXP: 0,
  }));
}
