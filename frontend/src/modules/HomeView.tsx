import React from 'react';
import { 
  Sprout, 
  BrainCircuit, 
  Wheat, 
  Bug, 
  CloudRain, 
  Compass, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Droplets,
  Recycle,
  Landmark,
  Database,
  CalendarCheck,
  ShoppingBag,
  Users,
  Share2,
  Milk,
  QrCode,
  Rotate3d,
  TestTube,
  PlayCircle,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { BhoomiXLogo } from '../components/BhoomiXLogo';

interface HomeViewProps {
  language: Language;
  onNavigate: (view: string) => void;
  currentDistrict?: string;
  onReplayIntro?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  language, 
  onNavigate, 
  currentDistrict = "Thanjavur",
  onReplayIntro
}) => {
  const t = translations[language];

  const highlights = [
    {
      id: 'agriMap',
      icon: Rotate3d,
      title: language === 'ta' ? '3D புவியியல் வேளாண் வரைபடம்' : '3D Geographical Agriculture Map',
      desc: language === 'ta' 
        ? 'செயற்கைக்கோள் படங்கள் மற்றும் மேற்கு தொடர்ச்சி மலை 3D நிலப்பரப்புடன் 38 மாவட்ட வேளாண் எல்லைகளை ஆராயுங்கள்.' 
        : 'Explore natural terrain elevation, Western Ghats topography, and 38 Tamil Nadu district boundaries with high-resolution satellite imagery.',
      badge: 'Unified 3D Map',
      color: 'from-emerald-700 to-teal-900',
      tag: 'Satellite 3D'
    },
    {
      id: 'dashboard',
      icon: Compass,
      title: language === 'ta' ? 'பிரத்யேக உழவர் பலகை' : 'Dedicated Farmer Dashboard',
      desc: language === 'ta' 
        ? 'மாவட்ட நேரலை வானிலை, உழவர் பயிர் திட்டம், உழவர் சந்தை விலைகள் மற்றும் அரசு மானியங்களை ஒரே இடத்தில் பாருங்கள்.' 
        : 'Comprehensive digital farm command center featuring live district meteorology, mandi price feeds, and crop calendars.',
      badge: 'Farmer First',
      color: 'from-green-700 to-emerald-900',
      tag: 'All-in-One'
    },
    {
      id: 'soilLabs',
      icon: TestTube,
      title: language === 'ta' ? 'அரசு மண் பரிசோதனை ஆய்வகங்கள்' : 'Nearby Soil Testing Laboratories (STLs)',
      desc: language === 'ta' 
        ? 'தமிழ்நாடு அரசு மண் பரிசோதனை நிலையங்கள் (STL) மற்றும் KVK மையங்களின் தொலைபேசி மற்றும் கட்டண விவரங்கள்.' 
        : 'Official directory of Government Soil Testing Laboratories and TNAU KVKs across all 38 districts with Soil Health Card facility.',
      badge: 'Verified STLs',
      color: 'from-amber-700 to-stone-900',
      tag: '38 STLs'
    },
    {
      id: 'aiAssistant',
      icon: BrainCircuit,
      title: language === 'ta' ? 'AI விவசாய முடிவு உதவியாளர்' : 'AI Farming Decision Assistant',
      desc: language === 'ta' 
        ? 'மண் வகை, பயிர் பருவம் மற்றும் வானிலையை ஒருங்கிணைத்து 10-காரணி பகுப்பாய்வு மூலம் துல்லிய ஆலோசனைகளை வழங்குகிறது.' 
        : 'Cognitive multi-criteria decision assistant factoring soil classification, phenology, and micro-climate with reactive calculation.',
      badge: 'Cognitive AI',
      color: 'from-teal-700 to-slate-900',
      tag: '10 Factors'
    },
    {
      id: 'cropRecommendation',
      icon: Wheat,
      title: language === 'ta' ? 'AI பயிர் பரிந்துரை இயந்திரம்' : 'AI Crop Recommendation Engine',
      desc: language === 'ta' 
        ? '2,200 ஆய்வக தரவுகளின் அடிப்படையில் 99.55% துல்லியத்துடன் உங்கள் நிலத்திற்கு உகந்த பயிரை பரிந்துரைக்கும் ML மாதிரி.' 
        : 'Supervised Random Forest classifier achieving 99.55% test accuracy across 22 crop classes with instant reactive updates.',
      badge: '99.55% ML',
      color: 'from-emerald-800 to-green-950',
      tag: 'RandomForest'
    },
    {
      id: 'weather',
      icon: CloudRain,
      title: language === 'ta' ? 'நேரலை வானிலை & வேளாண் ஆலோசனை' : 'Live Weather & Agro-Meteorology',
      desc: language === 'ta' 
        ? 'தேர்ந்தெடுக்கப்பட்ட மாவட்டத்திற்கான நேரலை வானிலை மற்றும் பாசனம், விதைப்பு, பூச்சி மருந்து தெளிப்பு ஆலோசனைகள்.' 
        : 'Live district-specific meteorological conditions with automated 5-point agro advisories for irrigation, sowing, and pesticide timing.',
      badge: 'Live IMD/TNAU',
      color: 'from-sky-700 to-blue-950',
      tag: 'Agro Advisory'
    },
    {
      id: 'smartIrrigation',
      icon: Droplets,
      title: language === 'ta' ? 'துல்லிய நீர் மேலாண்மை' : 'Smart Irrigation (FAO-56)',
      desc: language === 'ta' 
        ? 'பயிர் ஆவியாதல் (ETc) மற்றும் மண் ஈரப்பத பற்றாக்குறையின் அடிப்படையில் சொட்டு நீர் பாசன நேரத்தை கணக்கிடுகிறது.' 
        : 'Computes crop evapotranspiration (ETc), root-zone moisture deficit depth, and precise drip run-time in minutes.',
      badge: 'FAO-56 Model',
      color: 'from-cyan-700 to-teal-950',
      tag: 'Water Budget'
    },
    {
      id: 'diseaseDetection',
      icon: Bug,
      title: language === 'ta' ? 'பூச்சி & நோய் கண்டறிதல்' : 'Pest & Weed AI Diagnostic',
      desc: language === 'ta' 
        ? 'பயிர்களின் இலை படங்களை ஆய்வு செய்து படைப்புழு, இலைச்சுருட்டு போன்ற பூச்சிகளை கண்டறிந்து இயற்கை மருந்துகளை தெரிவிக்கும்.' 
        : 'Computer vision diagnostics detecting yellow stem borer, army worm, and leaf folder with integrated organic treatments.',
      badge: 'Roboflow Vision',
      color: 'from-rose-700 to-stone-900',
      tag: 'Image AI'
    },
    {
      id: 'profitAnalysis',
      icon: TrendingUp,
      title: language === 'ta' ? 'பயிர் லாப-நஷ்ட பகுப்பாய்வு' : 'AI Profit & Yield Prediction',
      desc: language === 'ta' 
        ? 'ICRISAT இந்திய வேளாண் தரவுகளின் அடிப்படையில் உற்பத்தி செலவு, எதிர்பார்க்கப்படும் மகசூல் மற்றும் லாபத்தை கணக்கிடுகிறது.' 
        : 'Financial analytics combining ICRISAT district yield regressors, mandi pricing, and cost of cultivation with instant reactive ledger.',
      badge: 'ICRISAT R²=0.90',
      color: 'from-amber-800 to-emerald-950',
      tag: 'Financial AI'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section with Natural Agrarian Landscape & Glassmorphic Presentation */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-600/30 text-white">
        {/* Background Visual Layer: Lush Paddy Field Landscape & Organic Light Gradient */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        {/* Deep Green & Earth Overlay to ensure high contrast and readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-emerald-950/90 to-stone-950/85 backdrop-blur-[2px]" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        
        {/* Hero Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-4xl space-y-6">
          {/* Top Pill Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'ta' 
                  ? 'தமிழ்நாடு பிரத்யேக ஸ்மார்ட் அக்ரிகல்ச்சர் தளம் • 38 மாவட்டங்கள்' 
                  : 'Tamil Nadu Smart Agriculture Platform • 38 Districts Focused'
                }
              </span>
            </div>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-emerald-200 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'ta' ? 'அறிமுக காட்சியை மீண்டும் காண்க' : 'Replay BhoomiX Intro'}</span>
              </button>
            )}
          </div>

          {/* Main Title & Brand Identity */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span>Bhoomi</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                X
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-100/90 mt-2 font-serif">
                {language === 'ta' 
                  ? 'தமிழ்நாட்டு உழவர்களுக்கான அறிவார்ந்த AI வேளாண் சுற்றுச்சூழல்' 
                  : 'Tamil Nadu Smart AI Agriculture & Decision Ecosystem'
                }
              </span>
            </h1>

            <p className="text-emerald-100/85 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான நேரலை வானிலை, மண் பரிசோதனை ஆய்வக முடிவுகள், 99.55% துல்லிய பயிர் பரிந்துரை, முப்பரிமாண புவியியல் நில வரைபடம் மற்றும் 100% உடனடி தானியங்கி கணக்கீடுகளை வழங்கும் ஒருங்கிணைந்த தளம்.'
                : 'An interconnected agricultural decision-support ecosystem featuring live district meteorology, realistic 3D satellite terrain map, 99.55% accuracy ML crop models, and automated reactive calculations across every sector.'
              }
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{language === 'ta' ? 'உழவர் முகப்பு பலகை' : 'Launch Farmer Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('agriMap')}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-emerald-400/40 text-emerald-200 font-bold text-xs sm:text-sm transition-all backdrop-blur-md shadow-lg hover:scale-105 cursor-pointer"
            >
              <Rotate3d className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ta' ? '3D புவியியல் வரைபடம்' : '3D Terrain Map'}</span>
            </button>
            <button
              onClick={() => onNavigate('aiAssistant')}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all backdrop-blur-md hover:scale-105 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4 text-teal-300" />
              <span>{language === 'ta' ? 'AI முடிவு உதவியாளர்' : 'AI Decision Assistant'}</span>
            </button>
            <button
              onClick={() => onNavigate('soilLabs')}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all backdrop-blur-md hover:scale-105 cursor-pointer"
            >
              <TestTube className="w-4 h-4 text-amber-300" />
              <span>{language === 'ta' ? 'மண் பரிசோதனை' : 'Soil Labs'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Ticker Banner */}
        <div className="relative z-10 mt-4 bg-slate-950/70 backdrop-blur-md border-t border-emerald-500/30 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="border-r border-white/10 last:border-none">
            <p className="text-[11px] text-emerald-300 uppercase font-bold tracking-wider">Tamil Nadu Coverage</p>
            <p className="text-2xl sm:text-3xl font-black text-white">38 / 38</p>
            <p className="text-[10px] text-emerald-400">100% District Coverage</p>
          </div>
          <div className="border-r border-white/10 last:border-none">
            <p className="text-[11px] text-amber-300 uppercase font-bold tracking-wider">ML Crop Accuracy</p>
            <p className="text-2xl sm:text-3xl font-black text-white">99.55%</p>
            <p className="text-[10px] text-amber-400">RandomForest Model</p>
          </div>
          <div className="border-r border-white/10 last:border-none">
            <p className="text-[11px] text-cyan-300 uppercase font-bold tracking-wider">Yield Model R²</p>
            <p className="text-2xl sm:text-3xl font-black text-white">0.9053</p>
            <p className="text-[10px] text-cyan-400">ICRISAT Agronomic Regressor</p>
          </div>
          <div>
            <p className="text-[11px] text-emerald-300 uppercase font-bold tracking-wider">Reactive Updates</p>
            <p className="text-2xl sm:text-3xl font-black text-white">Instant</p>
            <p className="text-[10px] text-emerald-400">Zero Manual Button Clicks</p>
          </div>
        </div>
      </div>

      {/* Core Innovation Highlights Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              {language === 'ta' ? 'வேளாண் AI & துல்லிய முடிவு மாதிரிகள்' : 'Core Agriculture & AI Decision Modules'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'ta'
                ? 'தமிழ்நாடு உழவர்களுக்காக வடிவமைக்கப்பட்ட துல்லிய அறிவியல் தீர்வுகள்.'
                : 'Verified agronomic decision-support modules tailored for Tamil Nadu agro-climatic conditions.'
              }
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
            38 Tamil Nadu Districts
          </span>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                  <span>{language === 'ta' ? 'தொடங்குக' : 'Explore Module'}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
