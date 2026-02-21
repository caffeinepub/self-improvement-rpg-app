import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ProgressTimeline } from '../components/ProgressTimeline';
import { TrendingUp } from 'lucide-react';

export function Leaderboard() {
  const { progress } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold text-rpg-gold">
          <TrendingUp className="h-8 w-8" />
          Progress History
        </h2>
        <p className="text-muted-foreground">Track your journey and celebrate your milestones</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">Total Milestones</p>
          <p className="text-4xl font-bold text-rpg-gold">{progress.milestones.length}</p>
        </div>
        <div className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">Current Rank</p>
          <p className="text-4xl font-bold text-rpg-gold">{progress.currentRank + 1} / 10</p>
        </div>
        <div className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">Achievements Unlocked</p>
          <p className="text-4xl font-bold text-rpg-gold">
            {progress.achievements.filter((a) => a.isUnlocked).length} /{' '}
            {progress.achievements.length}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-bold text-foreground">Milestone Timeline</h3>
        <ProgressTimeline milestones={progress.milestones} />
      </div>
    </div>
  );
}
