import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Target, Activity, Brain, Clock, Zap } from 'lucide-react';
import { OnboardingData, GoalCategory, ActivityLevel, MentalWellness, PreferredTime, DifficultyMode } from '../types';
import { useApp } from '../contexts/AppContext';
import { generatePersonalizedQuests } from '../utils/questGenerator';

const GOAL_OPTIONS: { value: GoalCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'Fitness', label: 'Fitness & Health', icon: <Activity className="w-5 h-5" /> },
  { value: 'Mental Health', label: 'Mental Wellness', icon: <Brain className="w-5 h-5" /> },
  { value: 'Productivity', label: 'Productivity', icon: <Target className="w-5 h-5" /> },
  { value: 'Finance', label: 'Financial Goals', icon: <Zap className="w-5 h-5" /> },
  { value: 'Social Life', label: 'Social Life', icon: <Sparkles className="w-5 h-5" /> },
  { value: 'Learning', label: 'Learning & Skills', icon: <Target className="w-5 h-5" /> },
  { value: 'Nutrition', label: 'Nutrition', icon: <Activity className="w-5 h-5" /> },
  { value: 'Sleep', label: 'Sleep Quality', icon: <Clock className="w-5 h-5" /> },
];

export function OnboardingSurvey() {
  const { completeOnboarding, addQuest } = useApp();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    characterName: '',
    selectedGoals: [],
    activityLevel: 'Moderately Active',
    mentalWellness: 'Pretty Good',
    preferredTime: 'Morning',
    difficultyMode: 'Balanced',
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGoalToggle = (goal: GoalCategory) => {
    setFormData((prev) => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter((g) => g !== goal)
        : [...prev.selectedGoals, goal],
    }));
  };

  const handleComplete = async () => {
    try {
      setIsGenerating(true);
      
      // Generate personalized quests based on survey responses
      const generatedQuests = generatePersonalizedQuests(formData);
      
      // Add all generated quests
      generatedQuests.forEach((quest) => {
        addQuest(quest);
      });
      
      // Complete onboarding
      completeOnboarding(formData);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Failed to complete onboarding. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.characterName.trim().length > 0;
      case 2:
        return formData.selectedGoals.length > 0;
      case 3:
      case 4:
      case 5:
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-purple-300">Character Creation</span>
            <span className="text-sm font-medium text-purple-300">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {step === 1 && 'Choose Your Name'}
              {step === 2 && 'Select Your Goals'}
              {step === 3 && 'Activity Level'}
              {step === 4 && 'Mental Wellness'}
              {step === 5 && 'Preferred Time'}
              {step === 6 && 'Difficulty Mode'}
            </CardTitle>
            <CardDescription className="text-slate-300">
              {step === 1 && 'What shall we call you, adventurer?'}
              {step === 2 && 'Choose the areas you want to focus on (select at least one)'}
              {step === 3 && 'How active are you currently?'}
              {step === 4 && 'How would you describe your current mental state?'}
              {step === 5 && 'When do you prefer to tackle your quests?'}
              {step === 6 && 'Choose your challenge level'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Character Name */}
            {step === 1 && (
              <div className="space-y-4">
                <Label htmlFor="characterName" className="text-purple-300 text-lg">
                  Character Name
                </Label>
                <Input
                  id="characterName"
                  value={formData.characterName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, characterName: e.target.value }))
                  }
                  placeholder="Enter your character name..."
                  className="bg-slate-800 border-purple-500/30 text-white placeholder:text-slate-500 text-lg py-6"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Goal Selection */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOAL_OPTIONS.map((goal) => (
                  <div
                    key={goal.value}
                    onClick={() => handleGoalToggle(goal.value)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.selectedGoals.includes(goal.value)
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                    }`}
                  >
                    <Checkbox
                      checked={formData.selectedGoals.includes(goal.value)}
                      onCheckedChange={() => handleGoalToggle(goal.value)}
                      className="border-purple-500"
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="text-purple-400">{goal.icon}</div>
                      <span className="text-white font-medium">{goal.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Activity Level */}
            {step === 3 && (
              <RadioGroup
                value={formData.activityLevel}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, activityLevel: value as ActivityLevel }))
                }
                className="space-y-3"
              >
                {[
                  { value: 'Sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                  { value: 'Lightly Active', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                  { value: 'Moderately Active', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                  { value: 'Very Active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.activityLevel === option.value
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, activityLevel: option.value as ActivityLevel }))
                    }
                  >
                    <RadioGroupItem value={option.value} className="border-purple-500" />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-slate-400 text-sm">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Step 4: Mental Wellness */}
            {step === 4 && (
              <RadioGroup
                value={formData.mentalWellness}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, mentalWellness: value as MentalWellness }))
                }
                className="space-y-3"
              >
                {[
                  { value: 'Struggling', label: 'Struggling', desc: 'Need gentle, supportive tasks' },
                  { value: 'Getting By', label: 'Getting By', desc: 'Managing day to day' },
                  { value: 'Pretty Good', label: 'Pretty Good', desc: 'Feeling stable and ready' },
                  { value: 'Thriving', label: 'Thriving', desc: 'Energized and motivated' },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.mentalWellness === option.value
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, mentalWellness: option.value as MentalWellness }))
                    }
                  >
                    <RadioGroupItem value={option.value} className="border-purple-500" />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-slate-400 text-sm">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Step 5: Preferred Time */}
            {step === 5 && (
              <RadioGroup
                value={formData.preferredTime}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, preferredTime: value as PreferredTime }))
                }
                className="space-y-3"
              >
                {[
                  { value: 'Morning', label: 'Morning', desc: 'Start the day strong' },
                  { value: 'Afternoon', label: 'Afternoon', desc: 'Midday momentum' },
                  { value: 'Evening', label: 'Evening', desc: 'Wind down with purpose' },
                  { value: 'No Preference', label: 'Flexible', desc: 'Anytime works' },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.preferredTime === option.value
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, preferredTime: option.value as PreferredTime }))
                    }
                  >
                    <RadioGroupItem value={option.value} className="border-purple-500" />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-slate-400 text-sm">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Step 6: Difficulty Mode */}
            {step === 6 && (
              <RadioGroup
                value={formData.difficultyMode}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, difficultyMode: value as DifficultyMode }))
                }
                className="space-y-3"
              >
                {[
                  { value: 'Easy Mode', label: 'Easy Mode', desc: 'Gentle progression, build confidence' },
                  { value: 'Balanced', label: 'Balanced', desc: 'Steady growth with variety' },
                  { value: 'Hard Mode', label: 'Hard Mode', desc: 'Maximum challenge, rapid growth' },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.difficultyMode === option.value
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                        : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, difficultyMode: option.value as DifficultyMode }))
                    }
                  >
                    <RadioGroupItem value={option.value} className="border-purple-500" />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-slate-400 text-sm">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                disabled={step === 1}
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              >
                Back
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed() || isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Quests...
                    </>
                  ) : (
                    'Begin Your Journey'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
