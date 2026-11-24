import React, { useState } from 'react';

interface BhoomiXLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  variant?: 'light' | 'dark' | 'auto';
  customLogoSrc?: string;
}

export const BhoomiXLogo: React.FC<BhoomiXLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  variant = 'auto',
  customLogoSrc
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const logoPath = customLogoSrc || '/bhoomix-logo.png';

  const sizeMap = {
    xs: { emblem: 'w-6 h-6', text: 'text-sm', sub: 'text-[9px]' },
    sm: { emblem: 'w-8 h-8', text: 'text-lg', sub: 'text-[10px]' },
    md: { emblem: 'w-10 h-10', text: 'text-xl', sub: 'text-[11px]' },
    lg: { emblem: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { emblem: 'w-24 h-24', text: 'text-4xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Central BhoomiX Logo Emblem */}
      <div className={`relative ${currentSize.emblem} flex items-center justify-center flex-shrink-0 group`}>
        {!imageError ? (
          <img 
            src={logoPath}
            alt="BhoomiX Logo"
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          >
            <circle cx="50" cy="50" r="46" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
            <path d="M 25 65 C 38 80, 62 80, 75 65 C 67 75, 40 75, 25 65 Z" fill="#f59e0b" />
            <path d="M 50 62 C 40 50, 30 45, 26 30 C 37 30, 46 40, 50 62 Z" fill="#10b981" />
            <path d="M 50 62 C 60 48, 70 43, 74 30 C 63 30, 54 40, 50 62 Z" fill="#34d399" />
            <line x1="50" y1="62" x2="50" y2="20" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="20" r="4" fill="#fef08a" />
          </svg>
        )}
      </div>

      {/* Official BhoomiX Wordmark */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline tracking-tight font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
            <span className={`bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 dark:from-emerald-300 dark:via-teal-200 dark:to-emerald-400 bg-clip-text text-transparent font-black ${currentSize.text}`}>
              Bhoomi
            </span>
            <span className={`text-amber-500 dark:text-amber-400 font-black ml-0.5 ${currentSize.text}`}>
              X
            </span>
          </div>
          <span className={`font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 ${currentSize.sub}`}>
            Smart AI Agriculture
          </span>
        </div>
      )}
    </div>
  );
};

export default BhoomiXLogo;
