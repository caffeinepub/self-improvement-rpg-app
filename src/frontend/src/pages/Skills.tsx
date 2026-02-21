import React from 'react';
import { useApp } from '../contexts/AppContext';
import { SkillTree } from '../components/SkillTree';

export function Skills() {
  const { progress } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-rpg-gold">Skill Trees</h2>
        <p className="text-muted-foreground">
          Level up your skills by completing quests in each category
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {progress.skills.map((skill) => (
          <SkillTree key={skill.category} skill={skill} />
        ))}
      </div>
    </div>
  );
}
