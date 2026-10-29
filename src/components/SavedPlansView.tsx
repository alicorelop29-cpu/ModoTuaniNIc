import React from 'react';
import { AdventurePlan } from '../types';
import { 
  Trash2, 
  Play, 
  Clock, 
  Coins, 
  Compass, 
  MapPin
} from 'lucide-react';
import { PostcardArtwork } from './NicaIllustrations';

interface SavedPlansViewProps {
  savedPlans: AdventurePlan[];
  onResumePlan: (plan: AdventurePlan) => void;
  onDeletePlan: (planId: string) => void;
  onExploreNew: () => void;
}

export const SavedPlansView: React.FC<SavedPlansViewProps> = ({
  savedPlans,
  onResumePlan,
  onDeletePlan,
  onExploreNew
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#232925] tracking-tight">
            Mis Planes Guardados
          </h1>
          <p className="text-xs sm:text-sm text-[#56605A]">
            Misiones que guardaste para hoy o para el fin de semana.
          </p>
        </div>

        <button
          onClick={onExploreNew}
          className="self-start sm:self-auto py-2.5 px-4 rounded-xl bg-[#0755A1] text-white font-bold text-xs transition-all hover:bg-[#064787] flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Generar nuevo plan</span>
        </button>
      </div>

      {savedPlans.length === 0 ? (
        <div className="p-10 sm:p-14 text-center rounded-3xl bg-[#FFFDF8] border border-[#E8DECE] space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F6EFE3] border border-[#E0D5C3] mx-auto flex items-center justify-center text-3xl">
            📌
          </div>
          <h3 className="font-display font-bold text-lg text-[#232925]">No tenés planes guardados todavía</h3>
          <p className="text-xs sm:text-sm text-[#6C7570] max-w-md mx-auto">
            Cuando te cuadre una de las 3 alternativas generadas, dale a "Guardar plan" para retomarla cuando querás con tu checklist intacta.
          </p>
          <div className="pt-2">
            <button
              onClick={onExploreNew}
              className="py-3 px-6 rounded-2xl bg-[#0755A1] text-white font-display font-black text-xs transition-all hover:bg-[#064787] shadow-sm cursor-pointer"
            >
              Armar un plan ahora
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedPlans.map((plan) => {
            const completedCount = plan.steps.filter((s) => s.isDone).length;
            const totalSteps = plan.steps.length;
            const isCompleted = plan.isCompleted || completedCount === totalSteps;
            const planType = (plan.name + ' ' + plan.description).toLowerCase();

            return (
              <article
                key={plan.id}
                className="bg-[#FFFDF8] border border-[#E8DECE] hover:border-[#168AAD]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="relative border-b border-[#E8DECE]">
                    <PostcardArtwork type={planType} className="w-full h-32" />
                    <button
                      onClick={() => onDeletePlan(plan.id)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-[#FFF9EF]/95 text-[#7C8781] hover:text-[#B94D35] hover:bg-white transition-colors cursor-pointer shadow-xs"
                      title="Eliminar este plan"
                      aria-label="Eliminar plan guardado"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold">
                      <span className="text-[#B94D35] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{plan.city}</span>
                      </span>
                      <span className="text-[#C4B7A4]">•</span>
                      <span className="text-[#168AAD] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{plan.durationLabel}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-[#232925] leading-tight mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-bold text-[#B94D35] mb-2">
                      {plan.tagline}
                    </p>
                    <p className="text-xs text-[#56605A] line-clamp-2 mb-4 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Progress & metrics */}
                    <div className="space-y-1.5 mb-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#6C7570]">
                        <span>Progreso de pasos:</span>
                        <span className={isCompleted ? 'text-[#246747] font-black' : 'text-[#232925]'}>
                          {completedCount} / {totalSteps} {isCompleted && '✓'}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#F2E8D7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#246747] rounded-full"
                          style={{ width: `${Math.round((completedCount / totalSteps) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#6C7570] pt-2">
                      <span className="font-bold text-[#232925] flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-[#F4C95D]" />
                        <span>
                          {plan.estimatedCost === 0
                            ? 'C$ 0 (¡Gratis!)'
                            : `${plan.currency === 'USD' ? '$' : 'C$'}${plan.estimatedCost}`}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onResumePlan(plan)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompleted ? 'Ver misión cumplida' : 'Retomar misión'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
