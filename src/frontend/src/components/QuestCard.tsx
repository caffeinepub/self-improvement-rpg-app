import React, { useState } from 'react';
import { Quest } from '../types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
  onEdit: (quest: Quest) => void;
  onDelete: (id: string) => void;
  streakMultiplier?: number;
}

export function QuestCard({ quest, onComplete, onEdit, onDelete, streakMultiplier = 1 }: QuestCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const effectiveXP = Math.floor(quest.xpReward * streakMultiplier);

  return (
    <div
      className={cn(
        'group relative rounded-lg border-2 bg-rpg-darker p-4 transition-all duration-200',
        quest.isCompleted
          ? 'border-green-500/30 bg-green-950/20'
          : 'border-rpg-gold/30 hover:border-rpg-gold/60 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={quest.isCompleted}
          onCheckedChange={() => !quest.isCompleted && onComplete(quest.id)}
          disabled={quest.isCompleted}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3
              className={cn(
                'text-lg font-semibold',
                quest.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
              )}
            >
              {quest.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-rpg-gold/50 text-rpg-gold">
                <Trophy className="mr-1 h-3 w-3" />
                {effectiveXP} XP
                {streakMultiplier > 1 && (
                  <span className="ml-1 text-xs">({streakMultiplier}x)</span>
                )}
              </Badge>
            </div>
          </div>
          {quest.description && (
            <p className="mb-2 text-sm text-muted-foreground">{quest.description}</p>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {quest.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {quest.frequency}
            </Badge>
          </div>
        </div>
        {!quest.isCompleted && isHovered && (
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(quest)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(quest.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
