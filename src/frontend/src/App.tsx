import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { TabNavigation, TabType } from './components/TabNavigation';
import { Dashboard } from './pages/Dashboard';
import { Skills } from './pages/Skills';
import { Quests } from './pages/Quests';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { OnboardingSurvey } from './pages/OnboardingSurvey';
import { LevelUpModal } from './components/LevelUpModal';
import { AchievementNotification } from './components/AchievementNotification';
import { Toaster } from '@/components/ui/sonner';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { progress, levelUpRank, clearLevelUp } = useApp();

  // Show onboarding survey if not completed
  if (!progress.onboardingCompleted) {
    return <OnboardingSurvey />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'skills':
        return <Skills />;
      case 'quests':
        return <Quests />;
      case 'profile':
        return <Profile />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-rpg-dark text-foreground">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(/assets/generated/app-background.dim_1920x1080.png)' }}
      />

      <div className="relative z-10">
        <header className="border-b-2 border-rpg-gold/30 bg-rpg-darker/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-center text-4xl font-bold text-rpg-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
              Self-Improvement RPG
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Level up your life, one quest at a time
            </p>
          </div>
        </header>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="container mx-auto px-4 py-8">{renderContent()}</main>

        <footer className="mt-16 border-t-2 border-rpg-gold/30 bg-rpg-darker/90 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rpg-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>

      <LevelUpModal rankId={levelUpRank} onClose={clearLevelUp} />
      <AchievementNotification />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
