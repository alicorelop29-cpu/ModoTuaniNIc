import React from 'react';
import { Sparkles, Trash2, Cpu, Smartphone } from 'lucide-react';
import { LogoSymbol } from './NicaIllustrations';

interface NavbarProps {
  activeTab: 'home' | 'saved' | 'passport';
  setActiveTab: (tab: 'home' | 'saved' | 'passport') => void;
  savedCount: number;
  stampsCount: number;
  source: 'gemini' | 'local' | null;
  onOpenReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  stampsCount,
  source,
  onOpenReset
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF9EF]/90 border-b border-[#E8DECE] transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand: Logo combining volcano & lake wave */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          aria-label="Ir al inicio de Modo Tuani"
        >
          <div className="group-hover:scale-105 transition-transform">
            <LogoSymbol className="w-10 h-10 drop-shadow-sm" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-[#232925] group-hover:text-[#0755A1] transition-colors">
                Modo Tuani
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-[#B94D35]/10 text-[#B94D35] border border-[#B94D35]/25">
                NICARAGUA
              </span>
            </div>
            <p className="text-[11px] text-[#6C7570] font-medium hidden sm:block">
              Aventuras a tu medida
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#F4ECDD] p-1 rounded-2xl border border-[#E4D8C4]" aria-label="Navegación principal">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#0755A1] text-white shadow-sm'
                : 'text-[#444E48] hover:text-[#232925] hover:bg-[#EAE0CE]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#0755A1] text-white shadow-sm'
                : 'text-[#444E48] hover:text-[#232925] hover:bg-[#EAE0CE]'
            }`}
          >
            <span>Mis planes</span>
            {savedCount > 0 && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                activeTab === 'saved' ? 'bg-[#F4C95D] text-[#232925]' : 'bg-[#B94D35] text-white'
              }`}>
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative cursor-pointer ${
              activeTab === 'passport'
                ? 'bg-[#0755A1] text-white shadow-sm'
                : 'text-[#444E48] hover:text-[#232925] hover:bg-[#EAE0CE]'
            }`}
          >
            <span>Pasaporte</span>
            {stampsCount > 0 && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                activeTab === 'passport' ? 'bg-[#F4C95D] text-[#232925]' : 'bg-[#246747] text-white'
              }`}>
                {stampsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right tools: Engine indicator & Reset button */}
        <div className="flex items-center gap-2">
          {source && (
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                source === 'gemini'
                  ? 'bg-[#168AAD]/10 text-[#0755A1] border-[#168AAD]/30'
                  : 'bg-[#246747]/10 text-[#246747] border-[#246747]/30'
              }`}
              title={source === 'gemini' ? 'Generación asistida con IA' : 'Generación local sin conexión'}
            >
              {source === 'gemini' ? (
                <>
                  <Cpu className="w-3.5 h-3.5 text-[#0755A1]" />
                  <span>Modo IA</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#246747]" />
                  <span>Modo Local</span>
                </>
              )}
            </div>
          )}

          <button
            onClick={onOpenReset}
            className="p-2 text-[#7C8781] hover:text-[#B94D35] hover:bg-[#B94D35]/10 rounded-xl transition-colors border border-transparent hover:border-[#B94D35]/20 focus:outline-none cursor-pointer"
            title="Borrar datos locales y reiniciar"
            aria-label="Borrar datos locales"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
