import test from 'node:test';
import assert from 'node:assert/strict';
import { generateLocalPlans, getRandomTwist, replacePlanStep } from './planGenerator';
import { getRecommendedStampId, STAMP_CATALOG } from './stamps';
import { PlanPreferences } from '../types';

test('generates exactly 3 distinct plans respecting budget and duration', () => {
  const prefs: PlanPreferences = {
    city: 'Managua',
    budget: 350,
    currency: 'NIO',
    duration: '3h',
    company: 'friends',
    peopleCount: 3,
    mood: 'rutina',
    preference: 'afuera'
  };

  const plans = generateLocalPlans(prefs);
  assert.equal(plans.length, 3, 'Should generate 3 plans');

  plans.forEach((plan, i) => {
    assert.ok(plan.name.length > 5, `Plan ${i} should have a name`);
    assert.ok(plan.steps.length >= 3 && plan.steps.length <= 5, `Plan ${i} should have 3-5 steps`);
    assert.ok(plan.estimatedCost <= prefs.budget, `Plan ${i} cost (${plan.estimatedCost}) should not exceed budget (${prefs.budget})`);
    assert.equal(plan.currency, 'NIO');
    assert.equal(plan.durationMinutes, 180, 'Duration should be 180 minutes for 3h');
    assert.ok(plan.packingList.length > 0, 'Should have items in packing list');
    assert.ok(plan.rainAlternative.title.length > 0, 'Should have rain alternative');
    assert.ok(plan.activeTwist, 'Should have active twist');
    assert.equal(plan.city, 'Managua');
  });

  // Verify uniqueness of titles
  const titles = new Set(plans.map(p => p.name));
  assert.equal(titles.size, 3, 'All 3 plans should have distinct names');
});

test('budget 0 strictly generates zero cost plans and free items', () => {
  const prefs: PlanPreferences = {
    city: 'Granada',
    budget: 0,
    currency: 'NIO',
    duration: '1h',
    company: 'couple',
    peopleCount: 2,
    mood: 'romantico',
    preference: 'afuera'
  };

  const plans = generateLocalPlans(prefs);
  assert.equal(plans.length, 3);

  plans.forEach((plan) => {
    assert.equal(plan.estimatedCost, 0, 'Estimated plan cost must be strictly 0');
    plan.steps.forEach((step) => {
      assert.equal(step.estimatedCost, 0, 'Step cost must be 0 for zero-budget');
    });
    plan.budgetBreakdown.forEach((item) => {
      assert.equal(item.amount, 0, 'Budget breakdown items must be 0');
    });
  });
});

test('handles indoor (casa) preferences cleanly', () => {
  const prefs: PlanPreferences = {
    city: 'León',
    budget: 150,
    currency: 'NIO',
    duration: '30min',
    company: 'solo',
    peopleCount: 1,
    mood: 'creativo',
    preference: 'casa'
  };

  const plans = generateLocalPlans(prefs);
  assert.equal(plans.length, 3);
  plans.forEach((plan) => {
    assert.equal(plan.durationMinutes, 30);
    assert.ok(plan.estimatedCost <= 150);
  });
});

test('getRandomTwist returns a valid non-empty challenge', () => {
  const twist = getRandomTwist();
  assert.ok(twist.id.startsWith('twist-'));
  assert.ok(twist.title.length > 3);
  assert.ok(twist.challenge.length > 10);
  assert.equal(twist.isDone, false);
});

test('replacePlanStep safely swaps a step without exceeding budget', () => {
  const prefs: PlanPreferences = {
    city: 'Matagalpa',
    budget: 200,
    currency: 'NIO',
    duration: '1h',
    company: 'solo',
    peopleCount: 1,
    mood: 'aventurero',
    preference: 'afuera'
  };

  const plans = generateLocalPlans(prefs);
  const plan = plans[0];
  const originalStep = plan.steps[0];
  
  const updatedPlan = replacePlanStep(plan, originalStep.id);
  assert.equal(updatedPlan.steps.length, plan.steps.length);
  assert.ok(updatedPlan.estimatedCost <= prefs.budget, 'Budget should remain within limit after step replacement');
  
  const updatedStep = updatedPlan.steps.find(s => s.id === originalStep.id);
  assert.ok(updatedStep);
});

test('stamps catalog and recommendation helper work properly', () => {
  assert.ok(STAMP_CATALOG.length >= 8, 'Should have rich stamp catalog');
  
  const twistStamp = getRecommendedStampId('aventurero', 'afuera', 100, true);
  assert.equal(twistStamp, 'picardia');

  const zeroCostStamp = getRecommendedStampId('aventurero', 'afuera', 0, false);
  assert.equal(zeroCostStamp, 'cero_pesos');

  const homeStamp = getRecommendedStampId('tranquilo', 'casa', 50, false);
  assert.equal(homeStamp, 'guarida_nica');
});
