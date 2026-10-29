import React from 'react';
import { Compass, BookmarkCheck, Award } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'saved' | 'passport';
  setActiveTab: (tab: 'home' | 'saved' | 'passport') => void;
  savedCount: number;
  stampsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  stampsCount
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9EF]/95 backdrop-blur-lg border-t border-[#E8DECE] px-6 py-2.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(35,41,37,0.06)]"
      aria-label="Navegación inferior"
    >
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl cursor-pointer ${
          activeTab === 'home'
            ? 'text-[#0755A1] font-extrabold'
            : 'text-[#6C7570] hover:text-[#232925]'
        }`}
        aria-label="Ir a Inicio"
      >
        <div className={`p-1.5 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-[#0755A1]/10' : ''}`}>
          <Compass className="w-5 h-5 stroke-[2.3]" />
        </div>
        <span className="text-[11px] tracking-tight">Inicio</span>
      </button>

      <button
        onClick={() => setActiveTab('saved')}
        className={`flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl relative cursor-pointer ${
          activeTab === 'saved'
            ? 'text-[#0755A1] font-extrabold'
            : 'text-[#6C7570] hover:text-[#232925]'
        }`}
        aria-label="Ir a Mis planes"
      >
        <div className={`p-1.5 rounded-xl relative transition-colors ${activeTab === 'saved' ? 'bg-[#0755A1]/10' : ''}`}>
          <BookmarkCheck className="w-5 h-5 stroke-[2.3]" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B94D35] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
              {savedCount}
            </span>
          )}
        </div>
        <span className="text-[11px] tracking-tight">Mis planes</span>
      </button>

      <button
        onClick={() => setActiveTab('passport')}
        className={`flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl relative cursor-pointer ${
          activeTab === 'passport'
            ? 'text-[#0755A1] font-extrabold'
            : 'text-[#6C7570] hover:text-[#232925]'
        }`}
        aria-label="Ir a Pasaporte"
      >
        <div className={`p-1.5 rounded-xl relative transition-colors ${activeTab === 'passport' ? 'bg-[#0755A1]/10' : ''}`}>
          <Award className="w-5 h-5 stroke-[2.3]" />
          {stampsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#246747] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
              {stampsCount}
            </span>
          )}
        </div>
        <span className="text-[11px] tracking-tight">Pasaporte</span>
      </button>
    </nav>
  );
};
