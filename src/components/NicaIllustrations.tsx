import React from 'react';

/**
 * Logo symbol combining a volcanic cone, rising sun, and lake wave
 */
export const LogoSymbol: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sun arc */}
    <circle cx="24" cy="24" r="22" fill="#F4C95D" fillOpacity="0.25" stroke="#F4C95D" strokeWidth="1.5" />
    <circle cx="24" cy="18" r="6" fill="#F4C95D" />
    {/* Volcano cone */}
    <path
      d="M10 38L21 21C22.2 19.2 24.8 19.2 26 21L38 38H10Z"
      fill="#B94D35"
    />
    <path
      d="M21 21L23.5 24.5L25 22.5L26 21C24.8 19.2 22.2 19.2 21 21Z"
      fill="#FDF2DC"
    />
    {/* Lake waves */}
    <path
      d="M6 38C12 35 18 41 24 38C30 35 36 41 42 38"
      stroke="#0755A1"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 43C13 41 18 45 24 43C30 41 35 45 40 43"
      stroke="#168AAD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * National Flower of Nicaragua: Sacuanjoche (Plumeria)
 */
export const SacuanjocheAccent: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* 5 rounded petals with warm yellow center and soft white edges */}
    <g transform="translate(16, 16)">
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <path
          key={i}
          transform={`rotate(${deg})`}
          d="M0 0 C-4 -6 -6 -13 0 -15 C6 -13 4 -6 0 0 Z"
          fill="#FFF9EF"
          stroke="#EADECB"
          strokeWidth="0.8"
        />
      ))}
      <circle cx="0" cy="0" r="4.5" fill="#F4C95D" />
      <circle cx="0" cy="0" r="2" fill="#E8A631" />
    </g>
  </svg>
);

/**
 * Subtle wave divider inspired by Lake Cocibolca
 */
export const WaveDivider: React.FC<{ className?: string }> = ({ className = 'w-full h-4 text-[#168AAD]/30' }) => (
  <svg
    viewBox="0 0 600 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 8C75 2 125 14 200 8C275 2 325 14 400 8C475 2 525 14 600 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Hero panoramic illustration: Volcanoes, Lake, tropical flora and warm sky
 */
export const HeroPanoramicIllustration: React.FC = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#B94D35]/15 shadow-sm bg-gradient-to-b from-[#FFF0D4] via-[#FDF5E6] to-[#FFF9EF]">
      <svg
        viewBox="0 0 1000 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-56 sm:max-h-72 object-cover block select-none"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Paisaje nicaragüense con volcanes, lago y vegetación tropical"
        role="img"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F6DCAC" />
            <stop offset="45%" stopColor="#FDF0D5" />
            <stop offset="100%" stopColor="#FFF9EF" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#168AAD" />
            <stop offset="60%" stopColor="#0E6B8A" />
            <stop offset="100%" stopColor="#0755A1" />
          </linearGradient>
          <linearGradient id="volcanoGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#963E2B" />
            <stop offset="100%" stopColor="#B94D35" />
          </linearGradient>
          <linearGradient id="volcanoGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6C3024" />
            <stop offset="100%" stopColor="#873A2A" />
          </linearGradient>
        </defs>

        <rect width="1000" height="360" fill="url(#skyGrad)" />

        {/* Soft Golden Sun */}
        <circle cx="580" cy="110" r="55" fill="#F4C95D" fillOpacity="0.45" />
        <circle cx="580" cy="110" r="38" fill="#F4C95D" fillOpacity="0.75" />

        {/* Subtle cloud streaks */}
        <path
          d="M120 70C160 65 240 75 300 70C340 67 400 74 440 70"
          stroke="#FFF9EF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M620 60C680 56 760 64 820 58C860 54 910 60 940 58"
          stroke="#FFF9EF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Distant Mountain Range (Isla de Ometepe / Cordillera de los Maribios) */}
        <path
          d="M0 240L140 160C160 148 185 148 205 160L330 240H0Z"
          fill="#D9B48F"
          fillOpacity="0.5"
        />
        <path
          d="M680 240L790 140C810 120 840 120 860 140L980 240H680Z"
          fill="#C48E75"
          fillOpacity="0.4"
        />

        {/* Midground Iconic Volcan Momotombo Cone */}
        <path
          d="M260 250L440 95C448 88 462 88 470 95L660 250H260Z"
          fill="url(#volcanoGrad1)"
        />
        {/* Crater rim smoke hint */}
        <path
          d="M445 92C455 90 462 90 470 92L475 97H440L445 92Z"
          fill="#FFF9EF"
          fillOpacity="0.4"
        />
        <path
          d="M455 85C450 78 460 70 455 62"
          stroke="#FFF9EF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Second Twin Volcano peak */}
        <path
          d="M560 255L690 125C698 117 712 117 720 125L860 255H560Z"
          fill="url(#volcanoGrad2)"
        />

        {/* Lake Cocibolca water body */}
        <path
          d="M0 235 Q 250 228, 500 235 T 1000 235 L 1000 360 L 0 360 Z"
          fill="url(#waterGrad)"
        />

        {/* Lake ripples & reflections */}
        <path
          d="M480 245 C520 243, 560 247, 600 245"
          stroke="#F4C95D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M430 255 C490 253, 550 257, 620 255"
          stroke="#F4C95D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <path
          d="M100 260 C220 256, 340 262, 460 260"
          stroke="#5CB9D4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M580 270 C700 266, 820 272, 940 270"
          stroke="#5CB9D4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M200 285 C350 280, 500 288, 680 285"
          stroke="#8BD3E6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Small Traditional Wooden Sailboat on the Lake */}
        <g transform="translate(620, 248) scale(0.75)">
          <path d="M0 12 Q 15 18, 32 12 L 28 8 L 4 8 Z" fill="#6C3024" />
          <line x1="16" y1="8" x2="16" y2="-12" stroke="#232925" strokeWidth="1.5" />
          <path d="M16 -10 L 28 4 L 16 4 Z" fill="#FFF9EF" fillOpacity="0.85" />
        </g>

        {/* Foreground Tropical Shoreline & Vegetation (Jícaros, Ceiba, Palm fronds) */}
        {/* Left greenery bluff */}
        <path
          d="M-20 360 L -20 260 Q 60 250, 140 280 Q 200 300, 220 360 Z"
          fill="#246747"
        />
        <path
          d="M-10 360 L -10 280 Q 50 275, 110 305 Q 160 325, 180 360 Z"
          fill="#1C5238"
        />

        {/* Tropical Palm Fronds silhouette on left */}
        <g transform="translate(45, 250) scale(0.9)">
          <path d="M0 60 Q 15 25, 45 0" stroke="#163E2B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M45 0 C 40 10, 30 20, 15 25" stroke="#246747" strokeWidth="2.5" fill="none" />
          <path d="M45 0 C 42 15, 38 30, 25 35" stroke="#246747" strokeWidth="2.5" fill="none" />
          <path d="M45 0 C 48 10, 52 25, 40 40" stroke="#246747" strokeWidth="2.5" fill="none" />
        </g>

        {/* Right shoreline bluff with warm sandy beach */}
        <path
          d="M820 360 Q 860 300, 940 285 Q 980 280, 1020 290 L 1020 360 Z"
          fill="#E5C79E"
        />
        <path
          d="M870 360 Q 900 310, 960 300 Q 995 298, 1020 310 L 1020 360 Z"
          fill="#246747"
        />

        {/* Delicate Sacuanjoche Blossom cluster on lower right */}
        <g transform="translate(880, 315) scale(0.85)">
          <circle cx="0" cy="0" r="14" fill="#FFF9EF" stroke="#EADECB" />
          <circle cx="0" cy="0" r="5" fill="#F4C95D" />
          <circle cx="22" cy="10" r="11" fill="#FFF9EF" stroke="#EADECB" />
          <circle cx="22" cy="10" r="4" fill="#F4C95D" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Illustrated Postcard Artworks for the plans
 */
export const PostcardArtwork: React.FC<{ type: string; className?: string }> = ({
  type,
  className = 'w-full h-36'
}) => {
  if (type.includes('mirador') || type.includes('volcan') || type.includes('viento')) {
    // Volcano & Mountain Panoramic Postcard
    return (
      <div className={`relative overflow-hidden bg-[#F6EFE3] ${className}`}>
        <svg viewBox="0 0 400 180" className="w-full h-full object-cover block" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="180" fill="#F7EADB" />
          <circle cx="280" cy="65" r="30" fill="#F4C95D" fillOpacity="0.7" />
          {/* Volcanic ridge */}
          <path d="M0 180 L 120 70 Q 140 55, 160 70 L 290 180 Z" fill="#B94D35" />
          <path d="M180 180 L 270 95 Q 285 85, 300 95 L 410 180 Z" fill="#933924" />
          {/* Valley green slopes */}
          <path d="M-20 180 Q 80 130, 220 150 Q 320 160, 420 180 Z" fill="#246747" />
          <path d="M0 165 C 50 160, 100 170, 160 165 C 220 160, 280 170, 340 165" stroke="#FFF9EF" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Tiny hiker marker */}
          <circle cx="160" cy="148" r="3" fill="#F4C95D" />
          <path d="M160 151 L 160 158" stroke="#232925" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (type.includes('safari') || type.includes('urbano') || type.includes('esquinas') || type.includes('calle')) {
    // Colonial Architecture & Street Postcard (Granada / León style)
    return (
      <div className={`relative overflow-hidden bg-[#F6EFE3] ${className}`}>
        <svg viewBox="0 0 400 180" className="w-full h-full object-cover block" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="180" fill="#FDF3E3" />
          {/* Warm sky with terracotta tile roofs */}
          <path d="M0 180 L 0 75 L 140 75 L 140 60 L 240 60 L 240 70 L 400 70 L 400 180 Z" fill="#E8DEC9" />
          {/* Roof tiles */}
          <path d="M-10 75 L 150 75" stroke="#B94D35" strokeWidth="5" strokeLinecap="round" />
          <path d="M130 60 L 250 60" stroke="#B94D35" strokeWidth="6" strokeLinecap="round" />
          <path d="M230 70 L 410 70" stroke="#B94D35" strokeWidth="5" strokeLinecap="round" />
          {/* Colonial Facades & Archways */}
          {/* Left yellow wall with tall colonial window */}
          <rect x="25" y="90" width="80" height="90" fill="#F4C95D" fillOpacity="0.85" />
          <rect x="45" y="105" width="40" height="55" rx="20" fill="#232925" />
          <path d="M45 130 L 85 130" stroke="#FFF9EF" strokeWidth="1.5" />
          <path d="M65 105 L 65 160" stroke="#FFF9EF" strokeWidth="1.5" />
          {/* Center Blue Colonial Archway */}
          <rect x="150" y="80" width="110" height="100" fill="#0755A1" />
          <path d="M175 180 L 175 125 C 175 110, 235 110, 235 125 L 235 180 Z" fill="#FFF9EF" />
          <circle cx="205" cy="98" r="7" fill="#F4C95D" />
          {/* Right Terracotta Facade */}
          <rect x="280" y="85" width="100" height="95" fill="#B94D35" />
          <rect x="305" y="105" width="50" height="75" fill="#1C5238" />
          {/* Cobblestone street */}
          <rect x="0" y="165" width="400" height="15" fill="#CBBBA4" />
        </svg>
      </div>
    );
  }

  if (type.includes('picnic') || type.includes('parque') || type.includes('jardin') || type.includes('aire')) {
    // Lush park, shade trees & lake breeze
    return (
      <div className={`relative overflow-hidden bg-[#F6EFE3] ${className}`}>
        <svg viewBox="0 0 400 180" className="w-full h-full object-cover block" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="180" fill="#EBF4EE" />
          {/* Distant blue lake water */}
          <path d="M0 80 Q 200 70, 400 80 L 400 180 L 0 180 Z" fill="#168AAD" fillOpacity="0.4" />
          {/* Lush grassy hill */}
          <path d="M-20 180 Q 140 100, 420 120 L 420 180 Z" fill="#246747" />
          {/* Big Shade Tree (Jícaro / Ceiba / Guanacaste) */}
          <path d="M120 180 L 120 120 Q 120 105, 110 95" stroke="#6C3024" strokeWidth="8" strokeLinecap="round" />
          <circle cx="95" cy="70" r="38" fill="#1C5238" />
          <circle cx="135" cy="65" r="42" fill="#246747" />
          <circle cx="115" cy="45" r="30" fill="#36865E" />
          {/* Picnic cloth & basket */}
          <path d="M220 150 L 270 142 L 290 162 L 235 170 Z" fill="#B94D35" />
          <path d="M225 152 L 265 146 L 280 160 L 240 166 Z" fill="#FFF9EF" fillOpacity="0.8" />
          <rect x="275" y="135" width="16" height="12" rx="2" fill="#D9A86C" />
        </svg>
      </div>
    );
  }

  // Home / Indoor / Creative Workshop (Guarida Tuani)
  return (
    <div className={`relative overflow-hidden bg-[#F6EFE3] ${className}`}>
      <svg viewBox="0 0 400 180" className="w-full h-full object-cover block" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="180" fill="#FDF3E3" />
        {/* Warm wall and colonial courtyard arch */}
        <path d="M0 0 L 400 0 L 400 180 L 0 180 Z" fill="#FFF0D4" fillOpacity="0.6" />
        {/* Spanish colonial arch */}
        <path d="M40 180 L 40 70 C 40 30, 360 30, 360 70 L 360 180 Z" fill="#FFF9EF" stroke="#E2D4BC" strokeWidth="2" />
        {/* Garden view beyond arch */}
        <circle cx="200" cy="85" r="45" fill="#246747" fillOpacity="0.2" />
        {/* Traditional woven hammock line */}
        <path d="M60 90 Q 200 150, 340 90" stroke="#B94D35" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M65 92 Q 200 152, 335 92" stroke="#F4C95D" strokeWidth="2" fill="none" />
        {/* San Juan de Oriente pottery vessel on the side */}
        <path d="M60 160 Q 52 145, 60 135 L 75 135 Q 83 145, 75 160 Z" fill="#B94D35" />
        <circle cx="67" cy="147" r="4" fill="#F4C95D" />
        {/* Warm lantern */}
        <circle cx="200" cy="50" r="10" fill="#F4C95D" />
        <path d="M200 30 L 200 42" stroke="#232925" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
