import React from 'react';
import { Milestone } from '../types';
import { Trophy, Flame, Sword, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressTimelineProps {
  milestones: Milestone[];
}

export function ProgressTimeline({ milestones }: ProgressTimelineProps) {
  const getIcon = (type: Milestone['type']) => {
    switch (type) {
      case 'rank':
        return Star;
      case 'achievement':
        return Trophy;
      case 'streak':
        return Flame;
      case 'skill':
        return Sword;
      case 'boss':
        return Crown;
    }
  };

  const getColor = (type: Milestone['type']) => {
    switch (type) {
      case 'rank':
        return 'text-rpg-gold border-rpg-gold/50';
      case 'achievement':
        return 'text-purple-400 border-purple-500/50';
      case 'streak':
        return 'text-orange-400 border-orange-500/50';
      case 'skill':
        return 'text-blue-400 border-blue-500/50';
      case 'boss':
        return 'text-red-400 border-red-500/50';
    }
  };

  if (milestones.length === 0) {
    return (
      <div className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-8 text-center">
        <p className="text-muted-foreground">No milestones yet. Complete quests to start your journey!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => {
        const Icon = getIcon(milestone.type);
        const colorClass = getColor(milestone.type);

        return (
          <div
            key={milestone.id}
            className="group relative flex gap-4 rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-4 transition-all hover:border-rpg-gold/60"
          >
            <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2', colorClass)}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-start justify-between">
                <h4 className="font-bold text-foreground">{milestone.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(milestone.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{milestone.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
