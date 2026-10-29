export type Currency = 'NIO' | 'USD';

export type Duration = '30min' | '1h' | '3h' | 'full_day';

export type Company = 'solo' | 'couple' | 'friends' | 'family';

export type Mood = 'tranquilo' | 'creativo' | 'aventurero' | 'romantico' | 'rutina';

export type Preference = 'casa' | 'afuera' | 'cualquiera';

export interface PlanPreferences {
  city: string;
  budget: number;
  currency: Currency;
  duration: Duration;
  company: Company;
  peopleCount: number;
  mood: Mood;
  preference: Preference;
}

export interface PlanStep {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  estimatedCost: number;
  isDone: boolean;
  category?: string;
}

export interface BudgetItem {
  concept: string;
  amount: number;
}

export interface UnexpectedTwist {
  id: string;
  title: string;
  challenge: string;
  isDone: boolean;
}

export interface RainAlternative {
  title: string;
  description: string;
  adjustedSteps: string[];
}

export interface AdventurePlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  estimatedCost: number;
  currency: Currency;
  durationLabel: string;
  durationMinutes: number;
  energyLevel: 'Bajo' | 'Medio' | 'Alto' | 'Tranqui' | 'Tuani intenso';
  fitReason: string;
  steps: PlanStep[];
  budgetBreakdown: BudgetItem[];
  packingList: string[];
  rainAlternative: RainAlternative;
  activeTwist?: UnexpectedTwist;
  createdAt: string;
  isSaved?: boolean;
  isCompleted?: boolean;
  completedAt?: string;
  userNote?: string;
  stampId?: string;
  city: string;
  company: Company;
  mood: Mood;
}

export interface Stamp {
  id: string;
  name: string;
  symbol: string;
  color: string;
  category: string;
  description: string;
  earnedAt?: string;
  planId?: string;
  planTitle?: string;
  note?: string;
  city?: string;
}
