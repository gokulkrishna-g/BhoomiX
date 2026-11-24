import React, { useState, useEffect, useMemo } from 'react';
import { 
  BrainCircuit, 
  Droplets, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  FlaskConical, 
  CloudSun,
  ShieldCheck,
  ListChecks,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Thermometer,
  CloudRain,
  Wind,
  RefreshCw,
  Gauge,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { Language, FarmingDecisionResponse } from '../types';
import { translations } from '../translations';
import { getFarmingDecision, getWeather } from '../services/api';
import { TN_DISTRICT_NAMES, getDistrictAreas } from '../data/tamilNaduData';
import { getDistrictSoilProfile, TN_DISTRICT_SOIL_PROFILES } from '../data/districtSoilProfiles';

interface AiFarmingAssistantViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (dist: string) => void;
  currentArea?: string;
}

// Tamil Nadu Standard Soil Types with Agronomic Characteristics
export const TN_SOIL_CATEGORIES = [
  {
    id: "Alluvial Soil",
    label: "Alluvial Soil (வண்டல் மண்)",
    labelTa: "வண்டல் மண் (Alluvial Soil)",
    retentionFactor: 1.15,
    defaultN: 220,
    defaultP: 22,
    defaultK: 280,
    defaultPh: 7.2,
    description: "Highly fertile delta and river basin loam rich in potash, ideal for paddy and sugarcane."
  },
  {
    id: "Red Soil",
    label: "Red Soil / Red Loam (செம்மண்)",
    labelTa: "செம்மண் (Red Soil / Red Loam)",
    retentionFactor: 0.85,
    defaultN: 180,
    defaultP: 16,
    defaultK: 240,
    defaultPh: 6.8,
    description: "Well-drained porous loam rich in iron oxide, suited for groundnut, millets, and pulses."
  },
  {
    id: "Black Soil",
    label: "Black Cotton Soil / Karisal (கரிசல் மண்)",
    labelTa: "கரிசல் மண் (Black Cotton Soil)",
    retentionFactor: 1.35,
    defaultN: 195,
    defaultP: 18,
    defaultK: 295,
    defaultPh: 7.8,
    description: "Heavy montmorillonite clay with very high moisture retention, prime for cotton and chillies."
  },
  {
    id: "Laterite Soil",
    label: "Laterite Soil (செம்பொறை மண்)",
    labelTa: "செம்பொறை மண் (Laterite Soil)",
    retentionFactor: 0.75,
    defaultN: 240,
    defaultP: 12,
    defaultK: 210,
    defaultPh: 5.6,
    description: "Acidic hill and plateau soil with high organic matter, excellent for tea, coffee, and rubber."
  },
  {
    id: "Coastal Sandy Soil",
    label: "Coastal Sandy Soil (கடற்கரை மணல் மண்)",
    labelTa: "கடற்கரை மணல் மண் (Coastal Sandy)",
    retentionFactor: 0.55,
    defaultN: 165,
    defaultP: 14,
    defaultK: 225,
    defaultPh: 7.6,
    description: "High permeability and light texture with low water holding capacity, suited for coconut and cashew."
  },
  {
    id: "Clay Loam",
    label: "Clay Loam / Heavy Lowland Clay (களிமண்)",
    labelTa: "களிமண் (Clay Loam)",
    retentionFactor: 1.25,
    defaultN: 210,
    defaultP: 20,
    defaultK: 265,
    defaultPh: 7.0,
    description: "Dense moisture-retentive wetland soil ideal for lowland submerged paddy."
  }
];

export const AiFarmingAssistantView: React.FC<AiFarmingAssistantViewProps> = ({ 
  language,
  currentDistrict = "Thanjavur",
  onSelectDistrict,
  currentArea
}) => {
  const t = translations[language];
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentDistrict);
  const districtAreas = useMemo(() => getDistrictAreas(selectedDistrict), [selectedDistrict]);
  const [selectedArea, setSelectedArea] = useState<string>(currentArea || (districtAreas[0]?.name ?? ''));

  useEffect(() => {
    if (districtAreas.length > 0 && !districtAreas.some(a => a.name === selectedArea)) {
      setSelectedArea(districtAreas[0].name);
    }
  }, [selectedDistrict, districtAreas]);

  // Weather state & loading
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  // 1. District Profile Baseline
  const initialProfile = getDistrictSoilProfile(selectedDistrict);

  // 2. Soil Type (Manually selectable, NOT locked to district)
  const [selectedSoilType, setSelectedSoilType] = useState<string>("Alluvial Soil");

  // 3. Crop Selection
  const [cropType, setCropType] = useState<string>(initialProfile.recommended_crops[0] || 'Rice');
  const [cropStage, setCropStage] = useState<string>('Vegetative');
  const [cropHealth, setCropHealth] = useState<string>('Good');

  // 4. Weather Parameters
  const [temperature, setTemperature] = useState<number>(initialProfile.temp_c);
  const [humidity, setHumidity] = useState<number>(initialProfile.humidity_pct);
  const [rainfall, setRainfall] = useState<number>(initialProfile.recent_rainfall_mm);
  const [weatherCondition, setWeatherCondition] = useState<string>(initialProfile.weather_condition);

  // 5. Soil Moisture Model (Estimated vs Measured toggle)
  const [moistureSource, setMoistureSource] = useState<'estimated' | 'measured'>('estimated');
  const [manualMeasuredMoisture, setManualMeasuredMoisture] = useState<number>(38);

  // 6. Soil pH & NPK Nutrients
  const [soilPh, setSoilPh] = useState<number>(initialProfile.ph);
  const [nitrogen, setNitrogen] = useState<number>(initialProfile.n);
  const [phosphorus, setPhosphorus] = useState<number>(initialProfile.p);
  const [potassium, setPotassium] = useState<number>(initialProfile.k);

  // Output Decision State
  const [decision, setDecision] = useState<FarmingDecisionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate Soil Moisture based on meaningful hydrological estimation model
  const calculatedEstimatedMoisture = useMemo(() => {
    const soilObj = TN_SOIL_CATEGORIES.find(s => s.id === selectedSoilType) || TN_SOIL_CATEGORIES[0];
    const retention = soilObj.retentionFactor;
    // Model factors: base retention (18-35%) + rainfall infiltration (0.35x) - thermal evapotranspiration loss (temp > 28°C) + humidity buffer
    const base = 20 * retention;
    const rainInfil = rainfall * 0.42;
    const heatLoss = Math.max(0, temperature - 27) * 1.1;
    const humidBuffer = (humidity / 100) * 12;
    const raw = Math.round(base + rainInfil - heatLoss + humidBuffer);
    return Math.min(92, Math.max(12, raw));
  }, [selectedSoilType, rainfall, temperature, humidity]);

  const activeSoilMoisture = moistureSource === 'measured' ? manualMeasuredMoisture : calculatedEstimatedMoisture;

  // Retrieve Live Weather whenever District Changes
  const fetchLiveWeatherForDistrict = async (dist: string) => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await getWeather(dist);
      setWeatherData(data);
      if (data && data.current) {
        setTemperature(data.current.temp_c);
        setHumidity(data.current.humidity);
        setRainfall(data.current.rainfall_mm);
        setWeatherCondition(data.current.condition);
      }
    } catch (err: any) {
      console.warn("Weather fetch fallback:", err);
      setWeatherError("Live meteorological service momentarily slow; using verified district climate records.");
      const prof = getDistrictSoilProfile(dist);
      setTemperature(prof.temp_c);
      setHumidity(prof.humidity_pct);
      setRainfall(prof.recent_rainfall_mm);
      setWeatherCondition(prof.weather_condition);
    } finally {
      setIsWeatherLoading(false);
    }
  };

  // Sync when prop updates
  useEffect(() => {
    if (currentDistrict && currentDistrict !== selectedDistrict) {
      handleDistrictChange(currentDistrict);
    }
  }, [currentDistrict]);

  // Handle District Change
  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
    const prof = getDistrictSoilProfile(dist);

    // Update district-dependent defaults (Crops, Lab pH)
    setCropType(prof.recommended_crops[0] || 'Rice');
    setSoilPh(prof.ph);

    // Fetch live weather dynamically
    fetchLiveWeatherForDistrict(dist);
  };

  // Handle Soil Type Change: Adapt default nutrients without locking
  const handleSoilTypeChange = (soilId: string) => {
    setSelectedSoilType(soilId);
    const soilObj = TN_SOIL_CATEGORIES.find(s => s.id === soilId);
    if (soilObj) {
      // Intelligently calibrate default NPK to the selected soil type
      setNitrogen(soilObj.defaultN);
      setPhosphorus(soilObj.defaultP);
      setPotassium(soilObj.defaultK);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLiveWeatherForDistrict(selectedDistrict);
  }, []);

  // Run Reactive AI Decision Calculation whenever any input changes
  const handleRunAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFarmingDecision({
        crop_type: cropType,
        soil_type: selectedSoilType,
        soil_ph: soilPh,
        nitrogen,
        phosphorus,
        potassium,
        weather_condition: weatherCondition,
        rainfall,
        soil_moisture: activeSoilMoisture,
        crop_stage: cropStage,
        crop_health: cropHealth
      });
      setDecision(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRunAnalysis();
  }, [
    selectedDistrict,
    selectedSoilType,
    cropType,
    cropStage,
    cropHealth,
    temperature,
    humidity,
    rainfall,
    weatherCondition,
    activeSoilMoisture,
    soilPh,
    nitrogen,
    phosphorus,
    potassium
  ]);

  const profile = getDistrictSoilProfile(selectedDistrict);

  // Generate authentic Agricultural Risk Alerts based on live conditions (No fake warnings)
  const computedRiskAlerts = useMemo(() => {
    const alerts: string[] = [];
    if (activeSoilMoisture < 25) {
      alerts.push(language === 'ta' 
        ? 'மண் ஈரப்பதம் மிகக் குறைவு (<25%): பயிர் வாடல் மற்றும் வேர் பகுதி வறட்சி ஆபத்து உள்ளது.'
        : 'Critical root-zone soil moisture deficit (<25%): High risk of permanent wilting.');
    } else if (activeSoilMoisture > 75 && selectedSoilType.includes('Clay')) {
      alerts.push(language === 'ta'
        ? 'களிமண் நிலத்தில் அதிக ஈரப்பதம் (>75%): வேர் அழுகல் மற்றும் நீர் தேக்க அபாயம். வடிகால் வாய்க்காலை திறக்கவும்.'
        : 'High moisture saturation in clay loam (>75%): Clear sub-surface drainage to prevent root rot.');
    }

    if (temperature > 36.5) {
      alerts.push(language === 'ta'
        ? `அதிக வெப்பநிலை (${temperature}°C): பூக்கும் பருவத்தில் மகரந்தச் சேர்க்கை பாதிக்கப்படலாம். காலை வேளையில் நீர்ப்பாசனம் செய்யவும்.`
        : `Thermal stress alert (${temperature}°C): Risk of flower abscission and pollen sterility.`);
    }

    if (humidity > 82 && temperature >= 25 && temperature <= 32 && cropType.toLowerCase().includes('rice')) {
      alerts.push(language === 'ta'
        ? 'அதிக ஈரப்பதம் மற்றும் மித வெப்பம்: நெல் குலை நோய் (Blast) மற்றும் இலை சுருட்டு புழு தாக்கம் ஏற்பட சாதகமான சூழல்.'
        : 'High atmospheric humidity: Micro-climate conducive for Paddy Blast (Magnaporthe) & Leaf Roller.');
    }

    if (soilPh < 5.8) {
      alerts.push(language === 'ta'
        ? 'மண் அமிலத்தன்மை (pH < 5.8): மணிச்சத்து (Phosphorus) மண்ணில் நிலைபெற்று பயிருக்கு கிடைக்காமல் போகலாம். விவசாய சுண்ணாம்பு இடவும்.'
        : 'Acidic soil profile (pH < 5.8): High phosphorus fixation; apply agricultural dolomite/lime.');
    } else if (soilPh > 8.0) {
      alerts.push(language === 'ta'
        ? 'மண் காரத்தன்மை (pH > 8.0): துத்தநாகம் (Zinc) மற்றும் இரும்புச்சத்து பற்றாக்குறை ஏற்படலாம். ஜிப்சம் இடவும்.'
        : 'Alkaline soil profile (pH > 8.0): Potential micronutrient tie-up (Zinc/Iron); apply gypsum.');
    }

    return alerts;
  }, [activeSoilMoisture, selectedSoilType, temperature, humidity, cropType, soilPh, language]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white shadow-xl border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-7 h-7 text-emerald-400" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ta' ? 'AI விவசாய முடிவு உதவியாளர்' : 'AI Farming Decision Assistant'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-2 max-w-2xl">
              {language === 'ta'
                ? 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான நேரலை வானிலை, தேர்ந்தெடுக்கக்கூடிய மண் வகை, ஈரப்பத மாதிரி மற்றும் ICAR ஆய்வக அளவீடுகளை ஒருங்கிணைக்கும் அறிவார்ந்த அமைப்பகம்.'
                : 'Intelligent decision support engine combining live district agro-meteorology, user-selectable Tamil Nadu soil types, calibrated moisture estimation, and verified lab benchmarks.'
              }
            </p>
          </div>

          {/* Real-time reactive indicator (No calculation button) */}
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>
              {loading 
                ? t.common.loading 
                : (language === 'ta' ? 'தானியங்கி உடனடி கணக்கீடு' : 'Instant Reactive Calculation')
              }
            </span>
          </div>
        </div>

        {/* Section A: District Selection & Live Weather Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* District Dropdown */}
          <div>
            <label className="text-xs font-bold text-emerald-200 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ta' ? 'A. மாவட்டம்:' : 'A. TN District:'}</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full bg-slate-900/95 border border-emerald-400/40 text-white rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-emerald-400 outline-none cursor-pointer"
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

          {/* Taluk / Area Selection */}
          <div>
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ta' ? 'வட்டம் / பகுதி:' : 'Taluk / Local Area:'}</span>
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-slate-900/95 border border-amber-400/40 text-amber-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
            >
              {districtAreas.map(a => (
                <option key={a.name} value={a.name} className="bg-slate-900 text-white">
                  {language === 'ta' ? a.tamil_name : a.name} {a.specialty ? `• ${a.specialty}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Live Weather Status Card */}
          <div className="md:col-span-2 flex flex-col justify-center bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10 relative">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  {selectedDistrict} {language === 'ta' ? 'நேரலை வானிலை நிலவரம்' : 'Current Weather Conditions'}:
                </span>
                {isWeatherLoading && <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />}
              </div>
              <button
                onClick={() => fetchLiveWeatherForDistrict(selectedDistrict)}
                className="text-[10px] bg-white/10 hover:bg-white/20 text-emerald-200 px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1 transition-all"
                title="Refresh Weather Data"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="text-xs text-white mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold">
              <span className="flex items-center gap-1 text-orange-300">
                <Thermometer className="w-3.5 h-3.5" />
                {temperature}°C
              </span>
              <span className="flex items-center gap-1 text-blue-300">
                <CloudRain className="w-3.5 h-3.5" />
                {rainfall} mm Rain
              </span>
              <span className="flex items-center gap-1 text-cyan-300">
                <Droplets className="w-3.5 h-3.5" />
                {humidity}% Humidity
              </span>
              <span className="text-emerald-300 font-normal truncate max-w-xs">
                {weatherCondition}
              </span>
            </div>

            {weatherError && (
              <p className="text-[10px] text-amber-300 mt-1">{weatherError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Col Grid: Input Parameters Form vs Decision Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Input Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'உள்ளீட்டு காரணிகள்' : 'Agronomic Input Controls'}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              {selectedDistrict} Synchronized
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* B. SOIL TYPE: Manually Selectable Dropdown (Not Locked) */}
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span>B. {language === 'ta' ? 'மண் வகை (தேர்ந்தெடுக்கலாம்)' : 'Soil Type (Manually Selectable)'}:</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">User Editable</span>
              </label>
              <select
                value={selectedSoilType}
                onChange={(e) => handleSoilTypeChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-semibold text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer shadow-sm"
              >
                {TN_SOIL_CATEGORIES.map(soil => (
                  <option key={soil.id} value={soil.id}>
                    {language === 'ta' ? soil.labelTa : soil.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-600 leading-tight">
                {TN_SOIL_CATEGORIES.find(s => s.id === selectedSoilType)?.description}
              </p>
            </div>

            {/* Crop Selection & Phenology */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ta' ? 'பயிர் வகை' : 'Crop Type'}:
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Rice">Rice (நெல்) [ADT 53 / CR 1009]</option>
                  <option value="Cotton">Cotton (பருத்தி) [MCU 5]</option>
                  <option value="Maize">Maize (மக்காச்சோளம்) [CO 6]</option>
                  <option value="Banana">Banana (வாழை) [Grand Naine]</option>
                  <option value="Sugarcane">Sugarcane (கரும்பு) [COC 13339]</option>
                  <option value="Groundnut">Groundnut (நிலக்கடலை) [TMV 14]</option>
                  <option value="Turmeric">Turmeric (மஞ்சள்) [Erode BSR 2]</option>
                  <option value="Blackgram">Blackgram (உளுந்து) [VBN 8]</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'ta' ? 'வளர்ச்சி நிலை' : 'Growth Stage'}:
                </label>
                <select
                  value={cropStage}
                  onChange={(e) => setCropStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Initial">Initial / முளைக்கும் பருவம்</option>
                  <option value="Vegetative">Vegetative / தண்டு வளர்ச்சி</option>
                  <option value="Flowering">Flowering / பூக்கும் பருவம்</option>
                  <option value="Yield Formation">Yield Formation / கதிர்/காய் பருவம்</option>
                  <option value="Maturity">Maturity / முதிர்ச்சிப் பருவம்</option>
                </select>
              </div>
            </div>

            {/* C. WEATHER CONDITIONS & D. RAINFALL: Live & Editable */}
            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
              <span className="font-bold text-slate-800 text-xs block">
                C & D. {language === 'ta' ? 'வானிலை & மழைப்பொழிவு' : 'Weather Condition & Rainfall'}:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Condition:</label>
                  <select
                    value={weatherCondition}
                    onChange={(e) => setWeatherCondition(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xl border border-sky-200 bg-white font-medium text-xs"
                  >
                    <option value="Sunny & Clear">Sunny & Clear (வெயில்)</option>
                    <option value="Partly Cloudy with Coastal Breeze">Partly Cloudy (மேகமூட்டம்)</option>
                    <option value="Humid Overcast with Showers">Overcast & Showers (லேசான மழை)</option>
                    <option value="Heavy Monsoon Rain">Heavy Monsoon Rain (கனமழை)</option>
                    <option value="Heatwave (>36°C)">Heatwave (கடும் வெப்பம்)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                    <span>Rainfall:</span>
                    <strong className="text-blue-700">{rainfall} mm</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={rainfall}
                    onChange={(e) => setRainfall(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* E. SOIL MOISTURE: Hydrological Model vs Manual Measurement */}
            <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  E. {language === 'ta' ? 'மண் ஈரப்பதம்' : 'Soil Moisture'}:
                </span>
                {/* Toggle: Model Estimated vs Measured */}
                <div className="flex items-center bg-white rounded-xl p-0.5 border border-teal-300 text-[10px] font-bold">
                  <button
                    onClick={() => setMoistureSource('estimated')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      moistureSource === 'estimated' 
                        ? 'bg-teal-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-teal-700'
                    }`}
                  >
                    Model Estimated
                  </button>
                  <button
                    onClick={() => setMoistureSource('measured')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      moistureSource === 'measured' 
                        ? 'bg-teal-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-teal-700'
                    }`}
                  >
                    Sensor Measured
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-slate-600">
                  {moistureSource === 'estimated' 
                    ? 'Estimated Value (Hydrological Model)' 
                    : 'Measured Value (Soil Sensor Probe)'}:
                </span>
                <span className={`text-base font-black ${activeSoilMoisture < 25 ? 'text-rose-600' : 'text-teal-700'}`}>
                  {activeSoilMoisture}%
                </span>
              </div>

              {moistureSource === 'measured' ? (
                <div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={manualMeasuredMoisture}
                    onChange={(e) => setManualMeasuredMoisture(parseInt(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Adjust to match your physical tensiometer or capacitance sensor reading.
                  </span>
                </div>
              ) : (
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-teal-500 h-2 rounded-full transition-all" 
                    style={{ width: `${activeSoilMoisture}%` }} 
                  />
                  <span className="text-[10px] text-teal-800 block mt-1">
                    Computed from {selectedSoilType} retention, {rainfall} mm rain, and {temperature}°C temp.
                  </span>
                </div>
              )}
            </div>

            {/* F. SOIL pH: Lab Sourced with User Adjustment */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  F. {language === 'ta' ? 'மண் காரத்தன்மை (pH)' : 'Soil pH'}:
                </span>
                <span className="text-emerald-700 font-black text-sm">pH {soilPh}</span>
              </div>
              <input
                type="range"
                min="4.5"
                max="9.0"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Acidic (&lt;6.5)</span>
                <span>Optimal (6.5 - 7.5)</span>
                <span>Alkaline (&gt;7.5)</span>
              </div>
              <span className="text-[10px] text-slate-500 block italic">
                * Sourced from {selectedDistrict} STL records; editable based on your field litmus/pH kit.
              </span>
            </div>

            {/* G. SOIL NUTRIENTS (NPK): Calibrated to Soil Type & Fully Editable */}
            <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  G. {language === 'ta' ? 'மண் சத்துக்கள் (N - P - K)' : 'Soil Nutrients (N - P - K in kg/ha)'}:
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                  Calibrated to {selectedSoilType}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                    <span>N:</span>
                    <strong className="text-emerald-800">{nitrogen}</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="350"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                    <span>P:</span>
                    <strong className="text-emerald-800">{phosphorus}</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-600 mb-0.5">
                    <span>K:</span>
                    <strong className="text-emerald-800">{potassium}</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="350"
                    value={potassium}
                    onChange={(e) => setPotassium(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Farming Decision & Risk Alerts (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {decision && (
            <div className="space-y-4">
              {/* Primary Action Plan Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white shadow-xl space-y-3 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
                    {language === 'ta' ? 'அறிவார்ந்த வேளாண் செயல் திட்டம்' : 'AI Crop Management Directive'}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-bold">
                    {selectedDistrict} • {selectedSoilType}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {decision.crop} ({decision.crop_stage}) — {decision.health_status} Health
                </h3>

                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {decision.reasoning_summary}
                </p>
              </div>

              {/* Recommendations: Irrigation & Fertilization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>{language === 'ta' ? 'பாசன வழிகாட்டுதல்' : 'Irrigation Directive'}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {decision.irrigation_recommendation}
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <FlaskConical className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'ta' ? 'உர பரிந்துரை' : 'Fertilizer Directive'}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {decision.fertilizer_recommendation}
                  </p>
                </div>
              </div>

              {/* H. AGRICULTURAL RISK ALERTS: Real Criteria or Authentic No-Risk Message */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                    <AlertTriangle className={`w-4 h-4 ${computedRiskAlerts.length > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
                    <span>{language === 'ta' ? 'வேளாண் இடர் மதிப்பீடு' : 'Agricultural Risk Evaluation'}:</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Live Diagnostics
                  </span>
                </div>

                {computedRiskAlerts.length > 0 ? (
                  <div className="space-y-2">
                    {computedRiskAlerts.map((alert, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 font-medium">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Exact required message when conditions are safe
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">
                        {language === 'ta' ? 'எவ்வித தீவிர வேளாண் இடரும் கண்டறியப்படவில்லை.' : 'No Critical Agricultural Risk Found.'}
                      </strong>
                      <span className="text-emerald-800">
                        {language === 'ta' 
                          ? `தற்போதைய தட்பவெப்பநிலை மற்றும் மண் ஈரப்பதம் (${activeSoilMoisture}%) ${cropType} பயிரின் இயல்பான வளர்ச்சிக்கு உகந்த வரம்பிற்குள் உள்ளது.`
                          : `Current micro-climate and soil moisture (${activeSoilMoisture}%) are within optimal agronomic thresholds for ${cropType}.`
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Crop Care Guidance */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ta' ? 'பயிர் பராமரிப்பு வழிகாட்டுதல்' : 'Crop Care Guidance & Suggested Actions'}:</span>
                </div>
                <ul className="space-y-1.5">
                  {(decision.crop_care_guidance || []).map((guide: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{guide}</span>
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

export default AiFarmingAssistantView;
