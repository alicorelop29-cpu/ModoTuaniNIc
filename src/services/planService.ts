import { AdventurePlan, PlanPreferences } from '../types';
import { generateLocalPlans } from '../utils/planGenerator';

export interface GenerationResult {
  plans: AdventurePlan[];
  source: 'gemini' | 'local';
}

export async function fetchPlans(prefs: PlanPreferences): Promise<GenerationResult> {
  try {
    const res = await fetch('/api/generate-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prefs)
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.plans) && data.plans.length > 0) {
        return {
          plans: data.plans,
          source: data.source || 'local'
        };
      }
    }
  } catch (err) {
    console.warn('API call failed or unavailable, using internal generator:', err);
  }

  // Guaranteed fallback
  const localPlans = generateLocalPlans(prefs);
  return {
    plans: localPlans,
    source: 'local'
  };
}

export async function checkServerStatus(): Promise<{ hasGeminiKey: boolean }> {
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      const data = await res.json();
      return { hasGeminiKey: Boolean(data.hasGeminiKey) };
    }
  } catch {
    // ignore
  }
  return { hasGeminiKey: false };
}
