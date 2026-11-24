import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Landmark, 
  FileText,
  KeyRound,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { verifyIdentity } from '../services/api';
import { TAMIL_NADU_DISTRICTS, TN_DISTRICT_NAMES, getDistrictAreas } from '../data/tamilNaduData';

interface FarmerProfileViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (district: string) => void;
  currentArea?: string;
  onSelectArea?: (area: string) => void;
}

export const FarmerProfileView: React.FC<FarmerProfileViewProps> = ({ 
  language,
  currentDistrict = "Thanjavur",
  onSelectDistrict,
  currentArea,
  onSelectArea
}) => {
  const t = translations[language];

  const [farmerName, setFarmerName] = useState('Ramasamy Gounder');
  const [aadhaarLastFour, setAadhaarLastFour] = useState('9821');
  const [patta, setPatta] = useState('TN-THNJ-PATTA-48201');
  const [district, setDistrict] = useState(currentDistrict);
  const districtAreas = getDistrictAreas(district);
  const [taluk, setTaluk] = useState(currentArea || (districtAreas[0]?.name ?? 'Kumbakonam'));
  const [mobile, setMobile] = useState('+91 98421 88410');
  const [otp, setOtp] = useState('8841');

  // Sync with prop
  React.useEffect(() => {
    if (currentDistrict && currentDistrict !== district) {
      setDistrict(currentDistrict);
      const newAreas = getDistrictAreas(currentDistrict);
      if (newAreas.length > 0) {
        setTaluk(newAreas[0].name);
      }
    }
  }, [currentDistrict]);

  React.useEffect(() => {
    if (currentArea && currentArea !== taluk) {
      setTaluk(currentArea);
    }
  }, [currentArea]);

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const newAreas = getDistrictAreas(newDist);
    if (newAreas.length > 0) {
      setTaluk(newAreas[0].name);
      if (onSelectArea) {
        onSelectArea(newAreas[0].name);
      }
    }
    if (onSelectDistrict) {
      onSelectDistrict(newDist);
    }
  };

  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulateVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyIdentity({
        farmer_name: farmerName,
        aadhaar_last_four: aadhaarLastFour,
        patta_chitta_number: patta,
        district,
        mobile,
        otp_code: otp
      });
      setVerificationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'உழவர் சுயவிவரம் & அடையாள சரிபார்ப்பு மாதிரி' : 'Farmer Profile & Identity Verification Demo'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Tamil Nadu State • 38 Districts
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'ஹேக்கத்தான் மாதிரி சரிபார்ப்பு செயல்முறை: ஆதார் எண் மற்றும் பட்டா-சிட்டா இணைப்பை சோதிக்கும் பாதுகாப்பான மாதிரி இடைமுகம்.'
              : 'Interactive demonstration workflow simulating Aadhaar seeding and Patta/Chitta land record verification for hackathon evaluation.'
            }
          </p>
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Hackathon Demonstration & Privacy Notice:</p>
          <p className="text-amber-800 leading-relaxed">
            This module is an interactive <strong>simulation only</strong>. It never collects, processes, or stores real Aadhaar numbers, biometric data, or sensitive government credentials. Any real production deployment must utilize authorized official APIs (such as UIDAI / Tamil Nadu e-Governance Agency) with end-to-end cryptographic consent.
          </p>
        </div>
      </div>

      {/* 2-Col Grid: Demo Verification Form vs Verified Profile State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Verification Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ta' ? 'மாதிரி சரிபார்ப்பு படிவம்' : 'Simulated KYC & Land Seeding Form'}</span>
          </h2>

          <form onSubmit={handleSimulateVerification} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Farmer Full Name</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Aadhaar (Mock Last 4)</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={aadhaarLastFour}
                  onChange={(e) => setAadhaarLastFour(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
                  placeholder="9821"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Registered Mobile</label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Patta / Chitta Ref Number</label>
              <input
                type="text"
                required
                value={patta}
                onChange={(e) => setPatta(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ta' ? 'தமிழ்நாடு மாவட்டம்' : 'Tamil Nadu District'}
                </label>
                <select
                  required
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:border-emerald-500 outline-none"
                >
                  {TN_DISTRICT_NAMES.map((d) => (
                    <option key={d} value={d}>
                      {d} {TAMIL_NADU_DISTRICTS[d] ? `(${TAMIL_NADU_DISTRICTS[d].tamil_name})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ta' ? 'வட்டம் / பகுதி (Taluk / Area)' : 'Taluk / Local Area'}
                </label>
                <select
                  required
                  value={taluk}
                  onChange={(e) => {
                    setTaluk(e.target.value);
                    if (onSelectArea) onSelectArea(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:border-emerald-500 outline-none"
                >
                  {districtAreas.map((a) => (
                    <option key={a.name} value={a.name}>
                      {language === 'ta' ? a.tamil_name : a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Demo OTP Code (e.g. 8841)</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-emerald-700"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                {loading ? 'Simulating NPCI Verification...' : 'Run Simulated Aadhaar & Land Record Verification'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Verified Digital Identity State (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  Verified Farmer Identity
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-1">
                  {verificationResult?.farmer_name || farmerName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Masked Aadhaar: <strong>{verificationResult?.masked_aadhaar || 'XXXX-XXXX-9821'}</strong>
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>

            {/* Land Records Status */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tamil Nadu Any-Village Patta / Chitta Verified</span>
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <p>Patta No: <strong className="text-slate-800">{patta}</strong></p>
                <p>District: <strong className="text-slate-800">{district}</strong></p>
                <p>Taluk / Area: <strong className="text-emerald-700 font-bold">{taluk}</strong></p>
                <p>Holding Size: <strong className="text-emerald-700 font-bold">3.25 Acres</strong></p>
              </div>
            </div>

            {/* Bank APB & Schemes Sync Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="font-bold text-emerald-950 block">NPCI Aadhaar Payment Bridge:</span>
                <span className="text-emerald-700 font-semibold block mt-1">✓ Active & Seeded</span>
                <span className="text-[10px] text-slate-500">Direct Benefit Transfer (DBT) Ready</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="font-bold text-emerald-950 block">PM-KISAN & PMFBY Linkage:</span>
                <span className="text-emerald-700 font-semibold block mt-1">✓ e-KYC Complete</span>
                <span className="text-[10px] text-slate-500">Kalaignar Scheme Eligible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
