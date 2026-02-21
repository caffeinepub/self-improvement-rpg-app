import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { RANKS } from '../data/ranks';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface LevelUpModalProps {
  rankId: number | null;
  onClose: () => void;
}

export function LevelUpModal({ rankId, onClose }: LevelUpModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (rankId !== null) {
      setShow(true);
    }
  }, [rankId]);

  if (rankId === null) return null;

  const rank = RANKS[rankId];

  return (
    <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-rpg-gold bg-gradient-to-br from-rpg-darker via-rpg-dark to-rpg-darker sm:max-w-[600px]">
        <div className="flex flex-col items-center py-8 text-center">
          <Sparkles className="mb-4 h-16 w-16 animate-pulse text-rpg-gold" />
          <h2 className="mb-2 text-4xl font-bold text-rpg-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
            RANK UP!
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">You have achieved a new rank</p>

          <div className="mb-6">
            <img
              src={rank.badgeImage}
              alt={rank.name}
              className="h-40 w-40 animate-pulse drop-shadow-[0_0_30px_rgba(255,215,0,1)]"
            />
          </div>

          <h3 className="mb-2 text-5xl font-bold text-rpg-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
            {rank.name}
          </h3>
          <p className="mb-8 text-muted-foreground">
            Required XP: {rank.xpThreshold.toLocaleString()}
          </p>

          <Button
            onClick={onClose}
            size="lg"
            className="bg-rpg-gold text-rpg-darker hover:bg-rpg-gold-light"
          >
            Continue Your Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
