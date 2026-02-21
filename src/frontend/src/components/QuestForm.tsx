import React, { useState, useEffect } from 'react';
import { Quest, SkillCategory, QuestFrequency } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quest: Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>) => void;
  editQuest?: Quest | null;
}

export function QuestForm({ open, onClose, onSubmit, editQuest }: QuestFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(50);
  const [category, setCategory] = useState<SkillCategory>(SkillCategory.Fitness);
  const [frequency, setFrequency] = useState<QuestFrequency>(QuestFrequency.Daily);

  useEffect(() => {
    if (editQuest) {
      setTitle(editQuest.title);
      setDescription(editQuest.description);
      setXpReward(editQuest.xpReward);
      setCategory(editQuest.category);
      setFrequency(editQuest.frequency);
    } else {
      setTitle('');
      setDescription('');
      setXpReward(50);
      setCategory(SkillCategory.Fitness);
      setFrequency(QuestFrequency.Daily);
    }
  }, [editQuest, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      xpReward,
      category,
      frequency,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-rpg-gold/30 bg-rpg-darker sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-rpg-gold">
            {editQuest ? 'Edit Quest' : 'Create New Quest'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Quest Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Exercise for 30 minutes"
              required
              className="border-rpg-gold/30 bg-rpg-dark"
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this quest..."
              className="border-rpg-gold/30 bg-rpg-dark"
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
                min={10}
                max={500}
                required
                className="border-rpg-gold/30 bg-rpg-dark"
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as QuestFrequency)}>
                <SelectTrigger className="border-rpg-gold/30 bg-rpg-dark">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={QuestFrequency.Daily}>Daily</SelectItem>
                  <SelectItem value={QuestFrequency.Weekly}>Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="category">Skill Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as SkillCategory)}>
              <SelectTrigger className="border-rpg-gold/30 bg-rpg-dark">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SkillCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-rpg-gold text-rpg-darker hover:bg-rpg-gold-light">
              {editQuest ? 'Update Quest' : 'Create Quest'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
