import React, { useState, useEffect } from 'react';
import { 
  Milk, 
  Heart, 
  Activity, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Scale
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getLivestock } from '../services/api';

interface LivestockManagementViewProps {
  language: Language;
}

export const LivestockManagementView: React.FC<LivestockManagementViewProps> = ({ language }) => {
  const t = translations[language];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadLivestock() {
      const res = await getLivestock();
      setData(res);
    }
    loadLivestock();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'கால்நடை & பால் பண்ணை மேலாண்மை' : 'Livestock & Dairy Management'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Dairy Cattle Health & Lactation Optimizer
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'காங்கேயம் மற்றும் முர்ரா மாடுகளின் பால் மகசூல், தடுப்பூசி அட்டவணை, மற்றும் ஊட்டச்சத்து விகிதங்களை கண்காணிக்கும் தளம்.'
              : 'Digital herd management tracking lactation stages, daily milk yield, feed optimization ratios, and FMD vaccinations.'
            }
          </p>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          {/* Daily Milk Production Summary Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Daily Milk Yield Aggregate
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black">{data.milk_production_summary.total_daily_yield_liters} L</span>
                <span className="text-xs text-indigo-200">Avg Fat: {data.milk_production_summary.average_fat_pct}%</span>
              </div>
              <p className="text-xs text-indigo-200">
                Aavin Cooperative Procurement Rate: <strong>{data.milk_production_summary.aavin_cooperative_price_per_liter}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
              <span className="text-[10px] uppercase text-indigo-300 block font-semibold">Projected Monthly Dairy Income</span>
              <strong className="text-2xl font-black text-emerald-400">
                {data.milk_production_summary.projected_monthly_dairy_revenue}
              </strong>
            </div>
          </div>

          {/* Cattle Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.animals.map((cattle: any) => (
              <div
                key={cattle.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">{cattle.tag}</span>
                    <h3 className="text-lg font-bold text-slate-800 mt-0.5">{cattle.breed}</h3>
                    <p className="text-xs text-slate-500">{cattle.type} • Age: {cattle.age_years} Years</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {cattle.health_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Lactation Stage</span>
                    <strong className="text-slate-800">{cattle.lactation_stage}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Daily Milk Output</span>
                    <strong className="text-indigo-600 text-sm">{cattle.daily_milk_yield_liters} Liters</strong>
                  </div>
                </div>

                {/* Optimal Feed Ratio */}
                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1 text-xs text-indigo-950">
                  <span className="font-bold flex items-center space-x-1">
                    <Scale className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Scientifically Formulated Daily Feed Ratio:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {cattle.optimal_feed_ratio}
                  </p>
                </div>

                {/* Vaccinations */}
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
                  <span>FMD: <strong>{cattle.vaccination.FMD}</strong></span>
                  <span>{cattle.vaccination.Anthrax ? `Anthrax: ${cattle.vaccination.Anthrax}` : 'Brucellosis Clean'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
