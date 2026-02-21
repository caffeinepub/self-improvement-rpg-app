import { SkillCategory } from '../types';

export interface SkillConfig {
  category: SkillCategory;
  name: string;
  description: string;
  iconPath: string;
  color: string;
}

export const SKILLS: SkillConfig[] = [
  {
    category: SkillCategory.Fitness,
    name: 'Fitness',
    description: 'Physical health and exercise',
    iconPath: '/assets/generated/skill-fitness.dim_64x64.png',
    color: 'from-red-500 to-orange-500',
  },
  {
    category: SkillCategory.Mind,
    name: 'Mind',
    description: 'Mental growth and learning',
    iconPath: '/assets/generated/skill-fitness.dim_64x64.png',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: SkillCategory.Social,
    name: 'Social',
    description: 'Relationships and connections',
    iconPath: '/assets/generated/skill-fitness.dim_64x64.png',
    color: 'from-green-500 to-emerald-500',
  },
  {
    category: SkillCategory.Finance,
    name: 'Finance',
    description: 'Wealth and financial wisdom',
    iconPath: '/assets/generated/skill-fitness.dim_64x64.png',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    category: SkillCategory.Creativity,
    name: 'Creativity',
    description: 'Art and creative expression',
    iconPath: '/assets/generated/skill-fitness.dim_64x64.png',
    color: 'from-purple-500 to-pink-500',
  },
];

export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}
