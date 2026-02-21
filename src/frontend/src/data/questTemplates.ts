import { SkillCategory, GoalCategory } from '../types';

export interface QuestTemplate {
  title: string;
  description: string;
  xpReward: number;
  category: SkillCategory;
}

export const questTemplates: Record<GoalCategory, { easy: QuestTemplate[], balanced: QuestTemplate[], hard: QuestTemplate[] }> = {
  'Fitness': {
    easy: [
      { title: 'Take a 10-minute walk', description: 'Get some fresh air and light movement', xpReward: 15, category: SkillCategory.Fitness },
      { title: 'Do 10 pushups', description: 'Build upper body strength', xpReward: 15, category: SkillCategory.Fitness },
      { title: 'Stretch for 5 minutes', description: 'Improve flexibility and reduce tension', xpReward: 10, category: SkillCategory.Fitness },
      { title: 'Take the stairs today', description: 'Choose stairs over elevator', xpReward: 10, category: SkillCategory.Fitness },
      { title: 'Do 20 jumping jacks', description: 'Quick cardio burst', xpReward: 15, category: SkillCategory.Fitness },
    ],
    balanced: [
      { title: 'Complete a 30-minute workout', description: 'Full body exercise session', xpReward: 30, category: SkillCategory.Fitness },
      { title: 'Walk 5,000 steps', description: 'Track your daily movement', xpReward: 25, category: SkillCategory.Fitness },
      { title: 'Do 25 pushups', description: 'Build strength and endurance', xpReward: 25, category: SkillCategory.Fitness },
      { title: 'Complete a yoga session', description: '20-minute yoga practice', xpReward: 30, category: SkillCategory.Fitness },
      { title: 'Go for a 20-minute run', description: 'Cardio endurance training', xpReward: 30, category: SkillCategory.Fitness },
    ],
    hard: [
      { title: 'Complete a 45-minute workout', description: 'Intense full body training', xpReward: 50, category: SkillCategory.Fitness },
      { title: 'Do 50 pushups', description: 'Advanced strength challenge', xpReward: 45, category: SkillCategory.Fitness },
      { title: 'Walk 10,000 steps', description: 'Hit your daily step goal', xpReward: 40, category: SkillCategory.Fitness },
      { title: 'Complete a HIIT workout', description: '30-minute high intensity training', xpReward: 55, category: SkillCategory.Fitness },
      { title: 'Run 5 kilometers', description: 'Long distance cardio challenge', xpReward: 60, category: SkillCategory.Fitness },
    ],
  },
  'Mental Health': {
    easy: [
      { title: 'Meditate for 5 minutes', description: 'Practice mindfulness and calm', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Write 3 things you\'re grateful for', description: 'Practice gratitude journaling', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Take 5 deep breaths', description: 'Simple breathing exercise', xpReward: 10, category: SkillCategory.Mind },
      { title: 'Listen to calming music', description: '10 minutes of relaxation', xpReward: 10, category: SkillCategory.Mind },
      { title: 'Step outside for fresh air', description: 'Brief nature connection', xpReward: 10, category: SkillCategory.Mind },
    ],
    balanced: [
      { title: 'Meditate for 15 minutes', description: 'Extended mindfulness practice', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Journal about your day', description: 'Reflect on experiences and emotions', xpReward: 25, category: SkillCategory.Mind },
      { title: 'Practice a breathing exercise', description: '10-minute guided breathing', xpReward: 25, category: SkillCategory.Mind },
      { title: 'Do a body scan meditation', description: 'Full body relaxation practice', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Write about your feelings', description: 'Emotional processing exercise', xpReward: 25, category: SkillCategory.Mind },
    ],
    hard: [
      { title: 'Meditate for 30 minutes', description: 'Deep mindfulness session', xpReward: 50, category: SkillCategory.Mind },
      { title: 'Complete a guided therapy exercise', description: 'Structured mental health work', xpReward: 55, category: SkillCategory.Mind },
      { title: 'Write a detailed journal entry', description: 'Deep self-reflection (500+ words)', xpReward: 45, category: SkillCategory.Mind },
      { title: 'Practice advanced breathwork', description: '20-minute pranayama session', xpReward: 50, category: SkillCategory.Mind },
      { title: 'Complete a mindfulness challenge', description: 'Hour of present awareness', xpReward: 60, category: SkillCategory.Mind },
    ],
  },
  'Productivity': {
    easy: [
      { title: 'Make a to-do list', description: 'Plan your day ahead', xpReward: 10, category: SkillCategory.Creativity },
      { title: 'Complete one small task', description: 'Check off a quick item', xpReward: 15, category: SkillCategory.Creativity },
      { title: 'Organize your workspace', description: '10-minute cleanup', xpReward: 15, category: SkillCategory.Creativity },
      { title: 'Set 3 goals for tomorrow', description: 'Plan ahead for success', xpReward: 10, category: SkillCategory.Creativity },
      { title: 'Clear your email inbox', description: 'Achieve inbox zero', xpReward: 15, category: SkillCategory.Creativity },
    ],
    balanced: [
      { title: 'Complete your top 3 priorities', description: 'Focus on what matters most', xpReward: 35, category: SkillCategory.Creativity },
      { title: 'Work for 2 focused hours', description: 'Deep work session with no distractions', xpReward: 30, category: SkillCategory.Creativity },
      { title: 'Finish a project milestone', description: 'Make significant progress', xpReward: 35, category: SkillCategory.Creativity },
      { title: 'Complete 5 important tasks', description: 'Productive day achievement', xpReward: 30, category: SkillCategory.Creativity },
      { title: 'Plan your week ahead', description: 'Strategic weekly planning', xpReward: 25, category: SkillCategory.Creativity },
    ],
    hard: [
      { title: 'Complete all daily priorities', description: 'Finish everything on your list', xpReward: 55, category: SkillCategory.Creativity },
      { title: 'Work for 4 focused hours', description: 'Extended deep work session', xpReward: 60, category: SkillCategory.Creativity },
      { title: 'Finish a major project', description: 'Complete significant work', xpReward: 60, category: SkillCategory.Creativity },
      { title: 'Complete 10 tasks today', description: 'Ultra-productive day', xpReward: 50, category: SkillCategory.Creativity },
      { title: 'Achieve a major milestone', description: 'Significant accomplishment', xpReward: 55, category: SkillCategory.Creativity },
    ],
  },
  'Finance': {
    easy: [
      { title: 'Track your spending today', description: 'Record all expenses', xpReward: 15, category: SkillCategory.Finance },
      { title: 'Skip one unnecessary purchase', description: 'Practice mindful spending', xpReward: 15, category: SkillCategory.Finance },
      { title: 'Review your bank balance', description: 'Check your financial status', xpReward: 10, category: SkillCategory.Finance },
      { title: 'Save $5 today', description: 'Small savings add up', xpReward: 15, category: SkillCategory.Finance },
      { title: 'Pack lunch instead of buying', description: 'Save money on food', xpReward: 15, category: SkillCategory.Finance },
    ],
    balanced: [
      { title: 'Create a weekly budget', description: 'Plan your spending for the week', xpReward: 30, category: SkillCategory.Finance },
      { title: 'Save $20 this week', description: 'Build your savings habit', xpReward: 30, category: SkillCategory.Finance },
      { title: 'Review and categorize expenses', description: 'Analyze your spending patterns', xpReward: 25, category: SkillCategory.Finance },
      { title: 'Research an investment option', description: 'Learn about growing wealth', xpReward: 30, category: SkillCategory.Finance },
      { title: 'Cut one subscription', description: 'Reduce recurring expenses', xpReward: 35, category: SkillCategory.Finance },
    ],
    hard: [
      { title: 'Create a monthly budget', description: 'Comprehensive financial planning', xpReward: 50, category: SkillCategory.Finance },
      { title: 'Save $100 this month', description: 'Significant savings goal', xpReward: 60, category: SkillCategory.Finance },
      { title: 'Complete a financial audit', description: 'Full review of finances', xpReward: 55, category: SkillCategory.Finance },
      { title: 'Start an investment account', description: 'Begin building wealth', xpReward: 60, category: SkillCategory.Finance },
      { title: 'Pay off a debt', description: 'Eliminate financial burden', xpReward: 55, category: SkillCategory.Finance },
    ],
  },
  'Social Life': {
    easy: [
      { title: 'Send a message to a friend', description: 'Reach out and connect', xpReward: 15, category: SkillCategory.Social },
      { title: 'Do one kind act today', description: 'Spread positivity', xpReward: 15, category: SkillCategory.Social },
      { title: 'Compliment someone', description: 'Make someone\'s day better', xpReward: 10, category: SkillCategory.Social },
      { title: 'Call a family member', description: 'Stay connected with loved ones', xpReward: 15, category: SkillCategory.Social },
      { title: 'Smile at 3 people today', description: 'Share positive energy', xpReward: 10, category: SkillCategory.Social },
    ],
    balanced: [
      { title: 'Have a meaningful conversation', description: 'Connect deeply with someone', xpReward: 30, category: SkillCategory.Social },
      { title: 'Reach out to an old friend', description: 'Reconnect with someone', xpReward: 30, category: SkillCategory.Social },
      { title: 'Help someone with a task', description: 'Offer your time and support', xpReward: 35, category: SkillCategory.Social },
      { title: 'Attend a social event', description: 'Engage with your community', xpReward: 35, category: SkillCategory.Social },
      { title: 'Make plans with a friend', description: 'Schedule quality time', xpReward: 25, category: SkillCategory.Social },
    ],
    hard: [
      { title: 'Host a gathering', description: 'Bring people together', xpReward: 55, category: SkillCategory.Social },
      { title: 'Volunteer for a cause', description: 'Give back to community', xpReward: 60, category: SkillCategory.Social },
      { title: 'Make a new friend', description: 'Expand your social circle', xpReward: 50, category: SkillCategory.Social },
      { title: 'Organize a group activity', description: 'Lead a social experience', xpReward: 55, category: SkillCategory.Social },
      { title: 'Resolve a conflict', description: 'Improve a relationship', xpReward: 60, category: SkillCategory.Social },
    ],
  },
  'Learning': {
    easy: [
      { title: 'Read for 10 minutes', description: 'Expand your knowledge', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Watch one educational video', description: 'Learn something new', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Learn 5 new words', description: 'Expand your vocabulary', xpReward: 10, category: SkillCategory.Mind },
      { title: 'Listen to a podcast episode', description: 'Audio learning session', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Practice a new skill for 10 minutes', description: 'Deliberate practice', xpReward: 15, category: SkillCategory.Mind },
    ],
    balanced: [
      { title: 'Read for 30 minutes', description: 'Deep reading session', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Complete an online course lesson', description: 'Structured learning', xpReward: 35, category: SkillCategory.Mind },
      { title: 'Practice a skill for 30 minutes', description: 'Focused skill development', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Take notes on what you learned', description: 'Consolidate knowledge', xpReward: 25, category: SkillCategory.Mind },
      { title: 'Teach someone something', description: 'Learn by teaching', xpReward: 35, category: SkillCategory.Mind },
    ],
    hard: [
      { title: 'Read for 1 hour', description: 'Extended learning session', xpReward: 50, category: SkillCategory.Mind },
      { title: 'Complete a full course module', description: 'Significant learning milestone', xpReward: 60, category: SkillCategory.Mind },
      { title: 'Practice a skill for 2 hours', description: 'Intensive skill training', xpReward: 55, category: SkillCategory.Mind },
      { title: 'Create a learning project', description: 'Apply knowledge practically', xpReward: 60, category: SkillCategory.Mind },
      { title: 'Master a new concept', description: 'Deep understanding achievement', xpReward: 55, category: SkillCategory.Mind },
    ],
  },
  'Nutrition': {
    easy: [
      { title: 'Drink 4 glasses of water', description: 'Stay hydrated', xpReward: 10, category: SkillCategory.Fitness },
      { title: 'Eat a piece of fruit', description: 'Healthy snack choice', xpReward: 10, category: SkillCategory.Fitness },
      { title: 'Skip sugary drinks today', description: 'Make a healthy choice', xpReward: 15, category: SkillCategory.Fitness },
      { title: 'Eat a vegetable with dinner', description: 'Add nutrition to your meal', xpReward: 10, category: SkillCategory.Fitness },
      { title: 'Have a healthy breakfast', description: 'Start your day right', xpReward: 15, category: SkillCategory.Fitness },
    ],
    balanced: [
      { title: 'Drink 8 glasses of water', description: 'Full daily hydration', xpReward: 25, category: SkillCategory.Fitness },
      { title: 'Eat a home-cooked meal', description: 'Prepare nutritious food', xpReward: 30, category: SkillCategory.Fitness },
      { title: 'Track your calories today', description: 'Mindful eating practice', xpReward: 25, category: SkillCategory.Fitness },
      { title: 'Eat 5 servings of fruits/vegetables', description: 'Hit your daily nutrition goal', xpReward: 30, category: SkillCategory.Fitness },
      { title: 'Meal prep for tomorrow', description: 'Plan ahead for success', xpReward: 30, category: SkillCategory.Fitness },
    ],
    hard: [
      { title: 'Follow your meal plan perfectly', description: 'Complete nutritional discipline', xpReward: 50, category: SkillCategory.Fitness },
      { title: 'Meal prep for the week', description: 'Full week preparation', xpReward: 60, category: SkillCategory.Fitness },
      { title: 'Cook 3 healthy meals today', description: 'Full day of nutritious eating', xpReward: 55, category: SkillCategory.Fitness },
      { title: 'Hit all macro targets', description: 'Perfect nutritional balance', xpReward: 55, category: SkillCategory.Fitness },
      { title: 'Create a new healthy recipe', description: 'Culinary creativity', xpReward: 50, category: SkillCategory.Fitness },
    ],
  },
  'Sleep': {
    easy: [
      { title: 'Be in bed by midnight', description: 'Reasonable bedtime', xpReward: 15, category: SkillCategory.Mind },
      { title: 'No screens 30 minutes before bed', description: 'Better sleep hygiene', xpReward: 15, category: SkillCategory.Mind },
      { title: 'Set a bedtime alarm', description: 'Plan for good sleep', xpReward: 10, category: SkillCategory.Mind },
      { title: 'Dim lights 1 hour before bed', description: 'Prepare for sleep', xpReward: 10, category: SkillCategory.Mind },
      { title: 'Avoid caffeine after 2pm', description: 'Support quality sleep', xpReward: 15, category: SkillCategory.Mind },
    ],
    balanced: [
      { title: 'Get 7 hours of sleep', description: 'Adequate rest', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Be in bed by 11pm', description: 'Earlier bedtime', xpReward: 25, category: SkillCategory.Mind },
      { title: 'Follow a bedtime routine', description: 'Consistent sleep habits', xpReward: 30, category: SkillCategory.Mind },
      { title: 'No screens 1 hour before bed', description: 'Extended digital detox', xpReward: 30, category: SkillCategory.Mind },
      { title: 'Wake up without snoozing', description: 'Start day energized', xpReward: 25, category: SkillCategory.Mind },
    ],
    hard: [
      { title: 'Get 8+ hours of quality sleep', description: 'Optimal rest', xpReward: 50, category: SkillCategory.Mind },
      { title: 'Be in bed by 10pm', description: 'Early bedtime discipline', xpReward: 45, category: SkillCategory.Mind },
      { title: 'Perfect sleep schedule all week', description: 'Consistent sleep/wake times', xpReward: 60, category: SkillCategory.Mind },
      { title: 'Complete evening wind-down ritual', description: 'Full relaxation routine', xpReward: 50, category: SkillCategory.Mind },
      { title: 'Track and optimize sleep quality', description: 'Data-driven sleep improvement', xpReward: 55, category: SkillCategory.Mind },
    ],
  },
};
