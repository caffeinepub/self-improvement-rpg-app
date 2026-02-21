import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { QuestCard } from '../components/QuestCard';
import { QuestForm } from '../components/QuestForm';
import { BossChallengeCard } from '../components/BossChallengeCard';
import { BossChallengeForm } from '../components/BossChallengeForm';
import { Quest, BossChallenge, QuestFrequency, SkillCategory } from '../types';
import { Button } from '@/components/ui/button';
import { Plus, Skull } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Quests() {
  const {
    progress,
    addQuest,
    updateQuest,
    deleteQuest,
    completeQuest,
    addBossChallenge,
    updateBossChallenge,
    deleteBossChallenge,
    completeBossChallenge,
  } = useApp();

  const [questFormOpen, setQuestFormOpen] = useState(false);
  const [bossFormOpen, setBossFormOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [editingBoss, setEditingBoss] = useState<BossChallenge | null>(null);

  const handleEditQuest = (quest: Quest) => {
    setEditingQuest(quest);
    setQuestFormOpen(true);
  };

  const handleEditBoss = (boss: BossChallenge) => {
    setEditingBoss(boss);
    setBossFormOpen(true);
  };

  const handleQuestSubmit = (questData: Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>) => {
    if (editingQuest) {
      updateQuest(editingQuest.id, questData);
      setEditingQuest(null);
    } else {
      addQuest(questData);
    }
  };

  const handleBossSubmit = (bossData: Omit<BossChallenge, 'id' | 'isCompleted'>) => {
    if (editingBoss) {
      updateBossChallenge(editingBoss.id, bossData);
      setEditingBoss(null);
    } else {
      addBossChallenge(bossData);
    }
  };

  const activeQuests = progress.quests.filter((q) => !q.isCompleted);
  const completedQuests = progress.quests.filter((q) => q.isCompleted);
  const activeBosses = progress.bossChallenges.filter((b) => !b.isCompleted);
  const completedBosses = progress.bossChallenges.filter((b) => b.isCompleted);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-rpg-gold">Quests & Challenges</h2>
        <p className="text-muted-foreground">Manage your daily quests and epic boss challenges</p>
      </div>

      <Tabs defaultValue="quests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-rpg-darker">
          <TabsTrigger value="quests">Daily Quests</TabsTrigger>
          <TabsTrigger value="bosses">Boss Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="quests" className="space-y-4">
          <Button
            onClick={() => {
              setEditingQuest(null);
              setQuestFormOpen(true);
            }}
            className="bg-rpg-gold text-rpg-darker hover:bg-rpg-gold-light"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Quest
          </Button>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">Active Quests</h3>
            {activeQuests.length === 0 ? (
              <div className="rounded-lg border-2 border-rpg-gold/30 bg-rpg-darker p-8 text-center">
                <p className="text-muted-foreground">No active quests. Create one to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeQuests.map((quest) => (
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
            )}
          </div>

          {completedQuests.length > 0 && (
            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Completed Quests</h3>
              <div className="space-y-3">
                {completedQuests.slice(0, 5).map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={completeQuest}
                    onEdit={handleEditQuest}
                    onDelete={deleteQuest}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bosses" className="space-y-4">
          <Button
            onClick={() => {
              setEditingBoss(null);
              setBossFormOpen(true);
            }}
            className="bg-red-600 text-white hover:bg-red-500"
          >
            <Skull className="mr-2 h-4 w-4" />
            Create Boss Challenge
          </Button>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">Active Challenges</h3>
            {activeBosses.length === 0 ? (
              <div className="rounded-lg border-2 border-red-500/30 bg-rpg-darker p-8 text-center">
                <p className="text-muted-foreground">
                  No active boss challenges. Create an epic challenge!
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeBosses.map((boss) => (
                  <BossChallengeCard
                    key={boss.id}
                    challenge={boss}
                    onComplete={completeBossChallenge}
                    onEdit={handleEditBoss}
                    onDelete={deleteBossChallenge}
                  />
                ))}
              </div>
            )}
          </div>

          {completedBosses.length > 0 && (
            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Defeated Bosses</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {completedBosses.map((boss) => (
                  <BossChallengeCard
                    key={boss.id}
                    challenge={boss}
                    onComplete={completeBossChallenge}
                    onEdit={handleEditBoss}
                    onDelete={deleteBossChallenge}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <QuestForm
        open={questFormOpen}
        onClose={() => {
          setQuestFormOpen(false);
          setEditingQuest(null);
        }}
        onSubmit={handleQuestSubmit}
        editQuest={editingQuest}
      />

      <BossChallengeForm
        open={bossFormOpen}
        onClose={() => {
          setBossFormOpen(false);
          setEditingBoss(null);
        }}
        onSubmit={handleBossSubmit}
        editChallenge={editingBoss}
      />
    </div>
  );
}
