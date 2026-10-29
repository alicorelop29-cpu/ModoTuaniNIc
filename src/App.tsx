import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { PreferencesForm } from './components/PreferencesForm';
import { PlanCard } from './components/PlanCard';
import { MissionDetail } from './components/MissionDetail';
import { LoadingState } from './components/LoadingState';
import { PassportView } from './components/PassportView';
import { SavedPlansView } from './components/SavedPlansView';
import { StampModal } from './components/StampModal';
import { ResetDataModal } from './components/ResetDataModal';
import { HeroPanoramicIllustration, WaveDivider } from './components/NicaIllustrations';
import { storage, DEFAULT_PREFERENCES } from './services/storage';
import { fetchPlans, checkServerStatus } from './services/planService';
import { AdventurePlan, PlanPreferences, Stamp, Mood, Duration } from './types';
import { replacePlanStep, getRandomTwist } from './utils/planGenerator';
import { AlertCircle, RotateCcw, Compass, Sparkles, ArrowDown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'passport'>('home');
  const [preferences, setPreferences] = useState<PlanPreferences>(storage.getPreferences());
  const [generatedPlans, setGeneratedPlans] = useState<AdventurePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<AdventurePlan | null>(storage.getCurrentMission());
  const [savedPlans, setSavedPlans] = useState<AdventurePlan[]>(storage.getSavedPlans());
  const [stamps, setStamps] = useState<Stamp[]>(storage.getStamps());
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [engineSource, setEngineSource] = useState<'gemini' | 'local' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isStampModalOpen, setIsStampModalOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkServerStatus().then((res) => {
      setEngineSource(res.hasGeminiKey ? 'gemini' : 'local');
    });
  }, []);

  const handlePreferencesChange = (newPrefs: PlanPreferences) => {
    setPreferences(newPrefs);
    storage.savePreferences(newPrefs);
  };

  const handleGeneratePlans = async (overridePrefs?: PlanPreferences) => {
    const prefsToUse = overridePrefs || preferences;
    setIsLoading(true);
    setErrorMsg(null);
    setSelectedPlan(null);

    try {
      const result = await fetchPlans(prefsToUse);
      if (result.plans && result.plans.length > 0) {
        setGeneratedPlans(result.plans);
        setEngineSource(result.source);
        setActiveTab('home');
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        setErrorMsg('No pudimos armar las alternativas. Probá de nuevo con otros datos.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocurrió un detalle imprevisto al generar. Probá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurpriseMe = () => {
    const moods: Mood[] = ['aventurero', 'creativo', 'rutina', 'romantico', 'tranquilo'];
    const durations: Duration[] = ['1h', '3h', '30min'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    const randomBudget = preferences.currency === 'USD' ? 10 : 350;

    const randomizedPrefs: PlanPreferences = {
      ...preferences,
      mood: randomMood,
      duration: randomDuration,
      budget: randomBudget,
      preference: 'cualquiera'
    };

    setPreferences(randomizedPrefs);
    storage.savePreferences(randomizedPrefs);
    handleGeneratePlans(randomizedPrefs);
  };

  const handleApplyPreset = (zone: string, mood: Mood, budget: number, duration: Duration) => {
    const updated: PlanPreferences = {
      ...preferences,
      city: zone,
      mood,
      budget,
      duration,
      preference: 'afuera'
    };
    setPreferences(updated);
    storage.savePreferences(updated);
    handleGeneratePlans(updated);
  };

  const handleSelectPlan = (plan: AdventurePlan) => {
    setSelectedPlan(plan);
    storage.setCurrentMission(plan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleStep = (stepId: string) => {
    if (!selectedPlan) return;
    const updatedSteps = selectedPlan.steps.map((s) =>
      s.id === stepId ? { ...s, isDone: !s.isDone } : s
    );
    const updatedPlan: AdventurePlan = {
      ...selectedPlan,
      steps: updatedSteps
    };
    setSelectedPlan(updatedPlan);
    storage.setCurrentMission(updatedPlan);

    if (savedPlans.some((p) => p.id === updatedPlan.id)) {
      storage.savePlan(updatedPlan);
      setSavedPlans(storage.getSavedPlans());
    }
  };

  const handleReplaceStep = (stepId: string) => {
    if (!selectedPlan) return;
    const updated = replacePlanStep(selectedPlan, stepId);
    setSelectedPlan(updated);
    storage.setCurrentMission(updated);
    if (savedPlans.some((p) => p.id === updated.id)) {
      storage.savePlan(updated);
      setSavedPlans(storage.getSavedPlans());
    }
  };

  const handleToggleTwist = () => {
    if (!selectedPlan || !selectedPlan.activeTwist) return;
    const updatedPlan: AdventurePlan = {
      ...selectedPlan,
      activeTwist: {
        ...selectedPlan.activeTwist,
        isDone: !selectedPlan.activeTwist.isDone
      }
    };
    setSelectedPlan(updatedPlan);
    storage.setCurrentMission(updatedPlan);
  };

  const handleRerollTwist = () => {
    if (!selectedPlan) return;
    const updatedPlan: AdventurePlan = {
      ...selectedPlan,
      activeTwist: getRandomTwist()
    };
    setSelectedPlan(updatedPlan);
    storage.setCurrentMission(updatedPlan);
  };

  const handleSavePlan = () => {
    if (!selectedPlan) return;
    const isCurrentlySaved = savedPlans.some((p) => p.id === selectedPlan.id);
    if (isCurrentlySaved) {
      storage.removeSavedPlan(selectedPlan.id);
    } else {
      storage.savePlan(selectedPlan);
    }
    setSavedPlans(storage.getSavedPlans());
  };

  const handleCompletePlan = () => {
    if (!selectedPlan) return;
    setIsStampModalOpen(true);
  };

  const handleSaveStamp = (stampId: string, note: string) => {
    if (!selectedPlan) return;
    storage.awardStamp(stampId, selectedPlan, note);
    setStamps(storage.getStamps());
    setSavedPlans(storage.getSavedPlans());
    setIsStampModalOpen(false);
    setActiveTab('passport');
  };

  const handleResumePlan = (plan: AdventurePlan) => {
    setSelectedPlan(plan);
    storage.setCurrentMission(plan);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedPlan = (planId: string) => {
    storage.removeSavedPlan(planId);
    setSavedPlans(storage.getSavedPlans());
    if (selectedPlan?.id === planId) {
      storage.setCurrentMission(null);
    }
  };

  const handleResetAllData = () => {
    storage.resetAllData();
    setPreferences(DEFAULT_PREFERENCES);
    setGeneratedPlans([]);
    setSelectedPlan(null);
    setSavedPlans([]);
    setStamps([]);
    setActiveTab('home');
  };

  const isCurrentPlanSaved = Boolean(
    selectedPlan && savedPlans.some((p) => p.id === selectedPlan.id)
  );

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#232925] flex flex-col font-sans selection:bg-[#F4C95D] selection:text-[#232925]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'home') setSelectedPlan(null);
        }}
        savedCount={savedPlans.length}
        stampsCount={stamps.length}
        source={engineSource}
        onOpenReset={() => setIsResetModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 sm:py-8">
        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#B94D35]/10 border border-[#B94D35]/25 text-[#B94D35] flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">{errorMsg}</span>
            </div>
            <button
              onClick={() => handleGeneratePlans()}
              className="px-3 py-1.5 rounded-xl bg-[#B94D35] text-white text-xs font-black hover:bg-[#9E3E28] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reintentar</span>
            </button>
          </div>
        )}

        {/* TAB 1: INICIO */}
        {activeTab === 'home' && (
          <>
            {isLoading ? (
              <LoadingState />
            ) : selectedPlan ? (
              <MissionDetail
                plan={selectedPlan}
                onBack={() => {
                  setSelectedPlan(null);
                  storage.setCurrentMission(null);
                }}
                onToggleStep={handleToggleStep}
                onReplaceStep={handleReplaceStep}
                onToggleTwist={handleToggleTwist}
                onRerollTwist={handleRerollTwist}
                onSavePlan={handleSavePlan}
                onCompletePlan={handleCompletePlan}
                isSaved={isCurrentPlanSaved}
              />
            ) : (
              <div className="space-y-8">
                {/* HERO PROTAGONISTA: Panoramic Volcano & Lake Illustration */}
                <section className="space-y-4">
                  <div className="relative">
                    <HeroPanoramicIllustration />
                  </div>

                  {/* Hero Copy & Headline */}
                  <div className="pt-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168AAD]/10 text-[#0755A1] text-xs font-extrabold tracking-wider uppercase mb-2">
                        <span>TIERRA DE LAGOS Y VOLCANES</span>
                      </div>
                      <h1 className="font-display font-black text-3xl sm:text-5xl text-[#232925] tracking-tight leading-tight">
                        Nicaragua se vive.
                      </h1>
                      <p className="text-sm sm:text-base text-[#56605A] mt-1.5 leading-relaxed">
                        Encontrá tu próximo plan entre lagos, volcanes y rincones llenos de vida.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="py-3.5 px-7 rounded-2xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-black text-sm transition-all shadow-[0_4px_16px_rgba(7,85,161,0.25)] flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <Compass className="w-4 h-4 stroke-[2.3]" />
                      <span>Armame un plan</span>
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Recomendaciones del día / Filtros rápidos */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F4C95D] fill-[#F4C95D]" />
                      <span className="text-xs font-black uppercase tracking-wider text-[#4E5953]">
                        Recomendaciones del día:
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleApplyPreset('Granada', 'tranquilo', 250, '3h')}
                        className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C8] text-[#232925] hover:border-[#0755A1] hover:text-[#0755A1] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>⛵ Brisa del Cocibolca</span>
                        <span className="text-[10px] text-[#7C8781]">Granada • C$250</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset('Managua', 'aventurero', 300, '3h')}
                        className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C8] text-[#232925] hover:border-[#0755A1] hover:text-[#0755A1] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>🌋 Mirador & Loma</span>
                        <span className="text-[10px] text-[#7C8781]">Managua • C$300</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset('Matagalpa', 'romantico', 200, '1h')}
                        className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C8] text-[#232925] hover:border-[#0755A1] hover:text-[#0755A1] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>☕ Café de Altura</span>
                        <span className="text-[10px] text-[#7C8781]">Matagalpa • C$200</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset('San Juan del Sur', 'rutina', 400, '3h')}
                        className="text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C8] text-[#232925] hover:border-[#0755A1] hover:text-[#0755A1] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>🌊 Puesta de Sol</span>
                        <span className="text-[10px] text-[#7C8781]">Playa • C$400</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Subtle Divider */}
                <div className="py-1">
                  <WaveDivider className="w-full h-4 text-[#168AAD]/35" />
                </div>

                {/* Main Generator Form */}
                <div ref={formRef}>
                  <PreferencesForm
                    preferences={preferences}
                    onChange={handlePreferencesChange}
                    onSubmit={() => handleGeneratePlans()}
                    onSurpriseMe={handleSurpriseMe}
                    isLoading={isLoading}
                  />
                </div>

                {/* Generated Results Section (Postcards) */}
                {generatedPlans.length > 0 && (
                  <div ref={resultsRef} className="space-y-6 pt-4 animate-in fade-in duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DECE] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-display font-black text-2xl text-[#232925] tracking-tight">
                            Aquí tenés 3 alternativas tuanis
                          </h2>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#246747]/10 text-[#246747] font-black border border-[#246747]/20">
                            Postales listas
                          </span>
                        </div>
                        <p className="text-xs text-[#56605A] mt-1">
                          Elegí la que más te llame la atención para abrir la misión y la checklist interactiva.
                        </p>
                      </div>

                      <button
                        onClick={() => handleGeneratePlans()}
                        className="self-start sm:self-auto text-xs text-[#0755A1] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Armar otras 3 opciones</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {generatedPlans.map((plan, index) => (
                        <PlanCard
                          key={plan.id}
                          plan={plan}
                          index={index}
                          onSelect={handleSelectPlan}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TAB 2: MIS PLANES */}
        {activeTab === 'saved' && (
          <SavedPlansView
            savedPlans={savedPlans}
            onResumePlan={handleResumePlan}
            onDeletePlan={handleDeleteSavedPlan}
            onExploreNew={() => {
              setActiveTab('home');
              setSelectedPlan(null);
            }}
          />
        )}

        {/* TAB 3: PASAPORTE */}
        {activeTab === 'passport' && (
          <PassportView
            stamps={stamps}
            completedPlans={savedPlans.filter((p) => p.isCompleted)}
            onStartAdventure={() => {
              setActiveTab('home');
              setSelectedPlan(null);
            }}
          />
        )}
      </main>

      {/* Completion & Stamp Award Modal */}
      {isStampModalOpen && selectedPlan && (
        <StampModal
          plan={selectedPlan}
          onClose={() => setIsStampModalOpen(false)}
          onSaveStamp={handleSaveStamp}
        />
      )}

      {/* Reset Data Confirmation Modal */}
      <ResetDataModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetAllData}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'home') setSelectedPlan(null);
        }}
        savedCount={savedPlans.length}
        stampsCount={stamps.length}
      />
    </div>
  );
}
