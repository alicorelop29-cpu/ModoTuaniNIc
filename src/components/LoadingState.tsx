import React, { useEffect, useState } from 'react';
import { LogoSymbol } from './NicaIllustrations';

const LOADING_PHRASES = [
  'Buscando cómo salvarte del aburrimiento…',
  'Revisando rutas tuanis entre lagos y volcanes…',
  'Calculando el presupuesto para que no gastés de más…',
  'Alistando una misión para vos y tu gente…',
  'Ajustando los pasos con toda la vibra de Nicaragua…'
];

export const LoadingState: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
      {/* Animated badge */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-[#FFFDF8] border-2 border-[#E2D5C0] flex items-center justify-center shadow-md animate-pulse">
          <LogoSymbol className="w-12 h-12" />
        </div>
      </div>

      <h3 className="font-display font-black text-2xl text-[#232925] tracking-tight mb-2">
        Preparando aventuras tuanis
      </h3>

      <div className="h-8 flex items-center justify-center">
        <p className="text-sm sm:text-base text-[#0755A1] font-bold transition-all duration-300">
          {LOADING_PHRASES[index]}
        </p>
      </div>

      <p className="text-xs text-[#6C7570] mt-3 max-w-sm">
        Sin inventar negocios ni precios fantasma. Todo pensado para que solo te preocupés por disfrutar.
      </p>
    </div>
  );
};
