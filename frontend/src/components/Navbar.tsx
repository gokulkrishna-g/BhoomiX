import React from 'react';
import { Globe, MapPin, UserCheck, CloudRain, Sun, Droplets, Mic, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { TAMIL_NADU_DISTRICTS, TN_DISTRICT_NAMES, getDistrictAreas } from '../data/tamilNaduData';
import { BhoomiXLogo } from './BhoomiXLogo';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  currentDistrict?: string;
  onSelectDistrict?: (district: string) => void;
  currentArea?: string;
  onSelectArea?: (area: string) => void;
  liveWeather?: any;
  onOpenVoiceAssistant?: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  currentView,
  onNavigate,
  currentDistrict = "Thanjavur",
  onSelectDistrict,
  currentArea,
  onSelectArea,
  liveWeather,
  onOpenVoiceAssistant,
  onReplayIntro,
}) => {
  const t = translations[language];
  const activeDistrictInfo = TAMIL_NADU_DISTRICTS[currentDistrict];
  const districtAreas = getDistrictAreas(currentDistrict);

  const temp = liveWeather?.current?.temp_c ?? liveWeather?.current?.temperature_c ?? 31.2;
  const condition = liveWeather?.current?.condition ?? "Partly Cloudy";
  const humidity = liveWeather?.current?.humidity_pct ?? 74;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/40 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo: Official BhoomiX Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="cursor-pointer group flex items-center"
            title="BhoomiX Home"
          >
            <BhoomiXLogo 
              size="sm" 
              showWordmark={true} 
            />
          </div>

          {/* District Selector & Live Weather Pill */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Tamil Nadu District Dropdown */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <select
                value={currentDistrict}
                onChange={(e) => onSelectDistrict && onSelectDistrict(e.target.value)}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
              >
                {TN_DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    {d} {TAMIL_NADU_DISTRICTS[d] ? `(${TAMIL_NADU_DISTRICTS[d].tamil_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-District Taluk / Area Selector */}
            {districtAreas.length > 0 && (
              <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-800/60 text-xs shadow-sm">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400">
                  {language === 'ta' ? 'வட்டம்:' : 'Taluk:'}
                </span>
                <select
                  value={currentArea || districtAreas[0]?.name || ''}
                  onChange={(e) => onSelectArea && onSelectArea(e.target.value)}
                  className="bg-transparent font-bold text-emerald-950 dark:text-emerald-200 outline-none cursor-pointer max-w-[125px] truncate"
                  title="Select specific Taluk or Area within district"
                >
                  {districtAreas.map((a) => (
                    <option key={a.name} value={a.name} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                      {language === 'ta' ? a.tamil_name : a.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Live Weather Indicator */}
            <div 
              onClick={() => onNavigate('weather')}
              className="cursor-pointer flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-50/90 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-700/50 rounded-2xl text-xs text-emerald-950 dark:text-emerald-100 transition-all shadow-sm"
              title="Click to view 7-Day Weather & Agro-Advisory"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300">{temp}°C</span>
              <span className="text-emerald-300">|</span>
              <span className="text-emerald-700 dark:text-emerald-200 font-medium truncate max-w-[120px]">{condition}</span>
              <span className="text-emerald-300">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">{humidity}% Hum</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Replay Intro Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
                title="Replay BhoomiX Introduction"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Intro</span>
              </button>
            )}

            {/* Agri Voice Assistant Trigger */}
            {onOpenVoiceAssistant && (
              <button
                onClick={onOpenVoiceAssistant}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all ring-1 ring-emerald-400/40 cursor-pointer"
                title="Speak to AI Voice Assistant / குரல் வழி AI"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">{language === 'ta' ? 'குரல் AI' : 'Voice AI'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 font-medium text-xs transition-all cursor-pointer"
              title="Switch Language / மொழியை மாற்றுக"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.languageToggle}</span>
            </button>

            {/* Farmer Profile Button */}
            <button
              onClick={() => onNavigate('farmerProfile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'farmerProfile'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ta' ? 'உழவர் சுயவிவரம்' : 'Farmer Profile'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
