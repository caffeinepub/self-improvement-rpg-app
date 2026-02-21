import React from 'react';
import { Home, Sword, ScrollText, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabType = 'dashboard' | 'skills' | 'quests' | 'profile' | 'leaderboard';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
  { id: 'skills' as TabType, label: 'Skills', icon: Sword },
  { id: 'quests' as TabType, label: 'Quests', icon: ScrollText },
  { id: 'profile' as TabType, label: 'Profile', icon: User },
  { id: 'leaderboard' as TabType, label: 'Progress', icon: Trophy },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="border-b-2 border-rpg-gold/30 bg-rpg-darker/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'group relative flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200',
                isActive
                  ? 'text-rpg-gold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-all',
                  isActive && 'drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]'
                )}
              />
              <span>{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rpg-gold to-transparent shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
