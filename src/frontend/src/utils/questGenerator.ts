import { Quest, QuestFrequency, OnboardingData, GoalCategory } from '../types';
import { questTemplates, QuestTemplate } from '../data/questTemplates';

export function generatePersonalizedQuests(onboardingData: OnboardingData): Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>[] {
  const { selectedGoals, difficultyMode, activityLevel, mentalWellness } = onboardingData;
  
  // Map difficulty mode to template tier
  const difficultyTier = difficultyMode === 'Easy Mode' ? 'easy' : difficultyMode === 'Balanced' ? 'balanced' : 'hard';
  
  // Adjust intensity based on activity level and mental wellness
  const shouldReduceIntensity = 
    activityLevel === 'Sedentary' || 
    mentalWellness === 'Struggling' || 
    mentalWellness === 'Getting By';
  
  const quests: Omit<Quest, 'id' | 'createdDate' | 'isCompleted'>[] = [];
  
  // Calculate how many quests per category (aim for 6-10 total)
  const questsPerCategory = selectedGoals.length <= 3 ? 2 : 1;
  const totalTargetQuests = Math.min(10, Math.max(6, selectedGoals.length * questsPerCategory));
  
  // Generate quests for each selected goal
  selectedGoals.forEach((goal: GoalCategory) => {
    const categoryTemplates = questTemplates[goal];
    let templates = categoryTemplates[difficultyTier];
    
    // If we should reduce intensity, consider using easier templates
    if (shouldReduceIntensity && difficultyTier !== 'easy') {
      // Mix in some easier templates
      const easierTemplates = difficultyTier === 'hard' ? categoryTemplates.balanced : categoryTemplates.easy;
      templates = [...templates.slice(0, Math.ceil(templates.length / 2)), ...easierTemplates.slice(0, Math.floor(easierTemplates.length / 2))];
    }
    
    // Randomly select templates for this category
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    const selectedTemplates = shuffled.slice(0, questsPerCategory);
    
    selectedTemplates.forEach((template: QuestTemplate) => {
      quests.push({
        title: template.title,
        description: template.description,
        xpReward: template.xpReward,
        category: template.category,
        frequency: QuestFrequency.Daily,
      });
    });
  });
  
  // Ensure we have between 6-10 quests
  if (quests.length < 6) {
    // Add more quests from random categories
    const remainingNeeded = 6 - quests.length;
    for (let i = 0; i < remainingNeeded; i++) {
      const randomGoal = selectedGoals[Math.floor(Math.random() * selectedGoals.length)];
      const categoryTemplates = questTemplates[randomGoal];
      const templates = categoryTemplates[difficultyTier];
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      
      quests.push({
        title: randomTemplate.title,
        description: randomTemplate.description,
        xpReward: randomTemplate.xpReward,
        category: randomTemplate.category,
        frequency: QuestFrequency.Daily,
      });
    }
  } else if (quests.length > 10) {
    // Trim to 10 quests
    quests.splice(10);
  }
  
  return quests;
}
