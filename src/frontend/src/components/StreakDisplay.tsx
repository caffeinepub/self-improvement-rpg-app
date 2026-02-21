import React from 'react';
import { Flame } from 'lucide-react';
import { StreakData } from '../types';
import { cn } from '@/lib/utils';

interface StreakDisplayProps {
  streak: StreakData;
  className?: string;
}

export function StreakDisplay({ streak, className }: StreakDisplayProps) {
  const getStreakColor = () => {
    if (streak.currentStreak >= 30) return 'text-purple-400';
    if (streak.currentStreak >= 14) return 'text-orange-400';
    if (streak.currentStreak >= 7) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getStreakGlow = () => {
    if (streak.currentStreak >= 30) return 'drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]';
    if (streak.currentStreak >= 14) return 'drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]';
    if (streak.currentStreak >= 7) return 'drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]';
    return '';
  };

  return (
    <div className={cn('rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-4 shadow-lg', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className={cn('h-8 w-8', getStreakColor(), getStreakGlow())} />
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-foreground">{streak.currentStreak} days</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">XP Multiplier</p>
          <p className="text-2xl font-bold text-rpg-gold">{streak.multiplier}x</p>
        </div>
      </div>
      {streak.longestStreak > 0 && (
        <div className="mt-3 border-t border-rpg-gold/20 pt-3">
          <p className="text-sm text-muted-foreground">
            Longest Streak: <span className="font-semibold text-foreground">{streak.longestStreak} days</span>
          </p>
        </div>
      )}
    </div>
  );
}
