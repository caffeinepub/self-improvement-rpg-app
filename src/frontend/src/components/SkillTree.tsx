import React from 'react';
import { SkillProgress } from '../types';
import { SKILLS } from '../data/skills';
import { getProgressToNextLevel } from '../utils/skillCalculator';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/lib/utils';

interface SkillTreeProps {
  skill: SkillProgress;
  className?: string;
}

export function SkillTree({ skill, className }: SkillTreeProps) {
  const config = SKILLS.find((s) => s.category === skill.category);
  const progress = getProgressToNextLevel(skill);

  if (!config) return null;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-6 transition-all duration-300 hover:border-rpg-gold/60 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
        className
      )}
    >
      <div className="absolute right-4 top-4 opacity-10">
        <img src={config.iconPath} alt={config.name} className="h-24 w-24" />
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={config.iconPath}
            alt={config.name}
            className="h-16 w-16 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          />
          <div>
            <h3 className="text-2xl font-bold text-foreground">{config.name}</h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="text-3xl font-bold text-rpg-gold">{skill.currentLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total XP</p>
            <p className="text-xl font-semibold text-foreground">{skill.totalXP.toLocaleString()}</p>
          </div>
        </div>

        <ProgressBar
          current={progress.current}
          max={progress.required}
          label="Progress to Next Level"
          barClassName={`bg-gradient-to-r ${config.color}`}
        />

        <div className="mt-4 grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all',
                i < skill.currentLevel
                  ? `bg-gradient-to-r ${config.color} shadow-[0_0_5px_rgba(255,215,0,0.5)]`
                  : 'bg-rpg-dark'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
