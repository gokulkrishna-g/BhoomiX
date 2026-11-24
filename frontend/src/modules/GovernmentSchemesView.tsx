import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getGovernmentSchemes } from '../services/api';

interface GovernmentSchemesViewProps {
  language: Language;
}

export const GovernmentSchemesView: React.FC<GovernmentSchemesViewProps> = ({ language }) => {
  const t = translations[language];

  const [schemes, setSchemes] = useState<any[]>([]);
  const [landFilter, setLandFilter] = useState<number>(3.0);
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');

  const fetchSchemes = async () => {
    try {
      const data = await getGovernmentSchemes(landFilter, selectedState);
      setSchemes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [landFilter, selectedState]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'அரசு மானிய திட்டங்கள் & தகுதி கண்டறிதல்' : 'AI Government Scheme Eligibility & Discovery'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Tamil Nadu Agrisnet & Central Scheme Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'உங்கள் நிலப்பரப்பு மற்றும் பயிர் வகைக்கு ஏற்ற மத்திய மற்றும் தமிழ்நாடு அரசு விவசாய நலத்திட்டங்களை கண்டறிந்து விண்ணப்பிக்கவும்.'
              : 'Personalized eligibility engine mapping farmer landholding and crop types to central and state agricultural schemes.'
            }
          </p>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="font-semibold text-slate-700">Filter by Land Size:</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={landFilter}
              onChange={(e) => setLandFilter(parseFloat(e.target.value))}
              className="accent-emerald-600"
            />
            <span className="font-bold text-emerald-700">{landFilter} Hectares</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-700">Jurisdiction:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
          >
            <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
            <option value="All India">All India Schemes (அனைத்திந்திய)</option>
          </select>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schemes.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {s.category}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">
                  Max Land: {s.eligibility.max_land_ha > 50 ? 'All Farmers' : `${s.eligibility.max_land_ha} ha`}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-800">
                  {s.title}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                  {s.tamil_title}
                </p>
              </div>

              {/* Benefit Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  {language === 'ta' ? 'திட்டத்தின் பயன்' : 'Scheme Financial & Input Benefit'}:
                </span>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {s.benefit}
                </p>
              </div>

              {/* Documents Required */}
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-600 block">
                  {language === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents'}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {s.documents_required.map((doc: string, dIdx: number) => (
                    <span key={dIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate max-w-[200px]">
                {s.application_mode}
              </span>
              <a
                href={s.official_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>{language === 'ta' ? 'அதிகாரப்பூர்வ தளம்' : 'Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
