import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  Wheat,
  Bug,
  FlaskConical,
  CloudRain,
  AlertTriangle,
  Droplets,
  Compass,
  TrendingUp,
  CalendarCheck,
  ShoppingBag,
  Users,
  Share2,
  Recycle,
  Landmark,
  Milk,
  QrCode,
  Tags,
  UserCheck,
  Database,
  Home,
  Rotate3d,
  TestTube,
  Mic
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, language }) => {
  const t = translations[language];

  const navGroups = [
    {
      title: language === 'ta' ? 'முதன்மை கண்ணோட்டம்' : 'Core Overview',
      items: [
        { id: 'home', label: t.nav.home, icon: Home },
        { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
        { id: 'agriMap', label: language === 'ta' ? '3D தமிழ்நாடு வேளாண் வரைபடம்' : 'Tamil Nadu 3D Agri Map', icon: Rotate3d, badge: '3D Terrain' },
        { id: 'aiAssistant', label: t.nav.aiAssistant, icon: BrainCircuit, badge: 'AI Brain' },
      ]
    },
    {
      title: language === 'ta' ? 'செயற்கை நுண்ணறிவு & துல்லிய வேளாண்மை' : 'AI Models & Precision Agri',
      items: [
        { id: 'cropRecommendation', label: t.nav.cropRecommendation, icon: Wheat, badge: '99.5% ML' },
        { id: 'diseaseDetection', label: t.nav.diseaseDetection, icon: Bug, badge: 'Vision' },
        { id: 'soilAnalysis', label: t.nav.soilAnalysis, icon: FlaskConical },
        { id: 'soilLabs', label: (t.nav as any).soilLabs || 'Soil Testing Labs', icon: TestTube, badge: 'STLs' },
        { id: 'weather', label: t.nav.weather, icon: CloudRain, badge: 'Open-Meteo' },
        { id: 'cropFailure', label: t.nav.cropFailure, icon: AlertTriangle, badge: 'Risk AI' },
        { id: 'smartIrrigation', label: t.nav.smartIrrigation, icon: Droplets },
      ]
    },
    {
      title: language === 'ta' ? 'பண்ணை வர்த்தகம் & சுழற்சிப் பொருளாதாரம்' : 'Farm Commerce & Circular Economy',
      items: [
        { id: 'profitAnalysis', label: t.nav.profitAnalysis, icon: TrendingUp, badge: 'ICRISAT' },
        { id: 'harvestDemand', label: t.nav.harvestDemand, icon: CalendarCheck },
        { id: 'marketplace', label: t.nav.marketplace, icon: ShoppingBag },
        { id: 'community', label: t.nav.community, icon: Users },
        { id: 'resourceSharing', label: t.nav.resourceSharing, icon: Share2 },
        { id: 'wasteIntelligence', label: t.nav.wasteIntelligence, icon: Recycle, badge: 'Wealth' },
      ]
    },
    {
      title: language === 'ta' ? 'உழவர் சேவைகள் & வெளிப்படைத்தன்மை' : 'Farmer Services & Transparency',
      items: [
        { id: 'governmentSchemes', label: t.nav.governmentSchemes, icon: Landmark, badge: 'TN / Central' },
        { id: 'livestock', label: t.nav.livestock, icon: Milk },
        { id: 'tracking', label: t.nav.tracking, icon: QrCode, badge: 'Trace' },
        { id: 'lowCostFinder', label: t.nav.lowCostFinder, icon: Tags },
        { id: 'farmerProfile', label: t.nav.farmerProfile, icon: UserCheck, badge: 'KYC Demo' },
        { id: 'datasetsInfo', label: t.nav.datasetsInfo, icon: Database, badge: 'Open Data' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto custom-scrollbar flex flex-col p-3 space-y-6">
      {navGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {group.title}
          </p>
          <div className="space-y-0.5 pt-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        isActive
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 px-3 pb-4">
        <p className="font-semibold text-slate-500">BhoomiX Tamil Nadu</p>
        <p>{language === 'ta' ? 'அனைத்தும்-ஒருங்கிணைந்த உழவர் இயங்குதளம்' : 'Integrated Smart Agri Ecosystem'}</p>
      </div>
    </aside>
  );
};
