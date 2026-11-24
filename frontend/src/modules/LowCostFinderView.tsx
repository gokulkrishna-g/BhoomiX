import React, { useState, useEffect } from 'react';
import { 
  Tags, 
  Search, 
  MapPin, 
  Sparkles, 
  TrendingDown, 
  CheckCircle2, 
  Store
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getLowCostFinder } from '../services/api';
import { TN_DISTRICT_NAMES, TAMIL_NADU_DISTRICTS } from '../data/tamilNaduData';

interface LowCostFinderViewProps {
  language: Language;
  currentDistrict?: string;
}

export const LowCostFinderView: React.FC<LowCostFinderViewProps> = ({ language, currentDistrict = "Thanjavur" }) => {
  const t = translations[language];

  const [district, setDistrict] = useState(currentDistrict);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (currentDistrict) {
      setDistrict(currentDistrict);
    }
  }, [currentDistrict]);

  useEffect(() => {
    async function loadPrices() {
      const res = await getLowCostFinder(district);
      setData(res);
    }
    loadPrices();
  }, [district]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'குறைந்த செலவு இடுபொருள் தேடல் & ஒப்பீடு' : 'Low-Cost Farming Resource Finder'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Tamil Nadu PACS & Agri Depot Benchmark
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'அரசு மானிய விதைகள், உயிர்ம உரங்கள் மற்றும் வேளாண் இயந்திர வாடகை மையங்களின் விலைகளை திறந்த சந்தையுடன் ஒப்பிட்டு செலவை குறையுங்கள்.'
              : 'Direct price benchmarking comparing subsidized Government Agri-Extension depots & Primary Agricultural Co-op Societies against open market rates.'
            }
          </p>
        </div>

        {/* District Selector - Tamil Nadu 38 Districts */}
        <div className="flex items-center space-x-2">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50 font-bold text-xs text-emerald-900 shadow-sm focus:outline-none"
          >
            {TN_DISTRICT_NAMES.map((d) => (
              <option key={d} value={d}>
                {d} {TAMIL_NADU_DISTRICTS[d] ? `(${TAMIL_NADU_DISTRICTS[d].tamil_name})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3 text-emerald-600" />
                      <span>{item.savings_pct}% Cheaper</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1">
                      <Store className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Source: <strong className="text-slate-700">{item.source}</strong></span>
                    </p>
                  </div>

                  {/* Price Comparison Box */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-700 uppercase font-bold block">Govt Depot Rate</span>
                      <strong className="text-base font-black text-emerald-700">{item.govt_depot_price}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Open Market Rate</span>
                      <span className="text-xs font-semibold text-slate-500 line-through">{item.open_market_price}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Stock Status: <strong className="text-emerald-700">{item.availability}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
