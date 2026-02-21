import React from 'react';
import { useApp } from '../contexts/AppContext';
import { RankDisplay } from '../components/RankDisplay';
import { StreakDisplay } from '../components/StreakDisplay';
import { QuestCard } from '../components/QuestCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';
import { Quest } from '../types';

export function Dashboard() {
  const { progress, completeQuest, updateQuest, deleteQuest } = useApp();

  // Get today's daily quests (not completed)
  const todayQuests = progress.quests.filter(
    (q) => q.frequency === 'daily' && !q.isCompleted
  );

  const handleEditQuest = (quest: Quest) => {
    // For now, we'll just pass the quest to updateQuest
    // In a full implementation, this would open an edit dialog
    updateQuest(quest.id, quest);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome, {progress.onboardingData?.characterName || 'Adventurer'}!
        </h1>
        <p className="text-slate-400">Complete your daily quests to gain XP and level up</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RankDisplay totalXP={progress.totalXP} currentRank={progress.currentRank} />
        <StreakDisplay streak={progress.streak} />
      </div>

      {/* Today's Quests */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Today's Quests</h2>
        </div>

        {todayQuests.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
            <p className="text-slate-400">
              No active quests for today. Visit the Quests page to create new ones!
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {todayQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={completeQuest}
                  onEdit={handleEditQuest}
                  onDelete={deleteQuest}
                  streakMultiplier={progress.streak.multiplier}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
