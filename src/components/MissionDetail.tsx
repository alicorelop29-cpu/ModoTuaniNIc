import React, { useState } from 'react';
import { AdventurePlan, PlanStep } from '../types';
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Clock, 
  Coins, 
  CloudRain, 
  Package, 
  Bookmark, 
  BookmarkCheck, 
  Trophy, 
  Shuffle, 
  Sparkles, 
  RefreshCw,
  MapPin
} from 'lucide-react';
import { PostcardArtwork, WaveDivider, SacuanjocheAccent } from './NicaIllustrations';

interface MissionDetailProps {
  plan: AdventurePlan;
  onBack: () => void;
  onToggleStep: (stepId: string) => void;
  onReplaceStep: (stepId: string) => void;
  onToggleTwist: () => void;
  onRerollTwist: () => void;
  onSavePlan: () => void;
  onCompletePlan: () => void;
  isSaved: boolean;
}

export const MissionDetail: React.FC<MissionDetailProps> = ({
  plan,
  onBack,
  onToggleStep,
  onReplaceStep,
  onToggleTwist,
  onRerollTwist,
  onSavePlan,
  onCompletePlan,
  isSaved
}) => {
  const [showRainAlt, setShowRainAlt] = useState(false);

  const completedStepsCount = plan.steps.filter((s) => s.isDone).length;
  const totalSteps = plan.steps.length;
  const progressPercent = Math.round((completedStepsCount / totalSteps) * 100);
  const planType = (plan.name + ' ' + plan.description).toLowerCase();

  return (
    <div className="space-y-7 max-w-3xl mx-auto pb-20">
      {/* Top Nav: Back to options + Save Plan */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F6EFE3] text-[#232925] border border-[#E8DECE] text-xs font-bold transition-all shadow-xs cursor-pointer"
          aria-label="Volver a los planes"
        >
          <ArrowLeft className="w-4 h-4 text-[#0755A1]" />
          <span>Volver a opciones</span>
        </button>

        <button
          onClick={onSavePlan}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
            isSaved
              ? 'bg-[#B94D35] border-[#B94D35] text-white shadow-xs'
              : 'bg-white hover:bg-[#F6EFE3] border-[#E8DECE] text-[#444E48]'
          }`}
          aria-label={isSaved ? 'Plan guardado' : 'Guardar plan'}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              <span>Guardado en Mis Planes</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 text-[#B94D35]" />
              <span>Guardar plan</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Postcard Mission Card */}
      <div className="bg-[#FFFDF8] border border-[#E8DECE] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(35,41,37,0.06)]">
        <div className="relative">
          <PostcardArtwork type={planType} className="w-full h-44 sm:h-52" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFF9EF]/95 border border-[#E8DECE] text-[#232925] text-xs font-black shadow-xs">
              {plan.estimatedCost === 0 ? 'C$ 0 (¡Gratis!)' : `${plan.currency === 'USD' ? '$' : 'C$'}${plan.estimatedCost}`}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#168AAD]/15 text-[#0755A1] text-xs font-black uppercase tracking-wider">
              MISIÓN EN CURSO
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F6EFE3] text-[#444E48] text-xs font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B94D35]" />
              <span>{plan.city}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F6EFE3] text-[#444E48] text-xs font-bold">
              {plan.durationLabel}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#232925] tracking-tight leading-tight">
            {plan.name}
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#B94D35] mt-1.5">
            {plan.tagline}
          </p>
          <p className="text-sm text-[#4E5953] mt-3 leading-relaxed">
            {plan.description}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 pt-5 border-t border-[#E8DECE]">
            <div className="flex items-center justify-between text-xs font-black mb-2">
              <span className="text-[#56605A]">Progreso de la misión</span>
              <span className="text-[#246747]">{completedStepsCount} de {totalSteps} pasos ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-[#F2E8D7] rounded-full overflow-hidden border border-[#E4D9C8]">
              <div
                className="h-full bg-[#246747] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Steps Checklist */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-display font-extrabold text-xl text-[#232925]">
            Pasos de la misión
          </h2>
          <span className="text-xs text-[#7C8781] font-semibold">
            Tocá cada casilla para marcarla
          </span>
        </div>

        <div className="space-y-3">
          {plan.steps.map((step: PlanStep, index: number) => {
            return (
              <div
                key={step.id}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  step.isDone
                    ? 'bg-[#F4ECE0]/70 border-[#E0D5C3] opacity-75'
                    : 'bg-[#FFFDF8] hover:bg-white border-[#E8DECE] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Interactive Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleStep(step.id)}
                    className="mt-0.5 focus:outline-none transition-transform active:scale-95 cursor-pointer"
                    aria-label={`Marcar paso ${index + 1}: ${step.title}`}
                  >
                    {step.isDone ? (
                      <CheckCircle className="w-6 h-6 text-[#246747] fill-[#246747]/15" />
                    ) : (
                      <Circle className="w-6 h-6 text-[#9CA59F] hover:text-[#0755A1]" />
                    )}
                  </button>

                  {/* Step Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className={`text-base font-extrabold transition-all ${
                        step.isDone ? 'line-through text-[#7C8781]' : 'text-[#232925]'
                      }`}>
                        <span className="text-[#B94D35] mr-1.5">{index + 1}.</span>
                        {step.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#6C7570] flex items-center gap-1 bg-[#F2E8D7] px-2.5 py-0.5 rounded-lg">
                          <Clock className="w-3 h-3 text-[#168AAD]" />
                          <span>~{step.durationMinutes} min</span>
                        </span>
                        {step.estimatedCost > 0 && (
                          <span className="text-[11px] font-black text-[#B94D35] bg-[#B94D35]/10 px-2.5 py-0.5 rounded-lg">
                            {plan.currency === 'USD' ? '$' : 'C$'}{step.estimatedCost}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                      step.isDone ? 'line-through text-[#8E9792]' : 'text-[#4E5953]'
                    }`}>
                      {step.description}
                    </p>

                    {/* Change Step Button */}
                    <div className="mt-3 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => onReplaceStep(step.id)}
                        className="text-[11px] font-bold text-[#6C7570] hover:text-[#0755A1] flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F6EFE3] hover:bg-[#EFE5D5] transition-colors cursor-pointer border border-[#E8DEC9]"
                        title="Cambiar este paso por otra alternativa"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Cambiar este paso</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Giro Inesperado" Optional Twist */}
      {plan.activeTwist && (
        <div className="bg-gradient-to-br from-[#FFF8ED] to-[#FDF1DD] border-2 border-[#B94D35]/30 rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl p-1.5 rounded-xl bg-[#F6E2C6]">🎲</span>
              <div>
                <span className="text-[11px] uppercase font-black tracking-wider text-[#B94D35] block">
                  RETO ESPONTÁNEO
                </span>
                <h4 className="font-display font-extrabold text-lg text-[#232925]">
                  Giro Inesperado: {plan.activeTwist.title}
                </h4>
              </div>
            </div>

            <button
              onClick={onRerollTwist}
              className="p-2 px-3 rounded-xl bg-white hover:bg-[#F6EFE3] text-[#B94D35] border border-[#E2CEB9] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Obtener otro giro inesperado"
              aria-label="Cambiar giro inesperado"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Otro reto</span>
            </button>
          </div>

          <p className="text-sm text-[#3E4741] leading-relaxed bg-white/80 p-4 rounded-2xl border border-[#E8DEC9] mb-4">
            {plan.activeTwist.challenge}
          </p>

          <button
            onClick={onToggleTwist}
            className={`w-full py-3 px-4 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              plan.activeTwist.isDone
                ? 'bg-[#246747] text-white border-[#246747] shadow-xs'
                : 'bg-white hover:bg-[#F6EFE3] border-[#B94D35] text-[#B94D35]'
            }`}
          >
            {plan.activeTwist.isDone ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" />
                <span>¡Reto inesperado completado! (Sello especial asegurado)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#B94D35]" />
                <span>Aceptar este reto y marcar como hecho</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Budget Breakdown & Packing List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Desglose de presupuesto */}
        <div className="bg-[#FFFDF8] border border-[#E8DECE] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-4 h-4 text-[#F4C95D]" />
            <h4 className="text-xs font-black text-[#232925] uppercase tracking-wider">
              Desglose del presupuesto
            </h4>
          </div>

          <div className="space-y-2 mb-3">
            {plan.budgetBreakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F2E8D7]">
                <span className="text-[#56605A]">{item.concept}</span>
                <span className="font-extrabold text-[#232925]">
                  {item.amount === 0 ? 'Gratis' : `${plan.currency === 'USD' ? '$' : 'C$'}${item.amount}`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-black pt-1 text-[#0755A1]">
            <span>Total estimado para el grupo:</span>
            <span className="text-sm font-extrabold">
              {plan.estimatedCost === 0 ? 'C$ 0' : `${plan.currency === 'USD' ? '$' : 'C$'}${plan.estimatedCost}`}
            </span>
          </div>
          <p className="text-[10px] text-[#8E9792] mt-2">
            *Precios estimados sin afiliados ni comercios forzados.
          </p>
        </div>

        {/* Qué llevar (Packing list) */}
        <div className="bg-[#FFFDF8] border border-[#E8DECE] rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-[#168AAD]" />
            <h4 className="text-xs font-black text-[#232925] uppercase tracking-wider">
              Qué llevar
            </h4>
          </div>

          <ul className="space-y-2">
            {plan.packingList.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[#4E5953]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#168AAD]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Plan bajo lluvia (Rain Alternative) */}
      <div className="bg-[#FFFDF8] border border-[#E8DECE] rounded-3xl p-6 shadow-xs">
        <button
          type="button"
          onClick={() => setShowRainAlt(!showRainAlt)}
          className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
          aria-expanded={showRainAlt}
        >
          <div className="flex items-center gap-3">
            <CloudRain className="w-5 h-5 text-[#168AAD]" />
            <div>
              <h4 className="font-bold text-sm text-[#232925]">
                ¿Se vino el chaparrón? Plan alternativo por lluvia
              </h4>
              <p className="text-[11px] text-[#6C7570]">
                {showRainAlt ? 'Ocultar plan bajo techo' : 'Tocá para ver cómo adaptar la misión'}
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-[#0755A1] px-3 py-1 rounded-xl bg-[#0755A1]/10">
            {showRainAlt ? 'Cerrar' : 'Ver plan'}
          </span>
        </button>

        {showRainAlt && (
          <div className="mt-4 pt-4 border-t border-[#E8DECE] space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#EAF4F7] border border-[#C5E1E9]">
              <span className="text-xs font-extrabold text-[#0755A1] block mb-1">
                {plan.rainAlternative.title}
              </span>
              <p className="text-xs text-[#3E4741]">
                {plan.rainAlternative.description}
              </p>
            </div>
            <ul className="space-y-2 pl-2">
              {plan.rainAlternative.adjustedSteps.map((step, idx) => (
                <li key={idx} className="text-xs text-[#4E5953] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#168AAD]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar: "¡Lo hice! Sellar misión" */}
      <div className="sticky bottom-16 md:bottom-6 z-30 pt-4">
        <div className="p-3.5 bg-[#FFF9EF]/95 backdrop-blur-md border border-[#E8DECE] rounded-3xl shadow-[0_10px_35px_rgba(35,41,37,0.12)] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="hidden sm:block pl-3">
            <span className="font-display font-extrabold text-sm text-[#232925] block">
              ¿Listo para sellar tu pasaporte?
            </span>
            <span className="text-xs text-[#6C7570]">
              Marcá los pasos completados y reclamá tu sello de aventura.
            </span>
          </div>

          <button
            onClick={onCompletePlan}
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-black text-base shadow-[0_4px_16px_rgba(7,85,161,0.25)] hover:shadow-[0_6px_22px_rgba(7,85,161,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            aria-label="Completar misión y sellar pasaporte"
          >
            <Trophy className="w-5 h-5 text-[#F4C95D]" />
            <span>¡Lo hice! Sellar misión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
