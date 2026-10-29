import { AdventurePlan, PlanPreferences, Stamp } from '../types';
import { STAMP_CATALOG } from '../utils/stamps';

const PREFS_KEY = 'modo_tuani_prefs';
const SAVED_PLANS_KEY = 'modo_tuani_saved_plans';
const STAMPS_KEY = 'modo_tuani_passport_stamps';
const CURRENT_MISSION_KEY = 'modo_tuani_current_mission';

export const DEFAULT_PREFERENCES: PlanPreferences = {
  city: 'Managua',
  budget: 350,
  currency: 'NIO',
  duration: '3h',
  company: 'friends',
  peopleCount: 3,
  mood: 'rutina',
  preference: 'afuera'
};

export const storage = {
  getPreferences(): PlanPreferences {
    try {
      const data = localStorage.getItem(PREFS_KEY);
      if (data) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Error reading preferences from localStorage:', e);
    }
    return DEFAULT_PREFERENCES;
  },

  savePreferences(prefs: PlanPreferences): void {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.error('Error saving preferences to localStorage:', e);
    }
  },

  getSavedPlans(): AdventurePlan[] {
    try {
      const data = localStorage.getItem(SAVED_PLANS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading saved plans:', e);
    }
    return [];
  },

  savePlan(plan: AdventurePlan): void {
    try {
      const plans = storage.getSavedPlans();
      const existingIdx = plans.findIndex(p => p.id === plan.id);
      if (existingIdx >= 0) {
        plans[existingIdx] = { ...plan, isSaved: true };
      } else {
        plans.unshift({ ...plan, isSaved: true });
      }
      localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
    } catch (e) {
      console.error('Error saving plan:', e);
    }
  },

  removeSavedPlan(planId: string): void {
    try {
      const plans = storage.getSavedPlans();
      const filtered = plans.filter(p => p.id !== planId);
      localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error removing plan:', e);
    }
  },

  getStamps(): Stamp[] {
    try {
      const data = localStorage.getItem(STAMPS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading stamps:', e);
    }
    return [];
  },

  awardStamp(stampId: string, plan: AdventurePlan, note: string = ''): Stamp {
    const stamps = storage.getStamps();
    const catalogItem = STAMP_CATALOG.find(s => s.id === stampId) || STAMP_CATALOG[0];

    const newStamp: Stamp = {
      ...catalogItem,
      earnedAt: new Date().toISOString(),
      planId: plan.id,
      planTitle: plan.name,
      note,
      city: plan.city
    };

    // Keep all stamps in history
    stamps.unshift(newStamp);
    try {
      localStorage.setItem(STAMPS_KEY, JSON.stringify(stamps));
    } catch (e) {
      console.error('Error saving stamp:', e);
    }

    // Also mark plan as completed in saved plans
    const updatedPlan: AdventurePlan = {
      ...plan,
      isCompleted: true,
      completedAt: newStamp.earnedAt,
      userNote: note,
      stampId
    };
    storage.savePlan(updatedPlan);

    return newStamp;
  },

  getCurrentMission(): AdventurePlan | null {
    try {
      const data = localStorage.getItem(CURRENT_MISSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading current mission:', e);
    }
    return null;
  },

  setCurrentMission(plan: AdventurePlan | null): void {
    try {
      if (plan) {
        localStorage.setItem(CURRENT_MISSION_KEY, JSON.stringify(plan));
      } else {
        localStorage.removeItem(CURRENT_MISSION_KEY);
      }
    } catch (e) {
      console.error('Error setting current mission:', e);
    }
  },

  resetAllData(): void {
    try {
      localStorage.removeItem(PREFS_KEY);
      localStorage.removeItem(SAVED_PLANS_KEY);
      localStorage.removeItem(STAMPS_KEY);
      localStorage.removeItem(CURRENT_MISSION_KEY);
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  }
};
