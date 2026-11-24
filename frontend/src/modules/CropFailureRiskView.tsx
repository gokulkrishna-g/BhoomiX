import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Droplets, 
  Thermometer, 
  Bug, 
  Sparkles, 
  CheckCircle2, 
  Info,
  SlidersHorizontal,
  MapPin,
  Building2
} from 'lucide-react';
import { Language, CropFailureRiskResponse } from '../types';
import { translations } from '../translations';
import { getCropFailureRisk } from '../services/api';
import { TN_DISTRICT_NAMES } from '../data/tamilNaduData';
import { getDistrictSoilProfile, TN_DISTRICT_SOIL_PROFILES } from '../data/districtSoilProfiles';

interface CropFailureRiskViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
}

export const CropFailureRiskView: React.FC<CropFailureRiskViewProps> = ({ 
  language,
  currentDistrict = "Thanjavur",
  onSelectDistrict
}) => {
  const t = translations[language];
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentDistrict);

  useEffect(() => {
    setSelectedDistrict(currentDistrict);
  }, [currentDistrict]);

  const initialProfile = getDistrictSoilProfile(selectedDistrict);

  // Parameters
  const [rainDev, setRainDev] = useState(Math.round(((initialProfile.recent_rainfall_mm - 18) / 18) * 100));
  const [tempStress, setTempStress] = useState(Math.max(0, Math.round((initialProfile.temp_c - 28) * 10) / 10));
  const [soilMoist, setSoilMoist] = useState(initialProfile.soil_moisture_pct);
  const [phDev, setPhDev] = useState(Math.round(Math.abs(initialProfile.ph - 7.0) * 10) / 10);
  const [npkDef, setNpkDef] = useState(initialProfile.n_status === 'Low' ? 0.45 : 0.20);
  const [pestPressure, setPestPressure] = useState(0.25);

  const [risk, setRisk] = useState<CropFailureRiskResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // When district changes, automatically calibrate parameters
  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
    const prof = getDistrictSoilProfile(dist);
    setRainDev(Math.round(((prof.recent_rainfall_mm - 18) / 18) * 100));
    setTempStress(Math.max(0, Math.round((prof.temp_c - 28) * 10) / 10));
    setSoilMoist(prof.soil_moisture_pct);
    setPhDev(Math.round(Math.abs(prof.ph - 7.0) * 10) / 10);
    setNpkDef(prof.n_status === 'Low' ? 0.45 : 0.20);
  };

  const runRiskAssessment = async () => {
    setLoading(true);
    try {
      const data = await getCropFailureRisk({
        rainfall_deviation: rainDev,
        temperature_stress: tempStress,
        soil_moisture: soilMoist,
        ph_deviation: phDev,
        npk_deficiency: npkDef,
        pest_pressure: pestPressure
      });
      setRisk(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runRiskAssessment();
  }, [rainDev, tempStress, soilMoist, phDev, npkDef, pestPressure, selectedDistrict]);

  const profile = getDistrictSoilProfile(selectedDistrict);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-red-950 text-white shadow-xl border border-amber-600/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-7 h-7 text-amber-400" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ta' ? 'பயிர் இழப்பு முன்கணிப்பு எச்சரிக்கை' : 'Predictive Crop Failure Early Warning'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-2 max-w-2xl">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான மழை மாறுபாடு, மண் ஈரப்பதம் மற்றும் ஆய்வக ஊட்டச்சத்து குறைபாட்டை பகுப்பாய்வு செய்யும் எச்சரிக்கை மாதிரி.'
                : 'Gradient Boosting early warning engine analyzing agro-meteorological anomalies and soil health deficits across all 38 Tamil Nadu districts.'
              }
            </p>
          </div>

          {/* Real-time reactive indicator (No calculation button) */}
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>
              {loading 
                ? t.common.loading 
                : (language === 'ta' ? 'தானியங்கி உடனடி இடர் மதிப்பீடு' : 'Instant Reactive Risk Engine')
              }
            </span>
          </div>
        </div>

        {/* District Selector & Lab Data Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-amber-200 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ta' ? 'தமிழ்நாடு மாவட்டம் (38 மாவட்டங்கள்):' : 'Tamil Nadu District (38 Districts):'}</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-amber-400/40 text-white rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-400 outline-none"
            >
              {TN_DISTRICT_NAMES.map(name => {
                const p = TN_DISTRICT_SOIL_PROFILES[name];
                return (
                  <option key={name} value={name} className="bg-slate-900 text-white">
                    {name} — {p ? p.district_ta : ''}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col justify-center bg-black/25 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{language === 'ta' ? profile.stl_lab_ta : profile.stl_lab}</span>
            </div>
            <div className="text-[11px] text-amber-100/80 mt-1 flex items-center gap-3">
              <span>{language === 'ta' ? 'வானிலை' : 'Weather'}: <strong className="text-white">{profile.weather_condition} ({profile.temp_c}°C)</strong></span>
              <span>•</span>
              <span>{language === 'ta' ? 'ஈரப்பதம்' : 'Moisture'}: <strong className="text-white">{profile.soil_moisture_pct}%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Col Grid: Parameters vs Risk Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>{language === 'ta' ? 'சுற்றுச்சூழல் & மண் அழுத்த அளவீடுகள்' : 'Stress & Anomaly Controls'}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              {selectedDistrict} Calibrated
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'மழை மாறுபாடு (%) [வானிலை]' : 'Seasonal Rainfall Deviation (%) [Weather]'}:</span>
                <span className={`font-bold ${rainDev < -20 ? 'text-rose-600' : 'text-blue-600'}`}>{rainDev}%</span>
              </div>
              <input
                type="range"
                min="-80"
                max="80"
                value={rainDev}
                onChange={(e) => setRainDev(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'வெப்பநிலை விலகல் (+°C)' : 'Heat Stress Above Normal (+°C)'}:</span>
                <span className="text-orange-600 font-bold">+{tempStress}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={tempStress}
                onChange={(e) => setTempStress(parseFloat(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'மண் ஈரப்பதம் (%) [வானிலை/ஆய்வகம்]' : 'Root-Zone Soil Moisture (%) [Weather/Lab]'}:</span>
                <span className={`font-bold ${soilMoist < 30 ? 'text-rose-600' : 'text-emerald-700'}`}>{soilMoist}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                value={soilMoist}
                onChange={(e) => setSoilMoist(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'மண் pH விலகல் [ஆய்வகம்]' : 'pH Deviation from Neutral [Lab]'}:</span>
                <span className="text-amber-700 font-bold">±{phDev}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={phDev}
                onChange={(e) => setPhDev(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'NPK ஊட்டச்சத்து குறைபாடு விகிதம்' : 'NPK Deficiency Ratio [Lab]'}:</span>
                <span className="text-purple-700 font-bold">{Math.round(npkDef * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={npkDef}
                onChange={(e) => setNpkDef(parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'பூச்சி தாக்குதல் அழுத்தம்' : 'Observed Pest Pressure'}:</span>
                <span className="text-rose-700 font-bold">{Math.round(pestPressure * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={pestPressure}
                onChange={(e) => setPestPressure(parseFloat(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {risk && (
            <div className="space-y-4">
              {/* Primary Risk Score Card */}
              <div className={`p-6 rounded-3xl text-white shadow-xl space-y-3 border ${
                risk.risk_level === 'High' 
                  ? 'bg-gradient-to-br from-rose-800 to-red-950 border-rose-500/40' 
                  : risk.risk_level === 'Moderate'
                  ? 'bg-gradient-to-br from-amber-700 to-stone-900 border-amber-500/40'
                  : 'bg-gradient-to-br from-emerald-700 to-teal-900 border-emerald-500/40'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                    {language === 'ta' ? 'கணிக்கப்பட்ட பயிர் இழப்பு ஆபத்து நிலை' : 'Predicted Crop Failure Risk'}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    {risk.risk_level}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-black">{risk.risk_score_percent}/100</span>
                  <span className="text-sm font-semibold opacity-90">
                    (Gradient Boosting Risk Model)
                  </span>
                </div>

                <p className="text-xs text-white/90 leading-relaxed">
                  {selectedDistrict} {language === 'ta' ? 'மாவட்டத்தின் தற்போதைய வானிலை மற்றும் ஆய்வகத் தரவுகளின் அடிப்படையில் பகுப்பாய்வு செய்யப்பட்டது.' : 'evaluated using live weather updates and soil lab benchmarks.'}
                </p>
              </div>

              {/* Critical Contributing Factors */}
              {risk.contributing_factors && risk.contributing_factors.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    {language === 'ta' ? 'இடரை தூண்டும் காரணிகள்' : 'Key Stress Contributors'}:
                  </span>
                  <ul className="space-y-1">
                    {risk.contributing_factors.map((factor, fIdx) => (
                      <li key={fIdx} className="text-xs text-amber-800 flex items-center gap-1.5 font-medium">
                        <span>•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preventative Mitigation Actions */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ta' ? 'பரிந்துரைக்கப்படும் உடனடி தடுப்பு நடவடிக்கைகள்' : 'Recommended Preventative Measures'}:</span>
                </h4>
                <ul className="space-y-2">
                  {(risk.mitigation_actions || []).map((m: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
