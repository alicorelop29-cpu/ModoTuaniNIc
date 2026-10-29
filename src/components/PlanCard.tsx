import React from 'react';
import { AdventurePlan } from '../types';
import { Clock, Coins, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PostcardArtwork, WaveDivider } from './NicaIllustrations';

interface PlanCardProps {
  plan: AdventurePlan;
  onSelect: (plan: AdventurePlan) => void;
  index: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, index }) => {
  // Determine artwork theme based on title or index
  const planType = (plan.name + ' ' + plan.description).toLowerCase();

  return (
    <article className="group bg-[#FFFDF8] border border-[#E8DECE] hover:border-[#168AAD]/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(35,41,37,0.06)] hover:shadow-[0_10px_30px_rgba(35,41,37,0.12)]">
      <div>
        {/* Top Postcard Artwork */}
        <div className="relative border-b border-[#E8DECE]/80">
          <PostcardArtwork type={planType} className="w-full h-40 sm:h-44" />
          
          {/* Energy Tag badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF9EF]/95 text-[#232925] border border-[#E0D5C3] shadow-xs">
              {plan.energyLevel}
            </span>
          </div>

          {/* Budget pill on top right */}
          <div className="absolute top-3 right-3">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-[#0755A1] text-white shadow-xs flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-[#F4C95D]" />
              <span>
                {plan.estimatedCost === 0
                  ? 'C$ 0 (¡Gratis!)'
                  : `${plan.currency === 'USD' ? '$' : 'C$'}${plan.estimatedCost}`}
              </span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Location & Duration Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-bold text-[#6C7570]">
            <span className="flex items-center gap-1 text-[#B94D35]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{plan.city}</span>
            </span>
            <span className="text-[#C4B7A4]">•</span>
            <span className="flex items-center gap-1 text-[#168AAD]">
              <Clock className="w-3.5 h-3.5" />
              <span>{plan.durationLabel}</span>
            </span>
          </div>

          {/* Title in expressive Fraunces serif */}
          <h3 className="font-display font-extrabold text-xl text-[#232925] group-hover:text-[#0755A1] transition-colors leading-tight mb-1.5">
            {plan.name}
          </h3>

          <p className="text-xs font-bold text-[#B94D35] mb-3">
            {plan.tagline}
          </p>

          <p className="text-sm text-[#4E5953] leading-relaxed mb-4">
            {plan.description}
          </p>

          {/* Subtle wave separator */}
          <div className="py-1">
            <WaveDivider className="w-full h-3 text-[#168AAD]/30" />
          </div>

          {/* Why it fits card */}
          <div className="p-3.5 rounded-2xl bg-[#F8F2E6] border border-[#E8DEC9] mt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#0755A1] mb-1">
              <Sparkles className="w-3 h-3 text-[#F4C95D] fill-[#F4C95D]" />
              <span>Por qué te cuadra</span>
            </div>
            <p className="text-xs text-[#3A443E] leading-relaxed">
              {plan.fitReason}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onSelect(plan)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:translate-y-[-1px]"
          aria-label={`Elegir misión: ${plan.name}`}
        >
          <span>Dale viaje con este</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};
