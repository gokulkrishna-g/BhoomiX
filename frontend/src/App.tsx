import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Language } from './types';
import { getWeather } from './services/api';
import { AiVoiceAssistantModal } from './components/AiVoiceAssistantModal';
import { BhoomiXIntroScreen } from './components/BhoomiXIntroScreen';
import { getDistrictAreas } from './data/tamilNaduData';
import { Mic, Sparkles } from 'lucide-react';

// Modules
import { HomeView } from './modules/HomeView';
import { FarmerDashboardView } from './modules/FarmerDashboardView';
import { TamilNaduAgriMapView } from './modules/TamilNaduAgriMapView';
import { TamilNadu3DAgriMapView } from './modules/TamilNadu3DAgriMapView';
import { SoilTestingLabsView } from './modules/SoilTestingLabsView';
import { AiFarmingAssistantView } from './modules/AiFarmingAssistantView';
import { CropRecommendationView } from './modules/CropRecommendationView';
import { DiseasePestDetectionView } from './modules/DiseasePestDetectionView';
import { SoilAnalysisView } from './modules/SoilAnalysisView';
import { WeatherPredictionView } from './modules/WeatherPredictionView';
import { CropFailureRiskView } from './modules/CropFailureRiskView';
import { SmartIrrigationView } from './modules/SmartIrrigationView';
import { CropProfitAnalysisView } from './modules/CropProfitAnalysisView';
import { HarvestDemandMatchingView } from './modules/HarvestDemandMatchingView';
import { FarmerMarketplaceView } from './modules/FarmerMarketplaceView';
import { FarmerCommunityView } from './modules/FarmerCommunityView';
import { ResourceSharingView } from './modules/ResourceSharingView';
import { WasteIntelligenceView } from './modules/WasteIntelligenceView';
import { GovernmentSchemesView } from './modules/GovernmentSchemesView';
import { LivestockManagementView } from './modules/LivestockManagementView';
import { FarmToMarketTrackingView } from './modules/FarmToMarketTrackingView';
import { LowCostFinderView } from './modules/LowCostFinderView';
import { FarmerProfileView } from './modules/FarmerProfileView';
import { DatasetsInfoView } from './modules/DatasetsInfoView';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentDistrict, setCurrentDistrict] = useState<string>('Thanjavur');
  const [currentArea, setCurrentArea] = useState<string>('Kumbakonam');
  const [liveWeather, setLiveWeather] = useState<any>(null);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);

  const handleSelectDistrict = (district: string) => {
    setCurrentDistrict(district);
    const areas = getDistrictAreas(district);
    if (areas.length > 0) {
      setCurrentArea(areas[0].name);
    }
  };
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('bhoomix_intro_completed');
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('bhoomix_intro_completed', 'true');
    } catch (e) {
      console.error("Session storage error:", e);
    }
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live weather synchronizer whenever district changes
  useEffect(() => {
    let isMounted = true;
    async function syncWeather() {
      try {
        const data = await getWeather(currentDistrict);
        if (isMounted) setLiveWeather(data);
      } catch (e) {
        console.error("Weather sync fallback:", e);
      }
    }
    syncWeather();
    return () => { isMounted = false; };
  }, [currentDistrict]);

  // Section-Specific Agricultural and Farmer-Themed Backgrounds with Photographic Imagery
  const getSectionTheme = (view: string) => {
    switch (view) {
      case 'soilAnalysis':
      case 'soilLabs':
        // Terracotta fertile loam & earth textures
        return {
          bgImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-stone-900/40 via-amber-950/20 to-slate-900/60',
          bgClass: 'bg-amber-50/70 dark:bg-stone-950/90',
          accentAura: 'bg-amber-600/10',
          bannerTag: 'Soil Health & Fertility Matrix'
        };
      case 'smartIrrigation':
        // Lush water canal and paddy field emerald
        return {
          bgImage: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-teal-950/40 via-emerald-950/30 to-slate-900/60',
          bgClass: 'bg-teal-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-teal-500/10',
          bannerTag: 'Precision Water Conservation'
        };
      case 'weather':
        // Monsoon sky & agro-meteorology aura
        return {
          bgImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-sky-950/40 via-blue-950/30 to-slate-900/60',
          bgClass: 'bg-sky-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-sky-500/10',
          bannerTag: 'Tamil Nadu Agro-Meteorology'
        };
      case 'cropRecommendation':
      case 'aiAssistant':
      case 'diseaseDetection':
        // Lush green fields & crop canopy
        return {
          bgImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-emerald-950/40 via-green-950/30 to-slate-900/60',
          bgClass: 'bg-emerald-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-emerald-600/10',
          bannerTag: 'TNAU Crop Phenology & AI Care'
        };
      case 'marketplace':
      case 'profitAnalysis':
      case 'harvestDemand':
        // Golden harvest & mandi grains
        return {
          bgImage: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-amber-950/40 via-orange-950/30 to-slate-900/60',
          bgClass: 'bg-amber-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-amber-500/10',
          bannerTag: 'Regulated Mandi & Harvest Value'
        };
      case 'cropFailure':
        // Early warning field watch
        return {
          bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-rose-950/40 via-red-950/30 to-slate-900/60',
          bgClass: 'bg-rose-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-rose-500/10',
          bannerTag: 'Predictive Climate Risk Warning'
        };
      case 'agriMap':
      case 'agriMap3d':
        // High-tech 3D agricultural cartography
        return {
          bgImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-slate-950/80',
          bgClass: 'bg-slate-950',
          accentAura: 'bg-emerald-500/10',
          bannerTag: '3D Agro-Topography'
        };
      case 'dashboard':
        // Tamil Nadu farmers in verdant paddy fields
        return {
          bgImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-emerald-950/35 via-slate-950/25 to-stone-900/50',
          bgClass: 'bg-emerald-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-emerald-500/10',
          bannerTag: 'Tamil Nadu Farmer Ecosystem'
        };
      case 'home':
      default:
        // Lush agricultural landscape
        return {
          bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80',
          overlayClass: 'bg-gradient-to-b from-emerald-950/40 via-slate-950/30 to-slate-900/60',
          bgClass: 'bg-emerald-50/70 dark:bg-slate-950/90',
          accentAura: 'bg-emerald-500/10',
          bannerTag: 'Tamil Nadu Farmer Ecosystem'
        };
    }
  };

  const currentTheme = getSectionTheme(currentView);

  const renderActiveModule = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            language={language} 
            onNavigate={handleNavigate} 
            currentDistrict={currentDistrict} 
            onReplayIntro={handleReplayIntro}
          />
        );
      case 'dashboard':
        return (
          <FarmerDashboardView 
            language={language} 
            onNavigate={handleNavigate} 
            currentDistrict={currentDistrict}
            onSelectDistrict={handleSelectDistrict}
            currentArea={currentArea}
            onSelectArea={setCurrentArea}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            onToggleLanguage={toggleLanguage}
          />
        );
      case 'agriMap3d':
        return (
          <TamilNadu3DAgriMapView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
            onNavigate={handleNavigate}
          />
        );
      case 'agriMap':
        return (
          <TamilNaduAgriMapView 
            language={language} 
            onNavigate={handleNavigate} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
          />
        );
      case 'soilLabs':
        return (
          <SoilTestingLabsView 
            language={language}
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
            onNavigate={handleNavigate}
          />
        );
      case 'aiAssistant':
        return (
          <AiFarmingAssistantView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={handleSelectDistrict}
            currentArea={currentArea}
          />
        );
      case 'cropRecommendation':
        return (
          <CropRecommendationView 
            language={language} 
            onNavigate={handleNavigate} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
          />
        );
      case 'diseaseDetection':
        return <DiseasePestDetectionView language={language} />;
      case 'soilAnalysis':
        return (
          <SoilAnalysisView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
          />
        );
      case 'weather':
        return (
          <WeatherPredictionView 
            language={language} 
            currentDistrict={currentDistrict} 
            onSelectDistrict={setCurrentDistrict} 
          />
        );
      case 'cropFailure':
        return (
          <CropFailureRiskView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
          />
        );
      case 'smartIrrigation':
        return (
          <SmartIrrigationView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={setCurrentDistrict}
          />
        );
      case 'profitAnalysis':
        return <CropProfitAnalysisView language={language} />;
      case 'harvestDemand':
        return <HarvestDemandMatchingView language={language} onNavigate={handleNavigate} />;
      case 'marketplace':
        return <FarmerMarketplaceView language={language} />;
      case 'community':
        return <FarmerCommunityView language={language} />;
      case 'resourceSharing':
        return <ResourceSharingView language={language} />;
      case 'wasteIntelligence':
        return <WasteIntelligenceView language={language} />;
      case 'governmentSchemes':
        return <GovernmentSchemesView language={language} />;
      case 'livestock':
        return <LivestockManagementView language={language} />;
      case 'tracking':
        return <FarmToMarketTrackingView language={language} />;
      case 'lowCostFinder':
        return <LowCostFinderView language={language} currentDistrict={currentDistrict} />;
      case 'farmerProfile':
        return (
          <FarmerProfileView 
            language={language} 
            currentDistrict={currentDistrict}
            onSelectDistrict={handleSelectDistrict}
            currentArea={currentArea}
            onSelectArea={setCurrentArea}
          />
        );
      case 'datasetsInfo':
        return <DatasetsInfoView language={language} />;
      default:
        return (
          <HomeView 
            language={language} 
            onNavigate={handleNavigate} 
            currentDistrict={currentDistrict} 
            onReplayIntro={handleReplayIntro}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bgClass} flex flex-col relative transition-colors duration-500`}>
      {/* Real High-Resolution Agricultural & Tamil Nadu Farmer Photography Background */}
      <div 
        className="fixed inset-0 z-[-20] bg-cover bg-center bg-fixed transition-all duration-700 opacity-25 dark:opacity-20 pointer-events-none filter saturate-125"
        style={{ backgroundImage: `url('${currentTheme.bgImage}')` }}
      />
      {/* Translucent Atmosphere Glass Layer */}
      <div className={`fixed inset-0 z-[-15] ${currentTheme.overlayClass} pointer-events-none`} />

      {/* Unique Artistic Opening Visual (Circular Tamil Nadu Cultural & Agri Mandala) */}
      {showIntro && (
        <BhoomiXIntroScreen 
          onComplete={handleIntroComplete} 
          language={language} 
        />
      )}

      {/* Decorative agrarian ambient atmosphere glow */}
      <div className={`fixed top-0 left-1/4 w-96 h-96 ${currentTheme.accentAura} rounded-full blur-3xl pointer-events-none -z-10`} />

      {/* Top Navigation Bar with Live Tamil Nadu District Selector & Weather */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        currentView={currentView}
        onNavigate={handleNavigate}
        currentDistrict={currentDistrict}
        onSelectDistrict={handleSelectDistrict}
        currentArea={currentArea}
        onSelectArea={setCurrentArea}
        liveWeather={liveWeather}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          language={language}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {renderActiveModule()}
        </main>
      </div>

      {/* Floating AI Regional Voice Assistant Trigger Button */}
      <button
        onClick={() => setIsVoiceAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white shadow-2xl shadow-emerald-600/50 flex items-center gap-2.5 transition-all ring-4 ring-emerald-300/40 hover:scale-105 active:scale-95 group cursor-pointer"
        title={language === 'ta' ? 'குரல் வழி AI உதவியாளரிடம் பேசுக (தானியங்கி மொழி)' : 'Speak to BhoomiX AI Voice Assistant (Auto-Identified Language)'}
      >
        <div className="relative flex items-center justify-center">
          <Mic className="w-5 h-5 text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-black tracking-wide pr-1">
          {language === 'ta' ? 'குரல் வழி AI' : 'Agri Voice AI'}
        </span>
      </button>

      {/* AI Voice Assistant Modal with Automatic Language Identification */}
      <AiVoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={language}
        currentDistrict={currentDistrict}
        onNavigate={handleNavigate}
        onLanguageChange={setLanguage}
      />

      {/* Global Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          BhoomiX — {language === 'ta' ? 'பூமி எக்ஸ் AI ஸ்மார்ட் அக்ரிகல்ச்சர் தளம்' : 'AI Smart Agriculture Ecosystem'}
        </p>
        <p className="mt-1 text-slate-400 dark:text-slate-500">
          {language === 'ta' 
            ? 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான பிரத்யேக வேளாண் முடிவு ஆதரவு தளம் • ஹார்டுவேர் தேவையில்லை' 
            : 'Dedicated Agricultural Decision Support System for Tamil Nadu (38 Districts) • Software Only'
          }
        </p>
      </footer>
    </div>
  );
}

export default App;
