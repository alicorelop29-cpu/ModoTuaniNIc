import React from 'react';
import { Stamp, AdventurePlan } from '../types';
import { STAMP_CATALOG } from '../utils/stamps';
import { Award, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { WaveDivider, SacuanjocheAccent } from './NicaIllustrations';

interface PassportViewProps {
  stamps: Stamp[];
  completedPlans: AdventurePlan[];
  onStartAdventure: () => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  stamps,
  completedPlans,
  onStartAdventure
}) => {
  const earnedIds = new Set(stamps.map((s) => s.id));
  const uniqueUnlockedCount = earnedIds.size;
  const totalCompletedMissions = stamps.length;
  const cities = new Set(stamps.map((s) => s.city).filter(Boolean));

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Travel Journal Passport Header */}
      <div className="relative bg-[#FFFDF8] border-2 border-[#E2D5C0] rounded-3xl p-6 sm:p-9 shadow-[0_8px_30px_rgba(35,41,37,0.06)] overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
          <SacuanjocheAccent className="w-32 h-32" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#0755A1] text-white flex items-center justify-center shadow-sm">
                <Award className="w-7 h-7 text-[#F4C95D]" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#B94D35] block">
                  REPÚBLICA DE AVENTURAS TUANIS
                </span>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-[#232925] tracking-tight">
                  Pasaporte de Aventuras
                </h1>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#F5ECDC] border border-[#E0D3BE] text-xs font-bold text-[#3D4742] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4C95D] fill-[#F4C95D]" />
              <span>Bitácora oficial de exploración</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-center">
              <span className="block font-display text-2xl sm:text-3xl font-black text-[#0755A1]">
                {totalCompletedMissions}
              </span>
              <span className="text-[11px] font-bold text-[#6C7570]">
                Misiones hechas
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-center">
              <span className="block font-display text-2xl sm:text-3xl font-black text-[#B94D35]">
                {uniqueUnlockedCount} <span className="text-sm font-bold text-[#9DA7A1]">/ {STAMP_CATALOG.length}</span>
              </span>
              <span className="text-[11px] font-bold text-[#6C7570]">
                Sellos únicos
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-center">
              <span className="block font-display text-2xl sm:text-3xl font-black text-[#168AAD]">
                {cities.size > 0 ? cities.size : '1'}
              </span>
              <span className="text-[11px] font-bold text-[#6C7570]">
                Zonas exploradas
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-center">
              <span className="block font-display text-2xl sm:text-3xl font-black text-[#246747]">
                0%
              </span>
              <span className="text-[11px] font-bold text-[#6C7570]">
                Aburrimiento
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stamp Album Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#232925]">Colección de Sellos</h2>
            <p className="text-xs text-[#6C7570]">
              Insignias inspiradas en volcanes, lagos, arquitectura, café y la naturaleza de Nicaragua.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {STAMP_CATALOG.map((s, idx) => {
            const isUnlocked = earnedIds.has(s.id);
            const earnedCount = stamps.filter((st) => st.id === s.id).length;

            return (
              <div
                key={s.id}
                className={`p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center text-center relative ${
                  isUnlocked
                    ? 'bg-[#FFFDF8] border-[#E0D5C3] shadow-xs hover:shadow-md hover:-translate-y-0.5'
                    : 'bg-[#F6EFE3]/50 border-[#E8DEC9] opacity-40 grayscale'
                }`}
              >
                {/* Count badge */}
                {earnedCount > 1 && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#0755A1] text-white text-[10px] font-black">
                    x{earnedCount}
                  </span>
                )}

                {/* Hand-pressed Stamp visual with varied geometric styles */}
                <div
                  className={`w-16 h-16 flex items-center justify-center text-2xl mb-2.5 transition-transform ${
                    idx % 3 === 0 ? 'rounded-full border-2 border-dashed' :
                    idx % 3 === 1 ? 'rounded-2xl border-2' :
                    'rounded-full border-2 border-double'
                  }`}
                  style={{
                    borderColor: isUnlocked ? s.color : '#A5AFA9',
                    backgroundColor: isUnlocked ? `${s.color}15` : 'transparent',
                    boxShadow: isUnlocked ? `0 2px 10px ${s.color}20` : 'none'
                  }}
                >
                  <span>{s.symbol}</span>
                </div>

                <h3 className="font-display font-bold text-xs text-[#232925] leading-tight mb-1">{s.name}</h3>
                <span className="text-[10px] text-[#6C7570] block line-clamp-2 leading-snug">
                  {s.description}
                </span>

                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#246747]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Desbloqueado</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#8E9792] font-semibold">Por desbloquear</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adventure Journal / History */}
      <div className="space-y-4">
        <h2 className="font-display font-extrabold text-xl text-[#232925]">Bitácora de Misiones</h2>

        {stamps.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#FFFDF8] border border-[#E8DECE] space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-[#F6EFE3] border border-[#E0D5C3] mx-auto flex items-center justify-center text-3xl">
              🗺️
            </div>
            <h3 className="font-display font-bold text-lg text-[#232925]">Tu pasaporte todavía está nuevecito</h3>
            <p className="text-xs sm:text-sm text-[#6C7570] max-w-sm mx-auto">
              Elegí un plan en el Inicio, completá los pasos y sellá tu primera misión para estrenar tu bitácora.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartAdventure}
                className="py-3 px-6 rounded-2xl bg-[#0755A1] text-white font-display font-black text-xs transition-all hover:bg-[#064787] shadow-sm cursor-pointer"
              >
                Comenzar mi primera aventura
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {stamps.map((stamp, idx) => {
              const formattedDate = stamp.earnedAt
                ? new Date(stamp.earnedAt).toLocaleDateString('es-NI', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Recientemente';

              return (
                <div
                  key={`${stamp.id}-${idx}`}
                  className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8] border border-[#E8DECE] hover:border-[#D8CABE] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl border-2 border-dashed flex items-center justify-center text-2xl shrink-0"
                      style={{
                        borderColor: stamp.color,
                        backgroundColor: `${stamp.color}15`
                      }}
                    >
                      <span>{stamp.symbol}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display font-black text-base sm:text-lg text-[#232925]">
                          {stamp.planTitle || stamp.name}
                        </h4>
                        <span
                          className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase"
                          style={{ backgroundColor: `${stamp.color}20`, color: stamp.color }}
                        >
                          {stamp.name}
                        </span>
                      </div>

                      {stamp.note && (
                        <p className="text-xs text-[#444E48] italic mt-1.5 bg-[#FAF5EB] px-3 py-2 rounded-xl border border-[#EADFCF]">
                          "{stamp.note}"
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-[#6C7570] mt-2 font-semibold">
                        {stamp.city && (
                          <span className="flex items-center gap-1 text-[#B94D35]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{stamp.city}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#168AAD]" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-xl bg-[#246747]/10 text-[#246747] border border-[#246747]/20 text-xs font-black self-end sm:self-center">
                    Misión superada
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
