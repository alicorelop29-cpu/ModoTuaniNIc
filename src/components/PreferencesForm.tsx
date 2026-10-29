import React from 'react';
import { PlanPreferences, Duration, Company, Mood, Preference, Currency } from '../types';
import { 
  MapPin, 
  Coins, 
  Clock, 
  Users, 
  Smile, 
  Home, 
  Compass, 
  Shuffle, 
  Plus, 
  Minus,
  Check,
  Sparkles
} from 'lucide-react';
import { SacuanjocheAccent } from './NicaIllustrations';

interface PreferencesFormProps {
  preferences: PlanPreferences;
  onChange: (prefs: PlanPreferences) => void;
  onSubmit: () => void;
  onSurpriseMe: () => void;
  isLoading: boolean;
}

const CITY_PRESETS = [
  'Managua',
  'Granada',
  'León',
  'Matagalpa',
  'San Juan del Sur',
  'Estelí',
  'Masaya',
  'En casa / Mi barrio'
];

const DURATION_OPTIONS: { value: Duration; label: string; detail: string }[] = [
  { value: '30min', label: '30 min', detail: 'Exprés' },
  { value: '1h', label: '1 hora', detail: 'Puntual' },
  { value: '3h', label: '3 horas', detail: 'Tarde tuani' },
  { value: 'full_day', label: 'Todo el día', detail: 'De viaje' }
];

const COMPANY_OPTIONS: { value: Company; label: string; icon: string }[] = [
  { value: 'solo', label: 'Solo', icon: '👤' },
  { value: 'couple', label: 'Pareja', icon: '❤️' },
  { value: 'friends', label: 'Amigos', icon: '🍻' },
  { value: 'family', label: 'Familia', icon: '🏡' }
];

const MOOD_OPTIONS: { value: Mood; label: string; icon: string; desc: string }[] = [
  { value: 'tranquilo', label: 'Tranquilo', icon: '🍃', desc: 'Brisa fresca, sombra y cero carreras' },
  { value: 'aventurero', label: 'Aventurero', icon: '🌋', desc: 'Senderos, miradores y paisajes abiertos' },
  { value: 'creativo', label: 'Creativo', icon: '🏺', desc: 'Artesanías, fotografía y buenas ideas' },
  { value: 'romantico', label: 'Romántico', icon: '☕', desc: 'Atardecer, cafecito y plática sincera' },
  { value: 'rutina', label: 'Sacame de la rutina', icon: '⚡', desc: '¡Una experiencia totalmente imprevista!' }
];

const PREFERENCE_OPTIONS: { value: Preference; label: string; icon: any }[] = [
  { value: 'afuera', label: 'Afuera', icon: Compass },
  { value: 'casa', label: 'En casa', icon: Home },
  { value: 'cualquiera', label: 'Donde sea', icon: Shuffle }
];

export const PreferencesForm: React.FC<PreferencesFormProps> = ({
  preferences,
  onChange,
  onSubmit,
  onSurpriseMe,
  isLoading
}) => {
  const updateField = <K extends keyof PlanPreferences>(field: K, val: PlanPreferences[K]) => {
    onChange({
      ...preferences,
      [field]: val
    });
  };

  const handleCurrencyToggle = (curr: Currency) => {
    if (curr === preferences.currency) return;
    const newBudget = curr === 'USD' 
      ? Math.round(preferences.budget / 36.5) 
      : Math.round(preferences.budget * 36.5);
    onChange({
      ...preferences,
      currency: curr,
      budget: newBudget
    });
  };

  const handlePeopleCountChange = (delta: number) => {
    const next = Math.max(1, Math.min(20, preferences.peopleCount + delta));
    updateField('peopleCount', next);
  };

  return (
    <div className="bg-[#FFFDF8] border border-[#E8DECE] rounded-3xl p-6 sm:p-9 shadow-[0_8px_30px_rgba(35,41,37,0.06)] relative overflow-hidden">
      {/* Decorative floral accent */}
      <div className="absolute top-5 right-5 opacity-80 pointer-events-none">
        <SacuanjocheAccent className="w-8 h-8" />
      </div>

      <div className="mb-7">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168AAD]/10 text-[#0755A1] text-xs font-black tracking-wide uppercase mb-2">
          <span>PLANES A TU MEDIDA</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#232925] tracking-tight leading-snug">
          Armá tu próxima salida
        </h2>
        <p className="text-sm sm:text-base text-[#56605A] mt-1 max-w-xl">
          Elegí lo que te cuadre y te preparamos tres opciones reales con presupuesto controlado.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-7"
      >
        {/* 1. ¿Por dónde andás? */}
        <div className="space-y-2.5">
          <label htmlFor="city-input" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
            <MapPin className="w-4 h-4 text-[#B94D35]" />
            <span>¿Por dónde andás?</span>
          </label>
          <input
            id="city-input"
            type="text"
            required
            value={preferences.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Ej: Managua, Granada, León, Matagalpa, Las Colinas..."
            className="w-full bg-[#FAF5EC] border border-[#E0D5C3] focus:border-[#0755A1] focus:bg-white focus:ring-2 focus:ring-[#0755A1]/15 rounded-2xl px-4 py-3.5 text-[#232925] placeholder-[#909A94] text-sm font-semibold transition-all"
          />
          {/* Quick city chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {CITY_PRESETS.map((c) => {
              const isSelected = preferences.city === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateField('city', c)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0755A1] border-[#0755A1] text-white font-bold shadow-xs'
                      : 'bg-[#F6EFE3] border-[#E8DEC9] text-[#55605A] hover:text-[#232925] hover:bg-[#EFE5D5]'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. ¿Cuánto querés gastar? */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label htmlFor="budget-input" className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
              <Coins className="w-4 h-4 text-[#F4C95D]" />
              <span>¿Cuánto querés gastar?</span>
            </label>
            {/* Currency toggle */}
            <div className="flex items-center bg-[#F2E8D7] border border-[#E0D5C3] rounded-xl p-0.5" role="group" aria-label="Moneda">
              <button
                type="button"
                onClick={() => handleCurrencyToggle('NIO')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  preferences.currency === 'NIO'
                    ? 'bg-[#0755A1] text-white shadow-xs'
                    : 'text-[#6C7570] hover:text-[#232925]'
                }`}
              >
                C$ (NIO)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyToggle('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  preferences.currency === 'USD'
                    ? 'bg-[#0755A1] text-white shadow-xs'
                    : 'text-[#6C7570] hover:text-[#232925]'
                }`}
              >
                $ (USD)
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              id="budget-input"
              type="number"
              min="0"
              step="10"
              value={preferences.budget}
              onChange={(e) => updateField('budget', Math.max(0, parseInt(e.target.value || '0', 10)))}
              className="w-full bg-[#FAF5EC] border border-[#E0D5C3] focus:border-[#B94D35] focus:bg-white focus:ring-2 focus:ring-[#B94D35]/15 rounded-2xl pl-11 pr-4 py-3.5 text-[#232925] text-base font-extrabold transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C8781] font-black text-sm">
              {preferences.currency === 'USD' ? '$' : 'C$'}
            </span>
          </div>

          {/* Quick budget chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[0, 150, 350, 700, 1500].map((b) => {
              const val = preferences.currency === 'USD' ? Math.round(b / 36.5) : b;
              const isSelected = preferences.budget === val;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateField('budget', val)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#B94D35] border-[#B94D35] text-white font-bold shadow-xs'
                      : 'bg-[#F6EFE3] border-[#E8DEC9] text-[#55605A] hover:text-[#232925] hover:bg-[#EFE5D5]'
                  }`}
                >
                  {val === 0 ? '✨ C$ 0 (¡Gratis!)' : `${preferences.currency === 'USD' ? '$' : 'C$'}${val}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ¿Cuánto tiempo tenés? */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
            <Clock className="w-4 h-4 text-[#168AAD]" />
            <span>¿Cuánto tiempo tenés?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="group" aria-label="Tiempo disponible">
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = preferences.duration === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField('duration', opt.value)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0755A1] text-white border-[#0755A1] font-bold shadow-sm'
                      : 'bg-[#FAF5EC] border-[#E4D9C8] text-[#3D4742] hover:bg-[#F2E8D7]'
                  }`}
                >
                  <span className="text-sm font-black">{opt.label}</span>
                  <span className={`text-[11px] ${isSelected ? 'text-[#F4C95D] font-bold' : 'text-[#7C8781]'}`}>
                    {opt.detail}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. ¿Quién se apunta? */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
            <Users className="w-4 h-4 text-[#B94D35]" />
            <span>¿Quién se apunta?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="group" aria-label="Compañía">
            {COMPANY_OPTIONS.map((c) => {
              const isSelected = preferences.company === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    updateField('company', c.value);
                    if (c.value === 'solo') updateField('peopleCount', 1);
                    else if (c.value === 'couple') updateField('peopleCount', 2);
                    else if (preferences.peopleCount < 2) updateField('peopleCount', 3);
                  }}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#B94D35] text-white border-[#B94D35] font-bold shadow-sm'
                      : 'bg-[#FAF5EC] border-[#E4D9C8] text-[#3D4742] hover:bg-[#F2E8D7]'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span className="text-xs font-bold">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* People Count Stepper if not solo */}
          {preferences.company !== 'solo' && (
            <div className="flex items-center justify-between bg-[#F7EFE1] border border-[#E2D5C0] rounded-2xl px-4 py-2.5 mt-2">
              <span className="text-xs font-bold text-[#444E48]">
                Cantidad total de personas:
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePeopleCountChange(-1)}
                  disabled={preferences.peopleCount <= 2}
                  className="w-8 h-8 rounded-xl bg-white border border-[#D8CABE] hover:bg-[#EFE5D5] disabled:opacity-40 flex items-center justify-center text-[#232925] transition-colors cursor-pointer"
                  aria-label="Disminuir personas"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display font-black text-base text-[#232925] w-6 text-center">
                  {preferences.peopleCount}
                </span>
                <button
                  type="button"
                  onClick={() => handlePeopleCountChange(1)}
                  disabled={preferences.peopleCount >= 15}
                  className="w-8 h-8 rounded-xl bg-white border border-[#D8CABE] hover:bg-[#EFE5D5] disabled:opacity-40 flex items-center justify-center text-[#232925] transition-colors cursor-pointer"
                  aria-label="Aumentar personas"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. ¿Qué se te antoja hoy? */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
            <Smile className="w-4 h-4 text-[#246747]" />
            <span>¿Qué se te antoja hoy?</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Estado de ánimo">
            {MOOD_OPTIONS.map((m) => {
              const isSelected = preferences.mood === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => updateField('mood', m.value)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0755A1] ring-2 ring-[#0755A1]/20 text-[#232925] shadow-xs'
                      : 'bg-[#FAF5EC] border-[#E4D9C8] text-[#3D4742] hover:bg-[#F2E8D7]'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-[#F0E6D5]">{m.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-extrabold ${isSelected ? 'text-[#0755A1]' : 'text-[#232925]'}`}>
                        {m.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#0755A1]" />}
                    </div>
                    <p className="text-[11px] text-[#6C7570] mt-0.5 leading-snug">
                      {m.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. ¿Dónde preferís? */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#232925]">
            <Home className="w-4 h-4 text-[#B94D35]" />
            <span>¿Dónde preferís?</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Preferencia de espacio">
            {PREFERENCE_OPTIONS.map((pref) => {
              const isSelected = preferences.preference === pref.value;
              const Icon = pref.icon;
              return (
                <button
                  key={pref.value}
                  type="button"
                  onClick={() => updateField('preference', pref.value)}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#168AAD] border-[#168AAD] text-white font-bold shadow-xs'
                      : 'bg-[#FAF5EC] border-[#E4D9C8] text-[#55605A] hover:bg-[#F2E8D7]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#168AAD]'}`} />
                  <span className="text-xs font-bold">{pref.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-4 px-6 rounded-2xl bg-[#0755A1] hover:bg-[#064787] text-white font-display font-extrabold text-base transition-all shadow-[0_4px_16px_rgba(7,85,161,0.25)] hover:shadow-[0_6px_22px_rgba(7,85,161,0.35)] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Compass className="w-5 h-5 stroke-[2.3]" />
            <span>{isLoading ? 'Armando tu plan...' : 'Armame un plan'}</span>
          </button>

          <button
            type="button"
            onClick={onSurpriseMe}
            disabled={isLoading}
            className="py-4 px-6 rounded-2xl bg-white hover:bg-[#FDF4E3] border-2 border-[#B94D35] text-[#B94D35] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-[#B94D35]" />
            <span>Sorprendeme</span>
          </button>
        </div>
      </form>
    </div>
  );
};
