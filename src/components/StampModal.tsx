import React, { useState } from 'react';
import { AdventurePlan, Stamp } from '../types';
import { STAMP_CATALOG, getRecommendedStampId } from '../utils/stamps';
import { Sparkles, X, Award } from 'lucide-react';
import { SacuanjocheAccent } from './NicaIllustrations';

interface StampModalProps {
  plan: AdventurePlan;
  onClose: () => void;
  onSaveStamp: (stampId: string, note: string) => void;
}

export const StampModal: React.FC<StampModalProps> = ({
  plan,
  onClose,
  onSaveStamp
}) => {
  const hasTwistDone = Boolean(plan.activeTwist?.isDone);
  const recommendedId = getRecommendedStampId(
    plan.mood,
    plan.city.toLowerCase().includes('casa') ? 'casa' : 'afuera',
    plan.estimatedCost,
    hasTwistDone
  );

  const [selectedStampId, setSelectedStampId] = useState(recommendedId);
  const [note, setNote] = useState('');

  const currentStamp = STAMP_CATALOG.find((s) => s.id === selectedStampId) || STAMP_CATALOG[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232925]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#E0D5C3] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_50px_rgba(35,41,37,0.2)] relative overflow-hidden">
        {/* Soft background glow based on stamp color */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: currentStamp.color }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7C8781] hover:text-[#232925] bg-[#F4ECE0] hover:bg-[#EAE0CE] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168AAD]/10 text-[#0755A1] text-xs font-black tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span>¡MISIÓN CUMPLIDA!</span>
          </div>

          <h2 className="font-display font-black text-2xl text-[#232925] tracking-tight">
            ¡Qué salvaje, la armaste!
          </h2>
          <p className="text-xs text-[#56605A] mt-1">
            Has completado la aventura. Reclamá tu sello oficial para el Pasaporte de Aventuras.
          </p>

          {/* Stamped Ink Seal Visual */}
          <div className="my-6 flex flex-col items-center">
            <div
              className="w-28 h-28 rounded-full border-4 border-dashed p-3 flex flex-col items-center justify-center relative transition-transform hover:scale-105 shadow-sm"
              style={{
                borderColor: currentStamp.color,
                backgroundColor: `${currentStamp.color}10`,
                boxShadow: `0 4px 18px ${currentStamp.color}25`
              }}
            >
              <span className="text-4xl filter drop-shadow-xs">{currentStamp.symbol}</span>
              <span
                className="text-[9px] font-black uppercase tracking-widest mt-1 px-1.5 py-0.5 rounded"
                style={{ color: currentStamp.color }}
              >
                MODO TUANI
              </span>
            </div>

            <h3 className="font-display font-extrabold text-lg text-[#232925] mt-3">
              {currentStamp.name}
            </h3>
            <p className="text-xs text-[#56605A] max-w-xs">{currentStamp.description}</p>
          </div>

          {/* Stamp selector */}
          <div className="mb-5">
            <label className="text-[11px] font-black uppercase tracking-wider text-[#6C7570] block mb-2">
              Elegí el diseño de tu sello:
            </label>
            <div className="flex flex-wrap justify-center gap-1.5">
              {STAMP_CATALOG.slice(0, 5).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStampId(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedStampId === s.id
                      ? 'bg-[#0755A1] border-[#0755A1] text-white shadow-xs'
                      : 'bg-[#FAF5EC] border-[#E4D9C8] text-[#55605A] hover:bg-[#F2E8D7]'
                  }`}
                >
                  <span>{s.symbol}</span>
                  <span className="text-[10px]">{s.name.replace('Sello ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Note */}
          <div className="text-left mb-6">
            <label htmlFor="stamp-note" className="text-xs font-bold text-[#232925] block mb-1.5">
              ¿Qué fue lo más tuani de hoy? (Nota personal)
            </label>
            <textarea
              id="stamp-note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ej: El fresco de cacao estaba mortal y nos reímos un montón con las historias..."
              className="w-full bg-[#FAF5EC] border border-[#E0D5C3] focus:border-[#0755A1] focus:bg-white rounded-2xl p-3.5 text-xs text-[#232925] placeholder-[#909A94] transition-all resize-none font-medium"
            />
          </div>

          {/* Submit */}
          <button
            onClick={() => onSaveStamp(selectedStampId, note)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-black text-sm transition-all shadow-[0_4px_16px_rgba(7,85,161,0.25)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-[#F4C95D]" />
            <span>Pegar sello en mi Pasaporte</span>
          </button>
        </div>
      </div>
    </div>
  );
};
