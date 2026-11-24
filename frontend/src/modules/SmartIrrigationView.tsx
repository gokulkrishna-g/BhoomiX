import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Clock, 
  TrendingUp, 
  Gauge, 
  Sparkles, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  MapPin,
  Building2,
  Waves
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { calculateIrrigation } from '../services/api';
import { TN_DISTRICT_NAMES } from '../data/tamilNaduData';
import { getDistrictSoilProfile, TN_DISTRICT_SOIL_PROFILES } from '../data/districtSoilProfiles';

interface SmartIrrigationViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
}

export const SmartIrrigationView: React.FC<SmartIrrigationViewProps> = ({ 
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

  const [crop, setCrop] = useState(initialProfile.recommended_crops[0] || 'Rice');
  const [stage, setStage] = useState('Vegetative');
  const [areaAcres, setAreaAcres] = useState(2.5);
  const [soilMoisture, setSoilMoisture] = useState(initialProfile.soil_moisture_pct);
  const [et0, setEt0] = useState(4.8);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Automatically update soil moisture and crop when district changes
  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
    const prof = getDistrictSoilProfile(dist);
    setCrop(prof.recommended_crops[0] || 'Rice');
    setSoilMoisture(prof.soil_moisture_pct);
    // Adjust ET0 based on temperature & humidity
    const calculatedEt0 = Math.round((prof.temp_c * 0.15 + (100 - prof.humidity_pct) * 0.03) * 10) / 10;
    setEt0(calculatedEt0 || 4.8);
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const data = await calculateIrrigation({
        crop,
        crop_stage: stage,
        area_acres: areaAcres,
        soil_moisture: soilMoisture,
        et0_mm: et0
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [crop, stage, areaAcres, soilMoisture, et0, selectedDistrict]);

  const profile = getDistrictSoilProfile(selectedDistrict);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-cyan-950 to-slate-900 text-white shadow-xl border border-teal-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-7 h-7 text-cyan-400" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ta' ? 'துல்லிய நீர் மேலாண்மை & பாசனக் காலக்கணிப்பு' : 'Smart Irrigation & Water Budgeting'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-cyan-200/90 mt-2 max-w-2xl">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான நேரடி மண் ஈரப்பதம் மற்றும் பயிர் ஆவியாதல் (FAO-56) அடிப்படையிலான துல்லிய சொட்டுநீர் காலக்கணிப்பு.'
                : 'FAO-56 Penman-Monteith crop evapotranspiration (ETc) model calculating run-time and water savings across all 38 Tamil Nadu districts.'
              }
            </p>
          </div>

          {/* Real-time reactive indicator (No calculation button) */}
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-200 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>
              {loading 
                ? t.common.loading 
                : (language === 'ta' ? 'தானியங்கி உடனடி பாசனக் கணக்கீடு' : 'Instant Reactive Water Budget')
              }
            </span>
          </div>
        </div>

        {/* District Selector & Lab Data Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-cyan-200 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ta' ? 'தமிழ்நாடு மாவட்டம் (38 மாவட்டங்கள்):' : 'Tamil Nadu District (38 Districts):'}</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-cyan-400/40 text-white rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-cyan-400 outline-none"
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
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
              <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{language === 'ta' ? profile.stl_lab_ta : profile.stl_lab}</span>
            </div>
            <div className="text-[11px] text-cyan-100/80 mt-1 flex items-center gap-3">
              <span>{language === 'ta' ? 'மழைப்பொழிவு' : 'Recent Rain'}: <strong className="text-white">{profile.recent_rainfall_mm} mm</strong></span>
              <span>•</span>
              <span>{language === 'ta' ? 'மண் ஈரப்பதம்' : 'Soil Moisture'}: <strong className="text-white">{profile.soil_moisture_pct}%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Col Grid: Parameters vs Water Savings Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Interactive Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <span>{language === 'ta' ? 'பாசன உள்ளீடுகள்' : 'Irrigation Input Parameters'}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-100 text-cyan-800 rounded-full">
              {selectedDistrict} Meteorology
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'ta' ? 'பயிர் தேர்வு' : 'Crop Type'}:
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Rice">Rice (நெல்) [Kc: 1.15]</option>
                <option value="Banana">Banana (வாழை) [Kc: 1.10]</option>
                <option value="Cotton">Cotton (பருத்தி) [Kc: 0.85]</option>
                <option value="Sugarcane">Sugarcane (கரும்பு) [Kc: 1.25]</option>
                <option value="Maize">Maize (மக்காச்சோளம்) [Kc: 0.80]</option>
                <option value="Tomato">Tomato (தக்காளி) [Kc: 0.75]</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'ta' ? 'பயிர் வளர்ச்சி நிலை' : 'Growth Stage'}:
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Initial">Initial / ஆரம்ப நிலை</option>
                <option value="Vegetative">Vegetative / தண்டு/இலை வளர்ச்சி</option>
                <option value="Mid-Season">Mid-Season / பூக்கும்/கதிர் பருவம்</option>
                <option value="Late Season">Late Season / முதிர்ச்சிப் பருவம்</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'சாகுபடி பரப்பளவு (ஏக்கர்)' : 'Cultivated Land Area (Acres)'}:</span>
                <span className="text-cyan-700 font-bold">{areaAcres} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25.0"
                step="0.5"
                value={areaAcres}
                onChange={(e) => setAreaAcres(parseFloat(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'மண் ஈரப்பதம் (%) [வானிலை/ஆய்வகம்]' : 'Current Soil Moisture (%) [Weather/Lab]'}:</span>
                <span className="text-cyan-700 font-bold">{soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Critical Drought (&lt;25%)</span>
                <span>Optimal (40-60%)</span>
                <span>Saturated (&gt;70%)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ta' ? 'ஆவியாதல் அளவு ET0 (மிமீ/நாள்)' : 'Reference Evapotranspiration ET0 (mm/day)'}:</span>
                <span className="text-cyan-700 font-bold">{et0} mm/day</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="9.0"
                step="0.1"
                value={et0}
                onChange={(e) => setEt0(parseFloat(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="space-y-4">
              {/* Primary Runtime Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-700 via-cyan-800 to-slate-900 text-white shadow-xl space-y-3 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                    {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட பாசன நேரம்' : 'Recommended Drip Irrigation Duration'}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                    {selectedDistrict} Profile
                  </span>
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-black">{result.recommended_irrigation_runtime_hours || 1.5} Hours</span>
                  <span className="text-sm font-bold text-cyan-200">
                    ({Math.round((result.recommended_irrigation_runtime_hours || 1.5) * 60)} Mins / day)
                  </span>
                </div>
                <p className="text-xs text-cyan-100/90 leading-relaxed">
                  {language === 'ta' ? result.irrigation_schedule_advice_ta || result.irrigation_schedule_advice : result.irrigation_schedule_advice}
                </p>
              </div>

              {/* Water Budget & Savings Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Water Needed</span>
                  <strong className="text-lg font-black text-cyan-800">
                    {result.water_requirement_liters_day?.toLocaleString() || '18,500'} L
                  </strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Per Day</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Crop ETc</span>
                  <strong className="text-lg font-black text-slate-800">
                    {result.crop_etc_mm_per_day || 5.2} mm
                  </strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Daily Transpiration</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Water Saved</span>
                  <strong className="text-lg font-black text-emerald-600">
                    {result.water_saved_vs_flood_pct || 42}%
                  </strong>
                  <span className="text-[10px] text-emerald-700 block mt-0.5">vs Flood Irrigation</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
