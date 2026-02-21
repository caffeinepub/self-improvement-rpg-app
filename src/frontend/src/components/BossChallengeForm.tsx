import React, { useState, useEffect } from 'react';
import { BossChallenge } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BossChallengeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (challenge: Omit<BossChallenge, 'id' | 'isCompleted'>) => void;
  editChallenge?: BossChallenge | null;
}

export function BossChallengeForm({ open, onClose, onSubmit, editChallenge }: BossChallengeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(500);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [deadline, setDeadline] = useState('');
  const [rewardTitle, setRewardTitle] = useState('');

  useEffect(() => {
    if (editChallenge) {
      setTitle(editChallenge.title);
      setDescription(editChallenge.description);
      setXpReward(editChallenge.xpReward);
      setFrequency(editChallenge.frequency);
      setDeadline(editChallenge.deadline.split('T')[0]);
      setRewardTitle(editChallenge.rewardTitle);
    } else {
      setTitle('');
      setDescription('');
      setXpReward(500);
      setFrequency('weekly');
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setDeadline(nextWeek.toISOString().split('T')[0]);
      setRewardTitle('');
    }
  }, [editChallenge, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      xpReward,
      frequency,
      deadline: new Date(deadline).toISOString(),
      rewardTitle,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-red-500/30 bg-rpg-darker sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-red-400">
            {editChallenge ? 'Edit Boss Challenge' : 'Create Boss Challenge'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Challenge Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete a marathon"
              required
              className="border-red-500/30 bg-rpg-dark"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this epic challenge..."
              className="border-red-500/30 bg-rpg-dark"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="xp">XP Reward</Label>
              <Input
                id="xp"
                type="number"
                value={xpReward}
                onChange={(e) => setXpReward(Number(e.target.value))}
                min={100}
                max={5000}
                required
                className="border-red-500/30 bg-rpg-dark"
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as 'weekly' | 'monthly')}>
                <SelectTrigger className="border-red-500/30 bg-rpg-dark">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="border-red-500/30 bg-rpg-dark"
            />
          </div>
          <div>
            <Label htmlFor="rewardTitle">Reward Title</Label>
            <Input
              id="rewardTitle"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
              placeholder="e.g., Marathon Master"
              required
              className="border-red-500/30 bg-rpg-dark"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 text-white hover:bg-red-500">
              {editChallenge ? 'Update Challenge' : 'Create Challenge'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
