import { Achievement, UserProgress } from '../types';

export function checkAchievements(
  progress: UserProgress,
  achievements: Achievement[]
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  achievements.forEach((achievement) => {
    if (achievement.isUnlocked) return;

    let shouldUnlock = false;

    switch (achievement.criteria) {
      case 'complete_1_quest':
        shouldUnlock = progress.quests.filter((q) => q.isCompleted).length >= 1;
        break;
      case 'streak_7':
        shouldUnlock = progress.streak.currentStreak >= 7;
        break;
      case 'streak_30':
        shouldUnlock = progress.streak.currentStreak >= 30;
        break;
      case 'skill_level_10':
        shouldUnlock = progress.skills.some((s) => s.currentLevel >= 10);
        break;
      case 'complete_1_boss':
        shouldUnlock = progress.bossChallenges.filter((b) => b.isCompleted).length >= 1;
        break;
      case 'all_skills_5':
        shouldUnlock = progress.skills.every((s) => s.currentLevel >= 5);
        break;
      case 'complete_100_quests':
        shouldUnlock = progress.quests.filter((q) => q.isCompleted).length >= 100;
        break;
      case 'rank_transcendent':
        shouldUnlock = progress.currentRank >= 9;
        break;
    }

    if (shouldUnlock) {
      achievement.isUnlocked = true;
      achievement.unlockedDate = new Date().toISOString();
      newlyUnlocked.push(achievement);
    }
  });

  return newlyUnlocked;
}
