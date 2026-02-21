import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import { Trophy } from 'lucide-react';

export function AchievementNotification() {
  const { progress, newAchievements, clearNewAchievements } = useApp();

  useEffect(() => {
    if (newAchievements.length > 0) {
      newAchievements.forEach((achievementId) => {
        const achievement = progress.achievements.find((a) => a.id === achievementId);
        if (achievement) {
          toast.success(
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-rpg-gold" />
              <div>
                <p className="font-bold text-rpg-gold">Achievement Unlocked!</p>
                <p className="text-sm">{achievement.title}</p>
              </div>
            </div>,
            {
              duration: 5000,
            }
          );
        }
      });
      clearNewAchievements();
    }
  }, [newAchievements, progress.achievements, clearNewAchievements]);

  return null;
}
