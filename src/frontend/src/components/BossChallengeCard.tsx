import React from 'react';
import { BossChallenge } from '../types';
import { Button } from '@/components/ui/button';
import { Skull, Trophy, Calendar, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BossChallengeCardProps {
  challenge: BossChallenge;
  onComplete: (id: string) => void;
  onEdit: (challenge: BossChallenge) => void;
  onDelete: (id: string) => void;
}

export function BossChallengeCard({ challenge, onComplete, onEdit, onDelete }: BossChallengeCardProps) {
  const deadline = new Date(challenge.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && !challenge.isCompleted;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-300',
        challenge.isCompleted
          ? 'border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-rpg-darker'
          : 'border-red-500/50 bg-gradient-to-br from-red-950/30 to-rpg-darker hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]'
      )}
    >
      <div className="absolute right-4 top-4">
        <Skull className={cn('h-12 w-12 opacity-20', challenge.isCompleted ? 'text-purple-500' : 'text-red-500')} />
      </div>

      <div className="relative">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={cn(
                'mb-2 text-2xl font-bold',
                challenge.isCompleted ? 'text-purple-400 line-through' : 'text-red-400'
              )}
            >
              {challenge.title}
            </h3>
            {challenge.description && (
              <p className="mb-3 text-sm text-muted-foreground">{challenge.description}</p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-rpg-gold/50 text-rpg-gold">
            <Trophy className="mr-1 h-3 w-3" />
            {challenge.xpReward} XP
          </Badge>
          <Badge variant="outline" className={cn(isOverdue ? 'border-red-500 text-red-400' : '')}>
            <Calendar className="mr-1 h-3 w-3" />
            {challenge.isCompleted
              ? 'Completed'
              : isOverdue
                ? `${Math.abs(daysLeft)} days overdue`
                : `${daysLeft} days left`}
          </Badge>
          <Badge variant="secondary">{challenge.frequency}</Badge>
        </div>

        {challenge.rewardTitle && (
          <div className="mb-4 rounded-md border border-rpg-gold/30 bg-rpg-gold/10 p-3">
            <p className="text-sm text-muted-foreground">Reward Title:</p>
            <p className="font-semibold text-rpg-gold">{challenge.rewardTitle}</p>
          </div>
        )}

        <div className="flex gap-2">
          {!challenge.isCompleted && (
            <>
              <Button
                onClick={() => onComplete(challenge.id)}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
              >
                Complete Challenge
              </Button>
              <Button size="icon" variant="outline" onClick={() => onEdit(challenge)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => onDelete(challenge.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          {challenge.isCompleted && (
            <div className="flex-1 rounded-md bg-purple-500/20 p-3 text-center">
              <p className="font-semibold text-purple-400">Challenge Completed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
