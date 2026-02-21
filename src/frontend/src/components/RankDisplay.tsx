import React from 'react';
import { RANKS } from '../data/ranks';
import { getProgressToNextRank } from '../utils/rankCalculator';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/lib/utils';

interface RankDisplayProps {
  totalXP: number;
  currentRank: number;
  compact?: boolean;
  className?: string;
}

export function RankDisplay({ totalXP, currentRank, compact = false, className }: RankDisplayProps) {
  const rank = RANKS[currentRank];
  const progress = getProgressToNextRank(totalXP);
  const isMaxRank = currentRank === RANKS.length - 1;

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <img
          src={rank.badgeImage}
          alt={rank.name}
          className="h-12 w-12 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
        />
        <div>
          <h3 className="text-lg font-bold text-rpg-gold">{rank.name}</h3>
          <p className="text-sm text-muted-foreground">{totalXP.toLocaleString()} XP</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-6 shadow-xl', className)}>
      <div className="mb-4 flex items-center gap-4">
        <img
          src={rank.badgeImage}
          alt={rank.name}
          className="h-24 w-24 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] transition-transform hover:scale-110"
        />
        <div className="flex-1">
          <h2 className="mb-1 text-3xl font-bold text-rpg-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
            {rank.name}
          </h2>
          <p className="text-lg text-muted-foreground">
            Total XP: <span className="font-semibold text-foreground">{totalXP.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {!isMaxRank && (
        <div>
          <ProgressBar
            current={progress.current}
            max={progress.required}
            label={`Progress to ${RANKS[currentRank + 1].name}`}
            showNumbers={true}
          />
        </div>
      )}

      {isMaxRank && (
        <div className="rounded-md border border-rpg-gold/50 bg-rpg-gold/10 p-3 text-center">
          <p className="font-semibold text-rpg-gold">Maximum Rank Achieved!</p>
        </div>
      )}
    </div>
  );
}
