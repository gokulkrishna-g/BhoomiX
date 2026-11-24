import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Droplets, 
  Sun, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Wheat, 
  TrendingUp, 
  Sprout, 
  ShieldCheck,
  ChevronRight, 
  Compass,
  MapPin,
  Clock,
  Layers,
  Thermometer,
  Wind,
  Mic,
  Calendar,
  Building,
  ExternalLink,
  Award,
  Bell,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { Language } from '../types';
import { getWeather } from '../services/api';
import { TAMIL_NADU_DISTRICTS, TN_DISTRICT_NAMES, AGRO_CLIMATIC_ZONES, getDistrictAreas } from '../data/tamilNaduData';
import { TAMIL_NADU_MANDI_PRICES } from '../data/marketPricesData';
import { TAMIL_NADU_SEASONS } from '../data/farmingCalendarData';
import { TAMIL_NADU_CROP_GUIDES } from '../data/cropInfoData';
import { TAMIL_NADU_AGRI_SCHEMES } from '../data/governmentSchemesData';
import { TAMIL_NADU_SOIL_LABS } from '../data/soilLabsData';

interface FarmerDashboardViewProps {
  language: Language;
  onNavigate: (view: string) => void;
  currentDistrict?: string;
  onSelectDistrict?: (district: string) => void;
  currentArea?: string;
  onSelectArea?: (area: string) => void;
  onOpenVoiceAssistant?: () => void;
  onToggleLanguage?: () => void;
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({ 
  language, 
  onNavigate,
  currentDistrict = "Thanjavur",
  onSelectDistrict,
  currentArea,
  onSelectArea,
  onOpenVoiceAssistant,
  onToggleLanguage
}) => {
  const [district, setDistrict] = useState<string>(currentDistrict);
  const districtAreas = getDistrictAreas(district);
  const [selectedArea, setSelectedArea] = useState<string>(currentArea || (districtAreas[0]?.name ?? 'Kumbakonam'));
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSeasonTab, setActiveSeasonTab] = useState<string>('kuruvai');
  const [selectedCropGuidance, setSelectedCropGuidance] = useState<string>('paddy');

  // Sync with prop when changed elsewhere
  useEffect(() => {
    if (currentDistrict && currentDistrict !== district) {
      setDistrict(currentDistrict);
      const newAreas = getDistrictAreas(currentDistrict);
      if (newAreas.length > 0) {
        setSelectedArea(newAreas[0].name);
      }
    }
  }, [currentDistrict]);

  useEffect(() => {
    if (currentArea && currentArea !== selectedArea) {
      setSelectedArea(currentArea);
    }
  }, [currentArea]);

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    const newAreas = getDistrictAreas(newDistrict);
    if (newAreas.length > 0) {
      setSelectedArea(newAreas[0].name);
      if (onSelectArea) onSelectArea(newAreas[0].name);
    }
    if (onSelectDistrict) onSelectDistrict(newDistrict);
  };

  // Load live weather automatically whenever district changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const weatherRes = await getWeather(district);
        if (isMounted) setWeather(weatherRes);
      } catch (err) {
        console.error("Dashboard weather load error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [district]);

  const districtData = TAMIL_NADU_DISTRICTS[district] || TAMIL_NADU_DISTRICTS["Thanjavur"];
  const currentTemp = weather?.current?.temp_c ?? weather?.current?.temperature_c ?? 31.0;
  const currentHumidity = weather?.current?.humidity_pct ?? 74;
  const currentWind = weather?.current?.wind_speed_kmh ?? 12;
  const currentCondition = weather?.current?.condition ?? "Partly Cloudy";
  const advisories = weather?.agro_advisories || {};
  const forecastList = weather?.forecast_7day ?? weather?.forecast_7_day ?? [];

  // Local district mandi prices
  const districtPrices = TAMIL_NADU_MANDI_PRICES.filter(
    p => p.district.toLowerCase() === district.toLowerCase()
  );
  const displayPrices = districtPrices.length > 0 ? districtPrices : TAMIL_NADU_MANDI_PRICES.slice(0, 4);

  // Active season
  const activeSeason = TAMIL_NADU_SEASONS.find(s => s.id === activeSeasonTab) || TAMIL_NADU_SEASONS[0];

  // Active crop guide
  const activeCropGuide = TAMIL_NADU_CROP_GUIDES.find(c => c.id === selectedCropGuidance) || TAMIL_NADU_CROP_GUIDES[0];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP HEADER & BILINGUAL TOGGLE & VOICE TRIGGER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ta' ? 'தமிழ்நாடு வேளாண்மை சுற்றுச்சூழல்' : 'Tamil Nadu Smart Agriculture Ecosystem'}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {language === 'ta' ? 'அனைத்து 38 மாவட்டங்கள்' : 'All 38 Districts'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'ta' ? 'உழவர் வழிகாட்டி பலகை' : 'Farmer Decision Dashboard'}
            </h1>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
              {language === 'ta'
                ? `${districtData.tamil_name} மாவட்ட விவசாயிகளுக்கு ஏற்ற நேரடி வானிலை, ஆலோசனைகள், சந்தை விலைகள் மற்றும் அரசு திட்டங்கள்.`
                : `Dedicated agricultural decision hub customized for farmers in ${districtData.name} District (${districtData.zone}).`}
            </p>
          </div>

          {/* Action Ribbon: Location Picker, Voice Assistant Trigger & Language Switch */}
          <div className="flex flex-wrap items-center gap-3">
            {/* District Selector */}
            <div className="relative">
              <select
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="px-4 py-2.5 rounded-2xl border border-emerald-400/40 bg-slate-900/90 text-white font-bold text-xs sm:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                {TN_DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-white">
                    📍 {d} {TAMIL_NADU_DISTRICTS[d] ? `(${TAMIL_NADU_DISTRICTS[d].tamil_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Taluk / Area Selector */}
            {districtAreas.length > 0 && (
              <div className="relative">
                <select
                  value={selectedArea}
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                    if (onSelectArea) onSelectArea(e.target.value);
                  }}
                  className="px-4 py-2.5 rounded-2xl border border-amber-400/40 bg-slate-900/90 text-amber-300 font-bold text-xs sm:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer max-w-[170px] truncate"
                  title="Specific Taluk / Agricultural Area"
                >
                  {districtAreas.map((a) => (
                    <option key={a.name} value={a.name} className="bg-slate-900 text-white">
                      🏛️ {language === 'ta' ? a.tamil_name : a.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* AI Voice Assistant Trigger Button */}
            <button
              onClick={() => onOpenVoiceAssistant && onOpenVoiceAssistant()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all ring-2 ring-emerald-300/30 animate-pulse"
              title="Speak to AI Voice Assistant"
            >
              <Mic className="w-4 h-4" />
              <span>{language === 'ta' ? 'குரல் வழி AI' : 'Agri Voice AI'}</span>
            </button>

            {/* Language Switch */}
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                {language === 'ta' ? 'English (EN)' : 'தமிழ் (TA)'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. SECTION 1: MY FARM (என் பண்ணை சுயவிவரம்) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {language === 'ta' ? '1. என் பண்ணை சுயவிவரம் (My Farm Profile)' : '1. My Farm Profile'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ta' ? 'உங்கள் பண்ணை நிலம், மண் மற்றும் பயிர் அமைப்பு' : 'Active landholding, soil profile and irrigation setup'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('profile')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ta' ? 'விவரங்களை மாற்றுக' : 'Edit Profile'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'மாவட்டம்' : 'District'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              {language === 'ta' ? districtData.tamil_name : districtData.name}
            </span>
          </div>

          <div className="bg-emerald-50/80 dark:bg-emerald-950/50 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block">{language === 'ta' ? 'வட்டம் / பகுதி' : 'Taluk / Area'}</span>
            <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200 truncate block mt-0.5">
              📍 {selectedArea}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'நிலப்பரப்பு' : 'Landholding'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              2.5 {language === 'ta' ? 'ஏக்கர்' : 'Acres'}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'மண்டலம்' : 'Agro Zone'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              {language === 'ta' ? districtData.zone_tamil : districtData.zone}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'மண் வகை' : 'Soil Type'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              {districtData.soil_types[0]}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'பாசனம்' : 'Irrigation'}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">
              {districtData.irrigation_sources[0]}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">{language === 'ta' ? 'முதன்மை பயிர்' : 'Main Crop'}</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate block mt-0.5">
              🌾 {districtData.major_crops[0]}
            </span>
          </div>
        </div>
      </div>

      {/* 3. SECTION 2 & 3: LIVE WEATHER & DAILY AGRO ADVISORY (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weather Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  {language === 'ta' ? '2. நேரடி வானிலை (Live Weather)' : '2. Live District Weather'}
                </h2>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                Open-Meteo
              </span>
            </div>

            {/* Current Weather Display */}
            <div className="flex items-center justify-between my-4">
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-start">
                  <span>{Math.round(currentTemp)}</span>
                  <span className="text-2xl font-bold text-emerald-500">°C</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {currentCondition}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-end gap-1.5 font-medium">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{language === 'ta' ? 'ஈரப்பதம்:' : 'Humidity:'} {currentHumidity}%</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center justify-end gap-1.5 font-medium">
                  <Wind className="w-3.5 h-3.5 text-teal-500" />
                  <span>{language === 'ta' ? 'காற்று:' : 'Wind:'} {currentWind} km/h</span>
                </div>
              </div>
            </div>

            {/* 4-Day Mini Forecast */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === 'ta' ? 'அடுத்த 4 நாட்கள் கணிப்பு:' : '4-Day Weather Forecast:'}
              </span>
              {forecastList.slice(0, 4).map((d: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between py-1 text-xs text-slate-600 dark:text-slate-300">
                  <span className="w-20 font-medium truncate">{idx === 0 ? (language === 'ta' ? 'இன்று' : 'Today') : (d.date || `Day ${idx + 1}`)}</span>
                  <span className="text-slate-400 truncate max-w-[120px]">{d.condition || 'Partly Cloudy'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{d.temp_max ?? 32}° / {d.temp_min ?? 24}°</span>
                  <span className="text-blue-500 font-semibold">{d.rain_mm ?? 0} mm</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('weather')}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <CloudRain className="w-4 h-4 text-blue-500" />
            <span>{language === 'ta' ? 'முழுமையான 7-நாள் வானிலை & பாசன கணிப்பு' : 'View Full 7-Day Weather & Irrigation Engine'}</span>
          </button>
        </div>

        {/* 3. Agro Advisory Card (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h2 className="font-bold text-base text-slate-900 dark:text-white">
                  {language === 'ta' ? '3. தினசரி வேளாண் ஆலோசனை (Daily Agro Advisory)' : '3. Daily Agro-Meteorological Advisory'}
                </h2>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                TNAU Advisory Protocol
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {/* Irrigation Advisory */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 space-y-1">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ta' ? 'பாசன பரிந்துரை (Irrigation)' : 'Irrigation Advice'}</span>
                </span>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  {advisories.irrigation || (language === 'ta' 
                    ? `இன்றைய ஆவியாதல் 4.8 மி.மீ. ${districtData.major_crops[0]} பயிருக்கு காலை 7 முதல் 9 மணிக்குள் அல்லது மாலையில் சொட்டு நீர் பாசனம் செய்யவும்.`
                    : `Daily ET0 is ~4.8 mm. Apply morning or evening micro-irrigation for ${districtData.major_crops[0]} to prevent evaporative losses.`
                  )}
                </p>
              </div>

              {/* Sowing / Cultural Practice */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-1">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ta' ? 'உழவு & விதைப்பு வழிகாட்டல்' : 'Sowing & Field Operation'}</span>
                </span>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {advisories.sowing || (language === 'ta'
                    ? `அடுத்த 3 நாட்களுக்கு கனமழை எச்சரிக்கை இல்லை. நடவு, களை மேலாண்மை மற்றும் உரமிடுதல் பணிகளை திட்டமிடலாம்.`
                    : `No severe rainfall expected in the next 3 days. Suitable window for intercultural operations and top-dressing.`
                  )}
                </p>
              </div>

              {/* Pest & Disease Alert */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ta' ? 'பயிர் பாதுகாப்பு (IPM)' : 'Pest Management'}</span>
                </span>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {advisories.pest_management || (language === 'ta'
                    ? `காற்றின் வேகம் குறைவாக இருப்பதால் இலை சுருட்டு புழுவிற்கு வேப்ப எண்ணெய் கரைசல் தெளிக்க உகந்த சூழல்.`
                    : `Low wind velocity favors foliar bio-pesticide spraying against leaf roller and stem borer.`
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('irrigation')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-blue-700 transition-all shadow-sm"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'துல்லிய பாசன கணக்கீடு' : 'Smart Irrigation'}</span>
            </button>
            <button
              onClick={() => onNavigate('disease')}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'ta' ? 'AI பயிர் நோய் கண்டறிதல்' : 'Crop Disease AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SECTION 4 & 5: CROP GUIDANCE & MANDI MARKET PRICES (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 4. Crop Guidance Card (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '4. பயிர் சாகுபடி வழிகாட்டல்' : '4. Region Crop Guidance'}
              </h2>
            </div>
            {/* Crop Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              {['paddy', 'cotton', 'turmeric', 'banana'].map(cId => (
                <button
                  key={cId}
                  onClick={() => setSelectedCropGuidance(cId)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedCropGuidance === cId
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cId.charAt(0).toUpperCase() + cId.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ta' ? activeCropGuide.name_ta : activeCropGuide.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'ta' ? `சாகுபடி காலம்: ${activeCropGuide.duration_days_ta}` : `Crop Duration: ${activeCropGuide.duration_days}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 text-[10px] block">{language === 'ta' ? 'பரிந்துரைக்கப்பட்ட ரகங்கள்' : 'Key Varieties'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeCropGuide.key_varieties.slice(0, 2).join(', ')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 text-[10px] block">{language === 'ta' ? 'எதிர்பார்க்கப்படும் மகசூல்' : 'Expected Yield'}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{language === 'ta' ? activeCropGuide.expected_yield_per_acre_ta : activeCropGuide.expected_yield_per_acre}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-200 block">
                {language === 'ta' ? 'உர மேலாண்மை (Fertilizer Schedule):' : 'Scientific Fertilizer Schedule:'}
              </span>
              <p>• {language === 'ta' ? activeCropGuide.fertilizer_recommendation.basal_ta : activeCropGuide.fertilizer_recommendation.basal}</p>
              <p>• {language === 'ta' ? activeCropGuide.fertilizer_recommendation.top_dressing_1_ta : activeCropGuide.fertilizer_recommendation.top_dressing_1}</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('cropRecommendation')}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ta' ? 'AI பயிர் பரிந்துரை கருவியை திறக்க (99.5% துல்லியம்)' : 'Open AI Crop Recommendation Tool'}</span>
          </button>
        </div>

        {/* 5. Market Prices Card (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '5. ஒழுங்குமுறை சந்தை விலைகள் (Mandi Prices)' : '5. Regulated Mandi Prices'}
              </h2>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              AGMARKNET Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {displayPrices.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {language === 'ta' ? item.commodity_ta : item.commodity}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    📍 {language === 'ta' ? item.market_name_ta : item.market_name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ₹{item.modal_price_quintal.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">/ Qtl</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 mt-0.5">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      ₹{item.price_per_kg}/kg
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.daily_trend.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.daily_trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('marketplace')}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <span>{language === 'ta' ? 'விவசாயி நேரடி சந்தை மற்றும் கொள்முதல் மையம்' : 'Open Farmer Direct Marketplace'}</span>
          </button>
        </div>
      </div>

      {/* 5. SECTION 6 & 7: GOVERNMENT SCHEMES & FARMING CALENDAR (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 6. Government Schemes Card (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '6. அரசு வேளாண் நலத்திட்டங்கள் (Govt Schemes)' : '6. Priority Government Schemes'}
              </h2>
            </div>
            <span className="text-[10px] bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
              TN Uzhavan Linked
            </span>
          </div>

          <div className="space-y-3">
            {TAMIL_NADU_AGRI_SCHEMES.slice(0, 3).map((sch) => (
              <div
                key={sch.id}
                className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {language === 'ta' ? sch.name_ta : sch.name}
                  </h3>
                  <span className="text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                    {sch.agency}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-2">
                  {language === 'ta' ? sch.short_description_ta : sch.short_description}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {language === 'ta' ? sch.subsidy_benefits_ta.split(';')[0] : sch.subsidy_benefits.split(';')[0]}
                  </span>
                  <a
                    href={sch.application_portal_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ta' ? 'விண்ணப்பிக்க' : 'Apply Online'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('schemes')}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>{language === 'ta' ? 'அனைத்து அரசு மானியங்கள் & தகுதி சோதிக்க' : 'Check All Schemes & Eligibility'}</span>
          </button>
        </div>

        {/* 7. Farming Calendar Card (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-500" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '7. வேளாண் பருவகால காலண்டர்' : '7. Tamil Nadu Farming Calendar'}
              </h2>
            </div>
            {/* Season Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveSeasonTab('kuruvai')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeSeasonTab === 'kuruvai' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {language === 'ta' ? 'குறுவை' : 'Kuruvai'}
              </button>
              <button
                onClick={() => setActiveSeasonTab('samba')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeSeasonTab === 'samba' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {language === 'ta' ? 'சம்பா' : 'Samba'}
              </button>
              <button
                onClick={() => setActiveSeasonTab('navarai')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeSeasonTab === 'navarai' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {language === 'ta' ? 'நவரை' : 'Navarai'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40">
              <div className="font-bold text-xs text-teal-900 dark:text-teal-200">
                {language === 'ta' ? activeSeason.name_ta : activeSeason.name}
              </div>
              <p className="text-[11px] text-teal-700 dark:text-teal-300 mt-1">
                {language === 'ta' ? activeSeason.description_ta : activeSeason.description}
              </p>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-2 text-xs">
              {activeSeason.stages.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {language === 'ta' ? st.stage_ta : st.stage}
                    </div>
                    <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                      ⏱️ {language === 'ta' ? st.recommended_timing_ta : st.recommended_timing}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      💧 {language === 'ta' ? st.irrigation_advice_ta : st.irrigation_advice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. SECTION 8, 9 & 10: 3D MAP PREVIEW, FARM RESOURCES & NOTIFICATIONS (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 8. Agricultural Map Preview */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Compass className="w-5 h-5" />
              <h2 className="font-bold text-base">
                {language === 'ta' ? '8. 3D வேளாண் நில வரைபடம்' : '8. 3D Agricultural Land Map'}
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்டங்கள் மற்றும் 7 வேளாண் காலநிலை மண்டலங்களை முப்பரிமாண 3D வடிவில் ஆராயுங்கள்.'
                : 'Experience interactive Three.js 3D visualization of terrain elevation, district boundaries, and crops.'}
            </p>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1">
              <div className="text-emerald-300 font-bold">📍 {districtData.name} ({districtData.tamil_name})</div>
              <div className="text-slate-400 text-[11px]">{districtData.cultivable_area_ha.toLocaleString()} ha cultivable land</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('agriMap3d')}
            className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <Compass className="w-4 h-4" />
            <span>{language === 'ta' ? 'முப்பரிமாண 3D வரைபடத்தை திறக்க' : 'Launch 3D Agri Map'}</span>
          </button>
        </div>

        {/* 9. Farm Resources */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
              <Building className="w-5 h-5" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '9. பண்ணை இடுபொருட்கள் & ஆய்வகங்கள்' : '9. Farm Resources & Labs'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'ta'
                ? 'அருகிலுள்ள அரசு மண் பரிசோதனை நிலையங்கள், தொடக்க வேளாண் கூட்டுறவு சங்கங்கள் (PACS), மற்றும் TNAU விதைகள்.'
                : 'Verified Soil Testing Laboratories (STLs), PACS cooperative depots, and custom equipment hiring.'}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  {language === 'ta' ? 'அரசு மண் பரிசோதனை கூடம் (STL)' : 'Govt Soil Testing Laboratory'}
                </span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400">
                  {districtData.name} ({language === 'ta' ? 'கட்டணம்: ₹20' : 'Fee: ₹20'})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  {language === 'ta' ? 'மானிய உரங்கள் & விதைகள் (PACS)' : 'Subsidized Inputs (PACS)'}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  {language === 'ta' ? 'யூரியா, டிஏபி, வேப்பம் புண்ணாக்கு' : 'Urea, DAP, Neem Cake'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('soilLabs')}
            className="w-full mt-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Layers className="w-4 h-4" />
            <span>{language === 'ta' ? 'அருகிலுள்ள மண் ஆய்வகங்களை பார்க்க' : 'Find Soil Testing Labs'}</span>
          </button>
        </div>

        {/* 10. Notifications & Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-500">
              <Bell className="w-5 h-5" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ta' ? '10. முக்கிய அறிவிப்புகள் (Alerts)' : '10. Agricultural Alerts'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'ta'
                ? 'வானிலை எச்சரிக்கைகள், காப்பீடு கடைசி தேதிகள், மற்றும் பூச்சி கண்காணிப்பு அறிவிப்புகள்.'
                : 'Real-time weather warnings, PMFBY crop insurance cut-off dates, and regional pest updates.'}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                <span className="font-bold block">
                  {language === 'ta' ? '⚠️ பாசன நீர் இருப்பு' : '⚠️ Canal Water Advisory'}
                </span>
                <span className="text-[11px] text-amber-800 dark:text-amber-300">
                  {language === 'ta' ? 'கால்வாய் முறைப்பாசன அட்டவணையை பின்பற்றவும்.' : 'Follow rotational canal irrigation schedule.'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                <span className="font-bold block">
                  {language === 'ta' ? '✅ PM-KISAN 17வது தவணை' : '✅ PM-KISAN Update'}
                </span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  {language === 'ta' ? 'வங்கிக் கணக்கில் ஆதார் இணைப்பு சரிபார்க்கவும்.' : 'Verify Aadhaar-NPCI seeding in bank account.'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('schemes')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-slate-700"
          >
            <span>{language === 'ta' ? 'அனைத்து அறிவிப்புகள்' : 'View All Notifications'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardView;
