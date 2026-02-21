// Core types for the Self-Improvement RPG App

export enum SkillCategory {
  Fitness = 'Fitness',
  Mind = 'Mind',
  Social = 'Social',
  Finance = 'Finance',
  Creativity = 'Creativity',
}

export enum QuestFrequency {
  Daily = 'daily',
  Weekly = 'weekly',
}

export interface Rank {
  id: number;
  name: string;
  xpThreshold: number;
  badgeImage: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: SkillCategory;
  frequency: QuestFrequency;
  isCompleted: boolean;
  createdDate: string;
  lastCompletedDate?: string;
}

export interface BossChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  frequency: 'weekly' | 'monthly';
  deadline: string;
  isCompleted: boolean;
  rewardTitle: string;
  completionDate?: string;
}

export interface SkillProgress {
  category: SkillCategory;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  criteria: string;
  isUnlocked: boolean;
  unlockedDate?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
  multiplier: number;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'rank' | 'achievement' | 'streak' | 'skill' | 'boss';
}

export type GoalCategory = 'Fitness' | 'Mental Health' | 'Productivity' | 'Finance' | 'Social Life' | 'Learning' | 'Nutrition' | 'Sleep';
export type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
export type MentalWellness = 'Struggling' | 'Getting By' | 'Pretty Good' | 'Thriving';
export type PreferredTime = 'Morning' | 'Afternoon' | 'Evening' | 'No Preference';
export type DifficultyMode = 'Easy Mode' | 'Balanced' | 'Hard Mode';

export interface OnboardingData {
  characterName: string;
  selectedGoals: GoalCategory[];
  activityLevel: ActivityLevel;
  mentalWellness: MentalWellness;
  preferredTime: PreferredTime;
  difficultyMode: DifficultyMode;
}

export interface UserProgress {
  totalXP: number;
  currentRank: number;
  quests: Quest[];
  bossChallenges: BossChallenge[];
  skills: SkillProgress[];
  achievements: Achievement[];
  streak: StreakData;
  milestones: Milestone[];
  earnedTitles: string[];
  createdDate: string;
  onboardingCompleted: boolean;
  onboardingData: OnboardingData | null;
}
