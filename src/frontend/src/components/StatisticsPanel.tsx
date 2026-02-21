import React from 'react';
import { UserProgress } from '../types';
import { Trophy, Flame, Skull, Calendar } from 'lucide-react';

interface StatisticsPanelProps {
  progress: UserProgress;
}

export function StatisticsPanel({ progress }: StatisticsPanelProps) {
  const completedQuests = progress.quests.filter((q) => q.isCompleted).length;
  const completedBosses = progress.bossChallenges.filter((b) => b.isCompleted).length;
  const daysActive = Math.floor(
    (new Date().getTime() - new Date(progress.createdDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = [
    {
      label: 'Quests Completed',
      value: completedQuests,
      icon: Trophy,
      color: 'text-rpg-gold',
    },
    {
      label: 'Current Streak',
      value: `${progress.streak.currentStreak} days`,
      icon: Flame,
      color: 'text-orange-400',
    },
    {
      label: 'Longest Streak',
      value: `${progress.streak.longestStreak} days`,
      icon: Flame,
      color: 'text-yellow-400',
    },
    {
      label: 'Bosses Defeated',
      value: completedBosses,
      icon: Skull,
      color: 'text-red-400',
    },
    {
      label: 'Days Active',
      value: daysActive,
      icon: Calendar,
      color: 'text-blue-400',
    },
    {
      label: 'Total XP',
      value: progress.totalXP.toLocaleString(),
      icon: Trophy,
      color: 'text-rpg-gold',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-4 transition-all hover:border-rpg-gold/60"
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className={`h-5 w-5 ${stat.color}`} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
