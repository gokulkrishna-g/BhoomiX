import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getWasteIntelligence } from '../services/api';

interface WasteIntelligenceViewProps {
  language: Language;
}

export const WasteIntelligenceView: React.FC<WasteIntelligenceViewProps> = ({ language }) => {
  const t = translations[language];

  const [data, setData] = useState<any[]>([]);
  const [selectedWaste, setSelectedWaste] = useState<string>('Paddy Straw (Stubble)');

  useEffect(() => {
    async function loadWaste() {
      const res = await getWasteIntelligence();
      setData(res);
    }
    loadWaste();
  }, []);

  const activeWaste = data.find((d) => d.waste_type === selectedWaste) || data[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'வேளாண் கழிவு மதிப்பு உருவாக்கம் (Waste-to-Wealth)' : 'Agricultural Waste Intelligence'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Circular Bio-Economy Model
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'வைக்கோல், கரும்பு சக்கை, வாழை தண்டு மற்றும் சாணம் போன்ற கழிவுகளை எரிக்காமல் காளான் வளர்ப்பு, பயோசார், மற்றும் இயற்கை உரமாக மாற்றி வருவாய் ஈட்டுங்கள்.'
              : 'Circular agriculture engine transforming crop stubble, sugarcane bagasse, and pseudo-stems into high-margin compost, mushrooms, and biochar.'
            }
          </p>
        </div>
      </div>

      {/* Waste Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <button
            key={item.waste_type}
            onClick={() => setSelectedWaste(item.waste_type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedWaste === item.waste_type
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
            }`}
          >
            {language === 'ta' ? item.tamil : item.waste_type}
          </button>
        ))}
      </div>

      {/* Selected Waste Overview & Conversion Pathways */}
      {activeWaste && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-green-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Residue Source Selected
              </span>
              <h3 className="text-2xl font-black mt-1">
                {activeWaste.waste_type}
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                {activeWaste.tamil} • Average Biomass Yield: <strong>{activeWaste.quantity_per_acre_tons} Tons / Acre</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-emerald-100">
              Zero Crop Burning Policy Aligned • ICAR Validated
            </div>
          </div>

          {/* Conversion Pathways Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800">
              {language === 'ta' ? 'சாத்தியமான வருவாய் வாய்ப்புகள்' : 'High-Value Conversion Pathways'}:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeWaste.conversions.map((conv: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block">
                      {conv.time_days} Days Production
                    </span>

                    <h4 className="font-bold text-sm text-slate-800">
                      {conv.pathway}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {conv.process}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Required Investment:</span>
                        <strong className="text-slate-700">₹{conv.investment_rs.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gross Revenue:</span>
                        <strong className="text-slate-700">₹{conv.gross_revenue_rs.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200">
                        <span className="font-bold text-emerald-700">Net Profit / Batch:</span>
                        <strong className="text-base font-black text-emerald-700">
                          ₹{conv.net_profit_rs.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Demand: <strong className="text-slate-700">{conv.market_demand}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
