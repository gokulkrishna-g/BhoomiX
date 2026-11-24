import React, { useState, useEffect } from 'react';
import { FastForward } from 'lucide-react';
import { Language } from '../types';

interface BhoomiXIntroScreenProps {
  onComplete: () => void;
  language?: Language;
  customLogoSrc?: string;
}

// 10 Authentic Tamil Nadu Cultural & Agricultural Photographic Assets
const ORBITAL_PHOTOS = [
  {
    id: 'temple',
    src: '/intro-photos/temple_gopuram.jpg',
    fallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80',
    angle: -90, // 12:00 Top
    border: 'border-amber-400',
    glow: 'shadow-amber-500/30'
  },
  {
    id: 'tn_agro_map',
    src: '/intro-photos/tn_agro_map.jpg',
    fallback: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80',
    angle: -54, // 1:12 Top-Right
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/30'
  },
  {
    id: 'coconut_palms',
    src: '/intro-photos/coconut_palms.jpg',
    fallback: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    angle: -18, // 2:24 Right-Upper
    border: 'border-amber-400',
    glow: 'shadow-amber-500/30'
  },
  {
    id: 'village_agri',
    src: '/intro-photos/village_agriculture.jpg',
    fallback: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400&q=80',
    angle: 18, // 3:36 Right-Lower
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/30'
  },
  {
    id: 'paddy_harvest',
    src: '/intro-photos/paddy_harvest.jpg',
    fallback: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=400&q=80',
    angle: 54, // 4:48 Bottom-Right
    border: 'border-amber-400',
    glow: 'shadow-amber-500/30'
  },
  {
    id: 'state_emblem',
    src: '/intro-photos/state_emblem.jpg',
    fallback: '/intro-photos/temple_gopuram.jpg',
    angle: 90, // 6:00 Bottom
    border: 'border-amber-400',
    glow: 'shadow-amber-500/40'
  },
  {
    id: 'bullock_plough',
    src: '/intro-photos/bullock_plough.jpg',
    fallback: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80',
    angle: 126, // 7:12 Bottom-Left
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/30'
  },
  {
    id: 'farmer_field',
    src: '/intro-photos/farmer_paddy.jpg',
    fallback: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80',
    angle: 162, // 8:24 Left-Lower
    border: 'border-amber-400',
    glow: 'shadow-amber-500/30'
  },
  {
    id: 'paddy_field',
    src: '/intro-photos/paddy_field.jpg',
    fallback: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
    angle: 198, // 9:36 Left-Upper
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/30'
  },
  {
    id: 'green_landscape',
    src: '/intro-photos/green_landscape.jpg',
    fallback: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80',
    angle: 234, // 10:48 Top-Left
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/30'
  }
];

export const BhoomiXIntroScreen: React.FC<BhoomiXIntroScreenProps> = ({ 
  onComplete, 
  customLogoSrc 
}) => {
  const [phase, setPhase] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);

  // Logo sources in order: prop, official png, official emblem jpg, or fallback
  const primaryLogo = customLogoSrc || '/bhoomix-logo.png';

  useEffect(() => {
    // Stage 1: Central BhoomiX Logo Emergence (0s - 1.0s)
    const t1 = setTimeout(() => {
      setPhase(2); // Rings illuminate & expand
    }, 900);

    // Stage 2: Surrounding Photographs Appear in Circular Orbit (1.0s - 2.4s)
    const t2 = setTimeout(() => {
      setPhase(3); // Photographs fully blossom
    }, 2200);

    // Stage 3: Smooth Transition into Homepage (4.2s)
    const t3 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  // Orbital radius on standard 640px reference frame
  const ORBIT_RADIUS = 255;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#01140e] via-[#022c20] to-[#01110c] text-white transition-opacity duration-700 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Atmospheric Lighting & Agrarian Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,rgba(245,158,11,0.08)_45%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Discrete Skip Option in Top-Right Corner */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold tracking-wide backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
          title="Skip Introduction"
        >
          <span>Skip</span>
          <FastForward className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Circular Orbital Composition (Responsive Scale Container) */}
      <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] flex items-center justify-center">
        {/* =========================================================================
            BACKGROUND SVG ORBITAL LINES & GOLDEN RINGS
           ========================================================================= */}
        <svg 
          viewBox="0 0 700 700" 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* Radiant Golden Gradient */}
            <linearGradient id="orbitGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Lush Emerald Gradient */}
            <linearGradient id="orbitEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Ambient Glow Filter */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outermost Celestial Dotted Ring */}
          <circle 
            cx="350" cy="350" r="335" 
            fill="none" 
            stroke="url(#orbitGold)" 
            strokeWidth="1.5" 
            strokeDasharray="6 8" 
            opacity={phase >= 2 ? "0.45" : "0.1"}
            className="transition-opacity duration-1000"
          />

          {/* Main Orbital Track Circle (Where Photographs are Positioned) */}
          <circle 
            cx="350" cy="350" r={ORBIT_RADIUS} 
            fill="none" 
            stroke="url(#orbitGold)" 
            strokeWidth="2" 
            strokeDasharray="10 8" 
            filter="url(#goldGlow)"
            opacity={phase >= 2 ? "0.7" : "0.2"}
            className="transition-opacity duration-1000 animate-spin-very-slow origin-center"
          />

          {/* Inner Emerald Orbital Harmonizer Ring */}
          <circle 
            cx="350" cy="350" r="175" 
            fill="none" 
            stroke="url(#orbitEmerald)" 
            strokeWidth="2" 
            strokeDasharray="8 6" 
            opacity={phase >= 2 ? "0.6" : "0.15"}
            className="transition-opacity duration-1000"
          />

          {/* Concentric Golden Rice Beaded Halo around Central Frame */}
          <circle 
            cx="350" cy="350" r="145" 
            fill="none" 
            stroke="url(#orbitGold)" 
            strokeWidth="3" 
            strokeDasharray="14 10" 
            filter="url(#goldGlow)"
            opacity={phase >= 1 ? "0.85" : "0.3"}
          />

          {/* Connecting Orbital Spokes */}
          {ORBITAL_PHOTOS.map((photo, idx) => {
            const rad = (photo.angle * Math.PI) / 180;
            const x = 350 + Math.cos(rad) * ORBIT_RADIUS;
            const y = 350 + Math.sin(rad) * ORBIT_RADIUS;
            return (
              <g key={photo.id}>
                {/* Tiny Orbital Anchor Dot */}
                <circle 
                  cx={x} cy={y} r="3" 
                  fill="#fef08a" 
                  filter="url(#goldGlow)" 
                  opacity={phase >= 2 ? "0.9" : "0"} 
                  className="transition-opacity duration-700"
                />
              </g>
            );
          })}
        </svg>

        {/* =========================================================================
            CIRCULAR ORBITAL PHOTOGRAPHS (10 AUTHENTIC HIGH-QUALITY PHOTOGRAPHS)
           ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none">
          {ORBITAL_PHOTOS.map((photo, idx) => {
            const rad = (photo.angle * Math.PI) / 180;
            // Radius scaled to percentage based on reference frame (350 is center, radius 255)
            // in percentage: (255 / 350) * 50% = 36.4% from center (50%)
            const percentRadius = 36.4;
            const leftPercent = 50 + Math.cos(rad) * percentRadius;
            const topPercent = 50 + Math.sin(rad) * percentRadius;

            return (
              <div
                key={photo.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`
                }}
              >
                {/* Photographic Circular Frame with Golden Border */}
                <div 
                  className={`relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 ${photo.border} shadow-[0_6px_20px_rgba(0,0,0,0.8)] ${photo.glow} transition-all duration-700 group hover:scale-115 hover:z-30 cursor-pointer ${
                    phase >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${150 + idx * 80}ms`
                  }}
                >
                  {/* Subtle Inner Glass Sheen & Depth Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20 z-10 pointer-events-none rounded-full" />
                  
                  {/* Authentic High-Resolution Photograph */}
                  <img
                    src={photo.src}
                    alt=""
                    className="w-full h-full object-cover object-center filter saturate-110 contrast-105 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to online image if needed
                      if (e.currentTarget.src !== photo.fallback) {
                        e.currentTarget.src = photo.fallback;
                      }
                    }}
                  />

                  {/* Golden Rim Accent Ring */}
                  <div className="absolute inset-0 rounded-full border border-amber-300/40 pointer-events-none z-20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            CENTRAL BHOOMIX LOGO (EXACT CENTER, PROMINENT, GOLDEN CIRCULAR FRAME)
           ========================================================================= */}
        <div 
          className={`relative z-30 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full p-2 flex items-center justify-center transition-all duration-1000 ${
            phase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {/* Circular Frame with Deep Golden & Emerald Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#063f2e] via-[#022c20] to-[#01140e] border-4 border-amber-400/90 shadow-[0_0_60px_rgba(245,158,11,0.45),inset_0_0_25px_rgba(16,185,129,0.3)] backdrop-blur-xl" />

          {/* Decorative Inner Golden Rim */}
          <div className="absolute inset-1.5 rounded-full border border-amber-300/60 pointer-events-none" />

          {/* Official Supplied BhoomiX Logo Image */}
          <div className="relative z-20 w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1">
            {!logoError ? (
              <img
                src={primaryLogo}
                alt="BhoomiX Official Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500"
                onError={() => {
                  if (primaryLogo !== '/bhoomix-emblem.jpg') {
                    // Try the emblem copy
                    setLogoError(false);
                  } else {
                    setLogoError(true);
                  }
                }}
              />
            ) : (
              <div className="text-center p-4">
                <span className="text-2xl font-black text-white">Bhoomi<span className="text-amber-400">X</span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhoomiXIntroScreen;
