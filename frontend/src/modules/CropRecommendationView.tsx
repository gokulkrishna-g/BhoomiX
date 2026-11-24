import React, { useState, useEffect } from 'react';
import { 
  Wheat, 
  Sparkles, 
  TrendingUp, 
  Droplets, 
  Gauge, 
  CheckCircle2, 
  SlidersHorizontal,
  Layers,
  ArrowRight,
  MapPin,
  Building2,
  CloudRain,
  Thermometer,
  Wind
} from 'lucide-react';
import { Language, CropRecommendationResponse } from '../types';
import { translations } from '../translations';
import { getCropRecommendation } from '../services/api';
import { TN_DISTRICT_NAMES } from '../data/tamilNaduData';
import { getDistrictSoilProfile, TN_DISTRICT_SOIL_PROFILES } from '../data/districtSoilProfiles';

interface CropRecommendationViewProps {
  language: Language;
  onNavigate?: (view: string) => void;
  currentDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
}

export const CropRecommendationView: React.FC<CropRecommendationViewProps> = ({ 
  language, 
  onNavigate,
  currentDistrict = "Thanjavur",
  onSelectDistrict
}) => {
  const t = translations[language];
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentDistrict);

  useEffect(() => {
    setSelectedDistrict(currentDistrict);
  }, [currentDistrict]);

  const initialProfile = getDistrictSoilProfile(selectedDistrict);

  // Sliders matching the 7 features of Crop_recommendation.csv
  const [n, setN] = useState(initialProfile.n);
  const [p, setP] = useState(initialProfile.p);
  const [k, setK] = useState(initialProfile.k);
  const [temp, setTemp] = useState(initialProfile.temp_c);
  const [humidity, setHumidity] = useState(initialProfile.humidity_pct);
  const [ph, setPh] = useState(initialProfile.ph);
  const [rainfall, setRainfall] = useState(Math.round(initialProfile.normal_rainfall_mm / 6)); // seasonal mm

  const [result, setResult] = useState<CropRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically update soil & climate parameters when district changes
  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
    const prof = getDistrictSoilProfile(dist);
    setN(prof.n);
    setP(prof.p);
    setK(prof.k);
    setTemp(prof.temp_c);
    setHumidity(prof.humidity_pct);
    setPh(prof.ph);
    setRainfall(Math.round(prof.normal_rainfall_mm / 6));
  };

  const runPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCropRecommendation({
        n,
        p,
        k,
        temperature: temp,
        humidity,
        ph,
        rainfall,
        top_k: 3
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Crop recommendation failed');
    } finally {
      setLoading(false);
    }
  };

  // Instant reactive ML prediction whenever any input changes
  useEffect(() => {
    runPrediction();
  }, [n, p, k, temp, humidity, ph, rainfall, selectedDistrict]);

  const profile = getDistrictSoilProfile(selectedDistrict);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner with Rich Agricultural Aesthetics */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border border-emerald-600/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Wheat className="w-7 h-7 text-emerald-400" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ta' ? 'AI பயிர் பரிந்துரை இயந்திரம்' : 'AI Crop Recommendation Engine'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-2 max-w-2xl">
              {language === 'ta'
                ? 'மண் பரிசோதனை ஆய்வக முடிவுகள் (N-P-K-pH) மற்றும் நேரடி வானிலை (மழை, வெப்பநிலை, ஈரப்பதம்) அடிப்படையில் தானியங்கி உகந்த பயிர் பரிந்துரை.'
                : 'Supervised Machine Learning model recommending highest-suitability crops for all 38 Tamil Nadu districts based on soil test results & meteorology.'
              }
            </p>
          </div>

          {/* Real-time reactive indicator (No calculation button) */}
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>
              {loading 
                ? t.common.loading 
                : (language === 'ta' ? 'தானியங்கி உடனடி கணக்கீடு' : 'Instant Reactive ML')
              }
            </span>
          </div>
        </div>

        {/* District Selector & Lab Data Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-emerald-200 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ta' ? 'தமிழ்நாடு மாவட்டம் (38 மாவட்டங்கள்):' : 'Tamil Nadu District (38 Districts):'}</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-emerald-400/40 text-white rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-emerald-400 outline-none"
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
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{language === 'ta' ? profile.stl_lab_ta : profile.stl_lab}</span>
            </div>
            <div className="text-[11px] text-emerald-100/80 mt-1 flex items-center gap-3">
              <span>{language === 'ta' ? 'பாரம்பரிய பயிர்கள்' : 'Traditional Crops'}: <strong className="text-white">{profile.recommended_crops.join(", ")}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Sliders vs Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Column (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'மண் மற்றும் சுற்றுச்சூழல் அளவீடுகள்' : 'Soil Lab & Weather Metrics'}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              {selectedDistrict} Dynamic Inputs
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Nitrogen (N) [Lab Test]:</span>
                <span className="text-emerald-700 font-bold">{n} kg/ha</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Phosphorus (P) [Lab Test]:</span>
                <span className="text-emerald-700 font-bold">{p} kg/ha</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={p}
                onChange={(e) => setP(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Available Potassium (K) [Lab Test]:</span>
                <span className="text-emerald-700 font-bold">{k} kg/ha</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Soil pH */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Soil pH [Lab Test]:</span>
                <span className="text-emerald-700 font-bold">{ph}</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="9.5"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Rainfall */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Seasonal Rainfall (mm) [Weather]:</span>
                <span className="text-emerald-700 font-bold">{rainfall} mm</span>
              </div>
              <input
                type="range"
                min="20"
                max="350"
                value={rainfall}
                onChange={(e) => setRainfall(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Temperature */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Temperature (°C) [Weather]:</span>
                <span className="text-emerald-700 font-bold">{temp}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="0.5"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Humidity */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Relative Humidity (%) [Weather]:</span>
                <span className="text-emerald-700 font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                value={humidity}
                onChange={(e) => setHumidity(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result && result.recommendations && result.recommendations.length > 0 && (
            <div className="space-y-4">
              {/* Primary Recommended Crop Card */}
              {(() => {
                const topRec = result.recommendations[0];
                const altRecs = result.recommendations.slice(1);
                return (
                  <>
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white shadow-xl space-y-4 border border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
                          {language === 'ta' ? 'முதன்மை பரிந்துரைக்கப்பட்ட பயிர்' : 'Primary Recommended Crop'}
                        </span>
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                          {topRec.suitability_score}% {language === 'ta' ? 'பொருத்தம்' : 'Match'}
                        </span>
                      </div>

                      <div className="flex items-baseline space-x-3">
                        <h3 className="text-3xl sm:text-4xl font-black text-white">
                          {language === 'ta' ? topRec.tamil_name || topRec.crop : topRec.crop}
                        </h3>
                        <span className="text-xs text-emerald-200 font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                          {selectedDistrict} Optimal
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                        {topRec.explanation}
                      </p>

                      {/* Crop Quick Specs */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                        <div className="p-2 rounded-xl bg-black/20">
                          <span className="text-[10px] text-emerald-300 block">Water Need</span>
                          <strong className="text-xs font-bold text-white">{topRec.water_requirement_mm} mm</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-black/20">
                          <span className="text-[10px] text-emerald-300 block">Season</span>
                          <strong className="text-xs font-bold text-white">{topRec.season}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-black/20">
                          <span className="text-[10px] text-emerald-300 block">Mandi Price</span>
                          <strong className="text-xs font-bold text-white">₹{topRec.mandi_price_quintal} / Qtl</strong>
                        </div>
                      </div>
                    </div>

                    {/* Alternative Top Crops */}
                    {altRecs.length > 0 && (
                      <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                          {language === 'ta' ? 'மாற்று பயிர் தரவரிசை' : 'Top Alternative Crop Candidates'}:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {altRecs.map((cand, idx) => (
                            <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                              <span className="text-xs font-black text-slate-800 block">
                                {language === 'ta' ? cand.tamil_name || cand.crop : cand.crop}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 block mt-1">
                                {cand.suitability_score}% Suitability • {cand.expected_yield_kg_ha} kg/ha
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
