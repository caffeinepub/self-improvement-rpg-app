import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress, Quest, BossChallenge, SkillCategory, Milestone, OnboardingData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initializeSkills, calculateSkillLevel } from '../utils/skillCalculator';
import { initializeStreak, isStreakBroken, shouldIncrementStreak, calculateStreakMultiplier } from '../utils/streakCalculator';
import { getCurrentRank } from '../utils/rankCalculator';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { checkAchievements } from '../utils/achievementChecker';

interface AppContextType {
  progress: UserProgress;
  addQuest: (quest: Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>) => void;
  updateQuest: (id: string, updates: Partial<Quest>) => void;
  deleteQuest: (id: string) => void;
  completeQuest: (id: string) => void;
  addBossChallenge: (challenge: Omit<BossChallenge, 'id' | 'isCompleted'>) => void;
  updateBossChallenge: (id: string, updates: Partial<BossChallenge>) => void;
  deleteBossChallenge: (id: string) => void;
  completeBossChallenge: (id: string) => void;
  newAchievements: string[];
  clearNewAchievements: () => void;
  levelUpRank: number | null;
  clearLevelUp: () => void;
  completeOnboarding: (data: OnboardingData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgress>('rpg-progress', {
    totalXP: 0,
    currentRank: 0,
    quests: [],
    bossChallenges: [],
    skills: initializeSkills(),
    achievements: INITIAL_ACHIEVEMENTS,
    streak: initializeStreak(),
    milestones: [],
    earnedTitles: [],
    createdDate: new Date().toISOString(),
    onboardingCompleted: false,
    onboardingData: null,
  });

  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [levelUpRank, setLevelUpRank] = useState<number | null>(null);

  // Check for broken streak on mount
  useEffect(() => {
    try {
      if (isStreakBroken(progress.streak.lastCompletionDate)) {
        setProgress((prev) => ({
          ...prev,
          streak: {
            ...prev.streak,
            currentStreak: 0,
            multiplier: 1,
          },
        }));
      }
    } catch (error) {
      console.error('Error checking streak on mount:', error);
    }
  }, []);

  const addMilestone = (title: string, description: string, type: Milestone['type']) => {
    try {
      const milestone: Milestone = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        title,
        description,
        type,
      };

      setProgress((prev) => ({
        ...prev,
        milestones: [milestone, ...prev.milestones],
      }));
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  const completeOnboarding = (data: OnboardingData) => {
    try {
      setProgress((prev) => ({
        ...prev,
        onboardingCompleted: true,
        onboardingData: data,
      }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  const addQuest = (quest: Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>) => {
    try {
      const newQuest: Quest = {
        ...quest,
        id: crypto.randomUUID(),
        createdDate: new Date().toISOString(),
        isCompleted: false,
      };

      setProgress((prev) => ({
        ...prev,
        quests: [...prev.quests, newQuest],
      }));
    } catch (error) {
      console.error('Error adding quest:', error);
      throw error;
    }
  };

  const updateQuest = (id: string, updates: Partial<Quest>) => {
    try {
      setProgress((prev) => ({
        ...prev,
        quests: prev.quests.map((q) => (q.id === id ? { ...q, ...updates } : q)),
      }));
    } catch (error) {
      console.error('Error updating quest:', error);
      throw error;
    }
  };

  const deleteQuest = (id: string) => {
    try {
      setProgress((prev) => ({
        ...prev,
        quests: prev.quests.filter((q) => q.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting quest:', error);
      throw error;
    }
  };

  const completeQuest = (id: string) => {
    try {
      setProgress((prev) => {
        const quest = prev.quests.find((q) => q.id === id);
        if (!quest || quest.isCompleted) return prev;

        // Update streak
        let newStreak = prev.streak;
        if (shouldIncrementStreak(prev.streak.lastCompletionDate)) {
          const incrementedStreak = prev.streak.currentStreak + 1;
          newStreak = {
            currentStreak: incrementedStreak,
            longestStreak: Math.max(incrementedStreak, prev.streak.longestStreak),
            lastCompletionDate: new Date().toISOString(),
            multiplier: calculateStreakMultiplier(incrementedStreak),
          };

          // Add streak milestone
          if (incrementedStreak === 7 || incrementedStreak === 30 || incrementedStreak % 50 === 0) {
            addMilestone(
              `${incrementedStreak}-Day Streak!`,
              `Maintained a ${incrementedStreak}-day streak`,
              'streak'
            );
          }
        }

        // Calculate XP with multiplier
        const xpGained = Math.floor(quest.xpReward * newStreak.multiplier);
        const newTotalXP = prev.totalXP + xpGained;

        // Update skill XP
        const updatedSkills = prev.skills.map((skill) => {
          if (skill.category === quest.category) {
            const newTotalXP = skill.totalXP + xpGained;
            return {
              ...skill,
              totalXP: newTotalXP,
              currentLevel: calculateSkillLevel(newTotalXP),
              currentXP: newTotalXP,
            };
          }
          return skill;
        });

        // Check for rank up
        const oldRank = getCurrentRank(prev.totalXP);
        const newRank = getCurrentRank(newTotalXP);
        if (newRank.id > oldRank.id) {
          setLevelUpRank(newRank.id);
          addMilestone(`Rank Up: ${newRank.name}`, `Achieved ${newRank.name} rank`, 'rank');
        }

        // Update quest
        const updatedQuests = prev.quests.map((q) =>
          q.id === id
            ? { ...q, isCompleted: true, lastCompletedDate: new Date().toISOString() }
            : q
        );

        const newProgress = {
          ...prev,
          totalXP: newTotalXP,
          currentRank: newRank.id,
          quests: updatedQuests,
          skills: updatedSkills,
          streak: newStreak,
        };

        // Check achievements
        const unlockedAchievements = checkAchievements(newProgress, newProgress.achievements);
        if (unlockedAchievements.length > 0) {
          setNewAchievements(unlockedAchievements.map((a) => a.id));
          unlockedAchievements.forEach((achievement) => {
            addMilestone(
              `Achievement: ${achievement.title}`,
              achievement.description,
              'achievement'
            );
          });
        }

        return newProgress;
      });
    } catch (error) {
      console.error('Error completing quest:', error);
      throw error;
    }
  };

  const addBossChallenge = (challenge: Omit<BossChallenge, 'id' | 'isCompleted'>) => {
    try {
      const newChallenge: BossChallenge = {
        ...challenge,
        id: Date.now().toString(),
        isCompleted: false,
      };

      setProgress((prev) => ({
        ...prev,
        bossChallenges: [...prev.bossChallenges, newChallenge],
      }));
    } catch (error) {
      console.error('Error adding boss challenge:', error);
      throw error;
    }
  };

  const updateBossChallenge = (id: string, updates: Partial<BossChallenge>) => {
    try {
      setProgress((prev) => ({
        ...prev,
        bossChallenges: prev.bossChallenges.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      }));
    } catch (error) {
      console.error('Error updating boss challenge:', error);
      throw error;
    }
  };

  const deleteBossChallenge = (id: string) => {
    try {
      setProgress((prev) => ({
        ...prev,
        bossChallenges: prev.bossChallenges.filter((b) => b.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting boss challenge:', error);
      throw error;
    }
  };

  const completeBossChallenge = (id: string) => {
    try {
      setProgress((prev) => {
        const challenge = prev.bossChallenges.find((b) => b.id === id);
        if (!challenge || challenge.isCompleted) return prev;

        const xpGained = challenge.xpReward;
        const newTotalXP = prev.totalXP + xpGained;

        // Check for rank up
        const oldRank = getCurrentRank(prev.totalXP);
        const newRank = getCurrentRank(newTotalXP);
        if (newRank.id > oldRank.id) {
          setLevelUpRank(newRank.id);
          addMilestone(`Rank Up: ${newRank.name}`, `Achieved ${newRank.name} rank`, 'rank');
        }

        // Update boss challenge
        const updatedChallenges = prev.bossChallenges.map((b) =>
          b.id === id ? { ...b, isCompleted: true } : b
        );

        // Add milestone for boss defeat
        addMilestone(
          `Boss Defeated: ${challenge.title}`,
          `Earned the title: ${challenge.rewardTitle}`,
          'boss'
        );

        const newProgress = {
          ...prev,
          totalXP: newTotalXP,
          currentRank: newRank.id,
          bossChallenges: updatedChallenges,
          earnedTitles: [...prev.earnedTitles, challenge.rewardTitle],
        };

        // Check achievements
        const unlockedAchievements = checkAchievements(newProgress, newProgress.achievements);
        if (unlockedAchievements.length > 0) {
          setNewAchievements(unlockedAchievements.map((a) => a.id));
          unlockedAchievements.forEach((achievement) => {
            addMilestone(
              `Achievement: ${achievement.title}`,
              achievement.description,
              'achievement'
            );
          });
        }

        return newProgress;
      });
    } catch (error) {
      console.error('Error completing boss challenge:', error);
      throw error;
    }
  };

  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  const clearLevelUp = () => {
    setLevelUpRank(null);
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        addQuest,
        updateQuest,
        deleteQuest,
        completeQuest,
        addBossChallenge,
        updateBossChallenge,
        deleteBossChallenge,
        completeBossChallenge,
        newAchievements,
        clearNewAchievements,
        levelUpRank,
        clearLevelUp,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
