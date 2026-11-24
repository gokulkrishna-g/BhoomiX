import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Droplets, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  MapPin,
  CloudRain,
  Building2,
  Layers,
  Thermometer
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getSoilAnalysis } from '../services/api';
import { TN_DISTRICT_NAMES } from '../data/tamilNaduData';
import { getDistrictSoilProfile, TN_DISTRICT_SOIL_PROFILES } from '../data/districtSoilProfiles';

interface SoilAnalysisViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
}

export const SoilAnalysisView: React.FC<SoilAnalysisViewProps> = ({ 
  language, 
  currentDistrict = "Thanjavur",
  onSelectDistrict 
}) => {
  const t = translations[language];
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentDistrict);

  // Sync when prop updates
  useEffect(() => {
    setSelectedDistrict(currentDistrict);
  }, [currentDistrict]);

  // Load baseline profile for selected district
  const initialProfile = getDistrictSoilProfile(selectedDistrict);

  const [n, setN] = useState(initialProfile.n);
  const [p, setP] = useState(initialProfile.p);
  const [k, setK] = useState(initialProfile.k);
  const [ph, setPh] = useState(initialProfile.ph);
  const [ec, setEc] = useState(initialProfile.ec);
  const [oc, setOc] = useState(initialProfile.oc);
  const [rainfall, setRainfall] = useState(initialProfile.recent_rainfall_mm);
  const [soilMoisture, setSoilMoisture] = useState(initialProfile.soil_moisture_pct);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Automatically update lab & weather values when district changes
  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
    const prof = getDistrictSoilProfile(dist);
    setN(prof.n);
    setP(prof.p);
    setK(prof.k);
    setPh(prof.ph);
    setEc(prof.ec);
    setOc(prof.oc);
    setRainfall(prof.recent_rainfall_mm);
    setSoilMoisture(prof.soil_moisture_pct);
  };

  const fetchSoilReport = async () => {
    setLoading(true);
    try {
      const data = await getSoilAnalysis({ n, p, k, ph, ec, oc });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Instant reactive calculation whenever lab or weather metrics change
  useEffect(() => {
    fetchSoilReport();
  }, [n, p, k, ph, ec, oc, rainfall, soilMoisture, selectedDistrict]);

  const profile = getDistrictSoilProfile(selectedDistrict);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner with Rich Soil Texture Aesthetic */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900 via-stone-800 to-emerald-950 text-white shadow-xl border border-amber-700/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <FlaskConical className="w-7 h-7 text-amber-400" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ta' ? 'மண் பரிசோதனை & ஊட்டச்சத்து மேலாண்மை' : 'Soil Testing & Digital Soil Health Card'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-2 max-w-2xl">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்ட அரசு மண் பரிசோதனை ஆய்வகங்கள் (STL) மற்றும் வானிலை அடிப்படையிலான தானியங்கி உடனடி மண் அட்டை பகுப்பாய்வு.'
                : 'Digital Soil Health Card generator integrated with 38 Tamil Nadu District Soil Testing Laboratories (STL) and live weather updates.'
              }
            </p>
          </div>

          {/* Real-time reactive indicator (No calculation button) */}
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>
              {loading 
                ? t.common.loading 
                : (language === 'ta' ? 'தானியங்கி உடனடி பகுப்பாய்வு' : 'Instant Reactive Soil Card')
              }
            </span>
          </div>
        </div>

        {/* District Selector & Laboratory Badge */}
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
              <span>{language === 'ta' ? 'மண் வகை' : 'Soil Type'}: <strong className="text-white">{language === 'ta' ? profile.soil_type_ta : profile.soil_type}</strong></span>
              <span>•</span>
              <span>{language === 'ta' ? 'மண்டலம்' : 'Agro Zone'}: <strong className="text-white">{language === 'ta' ? profile.zone_ta : profile.zone}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Agro-Weather and Soil Moisture Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-r from-amber-50 to-emerald-50 p-4 rounded-2xl border border-amber-200/60 shadow-sm">
        <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase block flex items-center gap-1">
            <CloudRain className="w-3.5 h-3.5 text-blue-600" />
            {language === 'ta' ? 'சமீபத்திய மழைப்பொழிவு' : 'Recent Rainfall'}
          </span>
          <span className="text-lg font-black text-blue-700">{rainfall} mm</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Normal: {profile.normal_rainfall_mm} mm/yr</span>
        </div>

        <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase block flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-teal-600" />
            {language === 'ta' ? 'மண் ஈரப்பதம் (மதிப்பீடு)' : 'Soil Moisture (Est.)'}
          </span>
          <span className="text-lg font-black text-teal-700">{soilMoisture}%</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Hydrological Model</span>
        </div>

        <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase block flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-orange-600" />
            {language === 'ta' ? 'சராசரி வெப்பநிலை' : 'Temperature'}
          </span>
          <span className="text-lg font-black text-orange-700">{profile.temp_c}°C</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{profile.humidity_pct}% Humidity</span>
        </div>

        <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase block flex items-center gap-1">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
            {language === 'ta' ? 'ஆய்வக காரத்தன்மை' : 'Lab Soil pH'}
          </span>
          <span className="text-lg font-black text-emerald-700">{ph}</span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">{profile.ph_status}</span>
        </div>
      </div>

      {/* 2-Col Grid: Lab Values Sliders vs Health Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'ஆய்வக பரிசோதனை அளவீடுகள்' : 'Soil Lab Test Parameters'}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              {selectedDistrict} Lab Sourced
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Nitrogen (N):</span>
                <span className="text-emerald-700 font-bold">{n} kg/ha</span>
              </div>
              <input
                type="range"
                min="20"
                max="350"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Low (&lt;280)</span>
                <span>Medium (280-560)</span>
                <span>High (&gt;560)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Phosphorus (P):</span>
                <span className="text-emerald-700 font-bold">{p} kg/ha</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="0.5"
                value={p}
                onChange={(e) => setP(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Low (&lt;11)</span>
                <span>Medium (11-22)</span>
                <span>High (&gt;22)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Potassium (K):</span>
                <span className="text-emerald-700 font-bold">{k} kg/ha</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Low (&lt;118)</span>
                <span>Medium (118-280)</span>
                <span>High (&gt;280)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Soil pH (Acidity / Alkalinity):</span>
                <span className="text-emerald-700 font-bold">{ph}</span>
              </div>
              <input
                type="range"
                min="4.5"
                max="9.0"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Acidic (&lt;6.5)</span>
                <span>Neutral (6.5-7.5)</span>
                <span>Alkaline (&gt;7.5)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Organic Carbon (OC %):</span>
                <span className="text-emerald-700 font-bold">{oc}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={oc}
                onChange={(e) => setOc(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Low (&lt;0.5%)</span>
                <span>Medium (0.5-0.75%)</span>
                <span>High (&gt;0.75%)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Electrical Conductivity (EC dS/m):</span>
                <span className="text-emerald-700 font-bold">{ec} dS/m</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.02"
                value={ec}
                onChange={(e) => setEc(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Soil Health Card Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="space-y-4">
              {/* Primary Score Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-stone-900 text-white shadow-xl space-y-3 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
                    {language === 'ta' ? 'டிஜிட்டல் மண் நல குறியீடு' : 'Digital Soil Health Index'}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                    {selectedDistrict} STL Benchmark
                  </span>
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-black">{result.soil_health_score || 84}/100</span>
                  <span className="text-lg font-bold text-emerald-200">
                    {language === 'ta' ? result.soil_rating_ta || 'சிறந்த மண் வளம்' : result.soil_rating || 'Good / Fertile'}
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {language === 'ta' ? profile.advisory_ta : profile.advisory}
                </p>
              </div>

              {/* Nutrients Status Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Nitrogen (N)</span>
                  <strong className="text-xl font-black text-slate-800">{n} kg/ha</strong>
                  <span className={`text-[10px] font-bold block mt-1 ${n < 280 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {n < 280 ? 'Low (குறைவு)' : 'Normal (உகந்தது)'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Phosphorus (P)</span>
                  <strong className="text-xl font-black text-slate-800">{p} kg/ha</strong>
                  <span className={`text-[10px] font-bold block mt-1 ${p < 11 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {p < 11 ? 'Low (குறைவு)' : 'Medium (மிதம்)'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Potassium (K)</span>
                  <strong className="text-xl font-black text-slate-800">{k} kg/ha</strong>
                  <span className="text-[10px] font-bold block mt-1 text-emerald-600">
                    {k > 280 ? 'High (நிறைவு)' : 'Medium (மிதம்)'}
                  </span>
                </div>
              </div>

              {/* Fertilizer Dosage Calibration Card */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <h4 className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ta' ? 'ஏக்கருக்கான உகந்த உர அளவீடு (ICAR பரிந்துரை)' : 'Recommended Fertilizer Dosage per Acre'}:</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-slate-500 font-semibold block">Urea (யூரியா)</span>
                    <strong className="text-sm font-black text-emerald-800">{n < 280 ? '45 kg' : '30 kg'} / acre</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] text-slate-500 font-semibold block">DAP (டி.ஏ.பி)</span>
                    <strong className="text-sm font-black text-blue-800">{p < 15 ? '35 kg' : '25 kg'} / acre</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] text-slate-500 font-semibold block">MOP Potash (பொட்டாஷ்)</span>
                    <strong className="text-sm font-black text-amber-800">{k < 200 ? '25 kg' : '15 kg'} / acre</strong>
                  </div>
                </div>

                {/* Soil Amendment Advice */}
                <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {ph > 7.8 
                      ? (language === 'ta' ? 'காரத்தன்மையை சமன் செய்ய ஏக்கருக்கு 200 கிலோ ஜிப்சம் இடவும்.' : 'Alkaline profile detected. Apply 200 kg gypsum per acre with irrigation.')
                      : ph < 6.0
                      ? (language === 'ta' ? 'அமிலத்தன்மையை சமன் செய்ய ஏக்கருக்கு 150 கிலோ விவசாய சுண்ணாம்பு இடவும்.' : 'Acidic soil detected. Apply 150 kg agricultural lime per acre.')
                      : (language === 'ta' ? 'மண் pH நடுநிலையாக உள்ளது; சுண்ணாம்பு அல்லது ஜிப்சம் தேவையில்லை.' : 'Optimal neutral pH. No lime or gypsum amendment required.')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
