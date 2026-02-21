import React from 'react';
import { useApp } from '../contexts/AppContext';
import { RankDisplay } from '../components/RankDisplay';
import { AchievementBadge } from '../components/AchievementBadge';
import { StatisticsPanel } from '../components/StatisticsPanel';
import { SKILLS } from '../data/skills';

export function Profile() {
  const { progress } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-rpg-gold">Character Profile</h2>
        <p className="text-muted-foreground">Your complete character sheet and achievements</p>
      </div>

      <RankDisplay totalXP={progress.totalXP} currentRank={progress.currentRank} />

      <div>
        <h3 className="mb-4 text-2xl font-bold text-foreground">Skill Levels</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {progress.skills.map((skill) => {
            const config = SKILLS.find((s) => s.category === skill.category);
            return (
              <div
                key={skill.category}
                className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {config && (
                      <img src={config.iconPath} alt={config.name} className="h-10 w-10" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{skill.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {skill.totalXP.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-rpg-gold">Lv {skill.currentLevel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-bold text-foreground">Statistics</h3>
        <StatisticsPanel progress={progress} />
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-bold text-foreground">Achievements</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {progress.achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}
