import React from 'react';
import { Achievement } from '../types';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  achievement: Achievement;
  className?: string;
}

export function AchievementBadge({ achievement, className }: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border-2 p-4 transition-all duration-300',
        achievement.isUnlocked
          ? 'border-rpg-gold/50 bg-rpg-darker hover:border-rpg-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]'
          : 'border-gray-700 bg-rpg-darker/50 opacity-50',
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3">
          <img
            src={achievement.iconPath}
            alt={achievement.title}
            className={cn(
              'h-20 w-20 transition-transform group-hover:scale-110',
              achievement.isUnlocked
                ? 'drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]'
                : 'grayscale'
            )}
          />
          {!achievement.isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="h-8 w-8 text-gray-500" />
            </div>
          )}
        </div>
        <h4
          className={cn(
            'mb-1 font-bold',
            achievement.isUnlocked ? 'text-rpg-gold' : 'text-gray-500'
          )}
        >
          {achievement.title}
        </h4>
        <p className="text-xs text-muted-foreground">{achievement.description}</p>
        {achievement.isUnlocked && achievement.unlockedDate && (
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(achievement.unlockedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
