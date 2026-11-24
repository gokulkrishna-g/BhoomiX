import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Wheat, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getHarvestDemand } from '../services/api';

interface HarvestDemandMatchingViewProps {
  language: Language;
  onNavigate?: (view: string) => void;
}

export const HarvestDemandMatchingView: React.FC<HarvestDemandMatchingViewProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  const [data, setData] = useState<any>(null);
  const [contractSuccess, setContractSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadDemand() {
      const res = await getHarvestDemand();
      setData(res);
    }
    loadDemand();
  }, []);

  const handleBookContract = (buyerName: string, crop: string) => {
    setContractSuccess(`Forward Contract Booking Request Sent to ${buyerName} for ${crop}! A confirmation SMS has been dispatched.`);
    setTimeout(() => setContractSuccess(null), 5000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'அறுவடை & சந்தை தேவை பொருத்தம்' : 'Smart Harvest & Buyer Demand Matching'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              e-NAM & FPO Buyer Matching Network
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'அறுவடைக்கு முன்கூட்டியே அரசு கொள்முதல், உழவர் உற்பத்தியாளர் நிறுவனங்கள் (FPO) மற்றும் வணிகர்களுடன் நேரடி ஒப்பந்தம் செய்யுங்கள்.'
              : 'Matches estimated harvest dates and yields with forward procurement bids from wholesale aggregators and government MSP centers.'
            }
          </p>
        </div>
      </div>

      {contractSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{contractSuccess}</span>
        </div>
      )}

      {/* Harvest Cards Grid */}
      <div className="space-y-6">
        {data?.upcoming_harvests.map((h: any, idx: number) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {h.days_remaining} Days Until Harvest
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-1">
                  {h.crop} <span className="text-emerald-700">({h.tamil})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated Output: <strong className="text-slate-800">{h.projected_yield_tons} Metric Tons</strong> • Modal Price: <strong>{h.current_mandi_modal_price}</strong>
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950">
                <span className="font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Market Signal:</span>
                </span>
                <p className="text-[11px] mt-0.5">{h.market_trend}</p>
              </div>
            </div>

            {/* Buyer Bids matching */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ta' ? 'பொருந்திய நேரடி கொள்முதல் நிறுவனங்கள்' : 'Active Buyer Bids & Procurement Offers'}:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {h.potential_buyers.map((buyer: any, bIdx: number) => (
                  <div
                    key={bIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        {buyer.type}
                      </span>
                      <h5 className="font-bold text-xs text-slate-800 mt-2">
                        {buyer.name}
                      </h5>
                    </div>

                    <div>
                      <span className="text-base font-black text-emerald-700 block">
                        {buyer.offered_price}
                      </span>
                      <button
                        onClick={() => handleBookContract(buyer.name, h.crop)}
                        className="w-full mt-2 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        {language === 'ta' ? 'ஒப்பந்தம் கோரு' : 'Request Forward Contract'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
