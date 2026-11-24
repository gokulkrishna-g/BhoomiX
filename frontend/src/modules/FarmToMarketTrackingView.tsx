import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Search,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getTracking } from '../services/api';

interface FarmToMarketTrackingViewProps {
  language: Language;
}

export const FarmToMarketTrackingView: React.FC<FarmToMarketTrackingViewProps> = ({ language }) => {
  const t = translations[language];

  const [batchCode, setBatchCode] = useState('BX-2026-TN-4821');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchProvenance = async (code: string) => {
    setLoading(true);
    try {
      const res = await getTracking(code);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvenance(batchCode);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'பண்ணை முதல் சந்தை வரை வெளிப்படைத்தன்மை கண்காணிப்பு' : 'Transparent Farm-to-Market Provenance Tracking'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verifiable Supply Chain Audit Trail
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'விதைப்பு, இயற்கை பராமரிப்பு, அறுவடை, ஆய்வக தரம் மற்றும் போக்குவரத்து நிலைகளை நுகர்வோர் வெளிப்படையாக அறியலாம்.'
              : 'Verifiable batch provenance timeline showing exact seed origin, zero-pesticide lab certificates, and transit log.'
            }
          </p>
        </div>

        {/* Batch Search Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={batchCode}
            onChange={(e) => setBatchCode(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Batch Code"
          />
          <button
            onClick={() => fetchProvenance(batchCode)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            Track
          </button>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          {/* Batch Summary Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Batch: {data.batch_id}
              </span>
              <h2 className="text-xl font-black text-slate-800 mt-2">
                {data.crop}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Cultivated by: <strong className="text-slate-800">{data.farmer.name}</strong> • {data.farmer.village}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                TN Organic Certification: {data.farmer.organic_certification}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <span className="font-bold text-slate-700 block">Lab Quality Verified:</span>
              <p className="text-emerald-700 font-semibold">✓ Pesticide Residue: {data.lab_quality_certificate.pesticide_residue}</p>
              <p className="text-slate-600">Purity: {data.lab_quality_certificate.purity_pct}% • Moisture: {data.lab_quality_certificate.moisture_pct}%</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center space-x-2">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'முழுமையான பயணப் பாதை (Provenance Timeline)' : 'Chronological Audit Timeline'}:</span>
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-emerald-500 ml-3">
              {data.timeline.map((step: any, idx: number) => (
                <div key={idx} className="relative space-y-1">
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <h4 className="font-bold text-slate-800">{step.stage}</h4>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">{step.date}</span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium">
                    📍 {step.location}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
