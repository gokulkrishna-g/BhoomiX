import React, { useState, useMemo } from 'react';
import { 
  TestTube, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Info, 
  HelpCircle, 
  Compass, 
  Navigation, 
  FileText, 
  Award, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { Language } from '../types';
import { TAMIL_NADU_SOIL_LABS, SoilTestingLab, calculateDistanceKm } from '../data/soilLabsData';
import { TAMIL_NADU_DISTRICTS, TN_DISTRICT_NAMES } from '../data/tamilNaduData';

interface SoilTestingLabsViewProps {
  language: Language;
  currentDistrict?: string;
  onSelectDistrict?: (district: string) => void;
  onNavigate?: (view: string) => void;
}

export const SoilTestingLabsView: React.FC<SoilTestingLabsViewProps> = ({
  language,
  currentDistrict = "Thanjavur",
  onSelectDistrict,
  onNavigate
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(currentDistrict);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTestParam, setSelectedTestParam] = useState<string>('All');
  const [expandedGuide, setExpandedGuide] = useState<string | null>('sampling');

  // Coordinates of the selected district for proximity sorting
  const referenceCoords = useMemo(() => {
    const d = TAMIL_NADU_DISTRICTS[selectedDistrict] || TAMIL_NADU_DISTRICTS["Thanjavur"];
    return { lat: d.lat, lon: d.lon };
  }, [selectedDistrict]);

  // Filtered and proximity-sorted laboratories
  const labsWithDistance = useMemo(() => {
    return TAMIL_NADU_SOIL_LABS.map(lab => {
      const distKm = calculateDistanceKm(referenceCoords.lat, referenceCoords.lon, lab.lat, lab.lon);
      const isLocal = lab.district.toLowerCase() === selectedDistrict.toLowerCase();
      return { ...lab, distanceKm: distKm, isLocal };
    })
    .filter(lab => {
      // Type filter
      if (selectedType !== 'All' && lab.type !== selectedType) return false;
      // Test parameter filter
      if (selectedTestParam !== 'All') {
        const hasParam = lab.tests_offered.some(t => t.toLowerCase().includes(selectedTestParam.toLowerCase()));
        if (!hasParam) return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = lab.name.toLowerCase().includes(q) || lab.name_ta.includes(q);
        const matchesDist = lab.district.toLowerCase().includes(q) || lab.district_ta.includes(q);
        const matchesAddr = lab.address.toLowerCase().includes(q) || lab.address_ta.includes(q);
        if (!matchesName && !matchesDist && !matchesAddr) return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Prioritize labs in the current district, then sort by distance ascending
      if (a.isLocal && !b.isLocal) return -1;
      if (!a.isLocal && b.isLocal) return 1;
      return a.distanceKm - b.distanceKm;
    });
  }, [selectedDistrict, referenceCoords, selectedType, selectedTestParam, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-2xl p-6 text-white border border-teal-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold mb-1">
              <TestTube className="w-4 h-4 text-teal-300" />
              <span>{language === 'ta' ? 'அரசு அங்கீகாரம் பெற்ற மண் பரிசோதனை ஆய்வகங்கள்' : 'Verified Soil Testing Laboratories Across Tamil Nadu'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {language === 'ta' ? 'அருகிலுள்ள மண் பரிசோதனை நிலையங்கள்' : 'Find Nearby Soil Testing Facilities'}
            </h1>
            <p className="text-teal-200/80 text-sm max-w-2xl mt-1">
              {language === 'ta'
                ? 'தமிழ்நாடு அரசு வேளாண்மைத் துறை மண் பரிசோதனை நிலையங்கள் (STL), TNAU வேளாண் அறிவியல் மையங்கள் (KVK), மற்றும் ICAR நிறுவனங்களின் அதிகாரப்பூர்வ முகவரி, தொலைபேசி மற்றும் கட்டண விவரங்கள்.'
                : 'Direct directory of verified Government Soil Testing Laboratories, TNAU Krishi Vigyan Kendras, and research centers with accurate GPS coordinates, testing fees, and direct contact numbers.'}
            </p>
          </div>

          {/* Active Farmer District Pill */}
          <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-3 rounded-xl border border-teal-500/30">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-300">{language === 'ta' ? 'தற்போதைய மாவட்டம்' : 'Selected District'}</div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>{language === 'ta' ? TAMIL_NADU_DISTRICTS[selectedDistrict]?.tamil_name : selectedDistrict}</span>
                <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                  {labsWithDistance.length} {language === 'ta' ? 'ஆய்வகங்கள்' : 'Labs'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input (5 cols) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'ta' ? 'ஆய்வகம், ஊர் அல்லது முகவரியை தேடுக...' : 'Search by lab name, city, or address...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* District Dropdown Filter (3 cols) */}
          <div className="md:col-span-4">
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                if (onSelectDistrict) onSelectDistrict(e.target.value);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              {TN_DISTRICT_NAMES.map(dName => (
                <option key={dName} value={dName}>
                  {language === 'ta' ? TAMIL_NADU_DISTRICTS[dName]?.tamil_name : dName} ({language === 'ta' ? 'மாவட்டம்' : 'District'})
                </option>
              ))}
            </select>
          </div>

          {/* Lab Type Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="All">{language === 'ta' ? 'அனைத்து ஆய்வகங்கள்' : 'All Lab Types'}</option>
              <option value="Government STL">{language === 'ta' ? 'அரசு மண் பரிசோதனை கூடம் (STL)' : 'Govt STL'}</option>
              <option value="TNAU KVK">{language === 'ta' ? 'TNAU வேளாண் அறிவியல் மையம் (KVK)' : 'TNAU KVK'}</option>
              <option value="University Dept">{language === 'ta' ? 'பல்கலைக்கழக ஆய்வுத்துறை' : 'University Dept'}</option>
            </select>
          </div>
        </div>

        {/* Test Parameter Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">{language === 'ta' ? 'தேவையான பரிசோதனை:' : 'Filter by Test:'}</span>
          {['All', 'pH', 'Nitrogen', 'Phosphorus', 'Potassium', 'Organic Carbon', 'Micronutrients', 'Salinity'].map((param) => (
            <button
              key={param}
              onClick={() => setSelectedTestParam(param)}
              className={`px-3 py-1 rounded-lg transition-all font-medium ${
                selectedTestParam === param
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {param}
            </button>
          ))}
        </div>
      </div>

      {/* Laboratories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {labsWithDistance.map((lab) => (
          <div
            key={lab.id}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all shadow-md flex flex-col justify-between ${
              lab.isLocal
                ? 'border-teal-500/80 ring-2 ring-teal-500/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700'
            }`}
          >
            <div>
              {/* Top Row: Type and Proximity Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                  lab.type === 'Government STL'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : lab.type === 'TNAU KVK'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                }`}>
                  {lab.type}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {lab.isLocal ? (
                    <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                      <span>{language === 'ta' ? 'உங்கள் மாவட்டத்தில் உள்ளது' : 'Local District Lab'}</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                      ~{lab.distanceKm} km {language === 'ta' ? 'தொலைவில்' : 'away'}
                    </span>
                  )}
                </div>
              </div>

              {/* Lab Title */}
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {language === 'ta' ? lab.name_ta : lab.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {language === 'ta' ? lab.district_ta : lab.district} {language === 'ta' ? 'மாவட்டம்' : 'District'}
              </p>

              {/* Address */}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>{language === 'ta' ? lab.address_ta : lab.address}</span>
              </p>

              {/* Tests Offered */}
              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {language === 'ta' ? 'வழங்கப்படும் பரிசோதனைகள்:' : 'Testing Parameters Offered:'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {(language === 'ta' ? lab.tests_offered_ta : lab.tests_offered).slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                  {lab.tests_offered.length > 5 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-teal-600 dark:text-teal-400 font-medium">
                      +{lab.tests_offered.length - 5} {language === 'ta' ? 'மேலும்' : 'more'}
                    </span>
                  )}
                </div>
              </div>

              {/* Fee and Turnaround */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">{language === 'ta' ? 'கட்டணம்' : 'Fee Structure'}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {language === 'ta' ? lab.fee_structure_ta : lab.fee_structure}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">{language === 'ta' ? 'முடிவுகள் காலம்' : 'Turnaround Time'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    <span>{lab.turnaround_days} {language === 'ta' ? 'வேலை நாட்கள்' : 'Working Days'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Directions and Phone Call */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <a
                href={lab.gps_directions_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'கூகுள் மேப்பில் வழிகாட்டல்' : 'Get Directions'}</span>
              </a>

              <a
                href={`tel:${lab.phone}`}
                className="py-2 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>{lab.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Practical Farmer Soil Testing Guidance Accordion */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'ta' ? 'விவசாயிகளுக்கான மண் மாதிரி எடுக்கும் வழிகாட்டல்' : 'Farmer Soil Sampling & Health Card Guide'}
          </h2>
        </div>

        <div className="space-y-3">
          {/* Guide Item 1: Sampling Procedure */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedGuide(expandedGuide === 'sampling' ? null : 'sampling')}
              className="w-full p-4 text-left font-bold text-sm bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" />
                {language === 'ta' ? '1. மண் மாதிரி எவ்வாறு எடுப்பது? (Proper Soil Sampling Method)' : '1. How to Collect Soil Samples Properly'}
              </span>
              {expandedGuide === 'sampling' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedGuide === 'sampling' && (
              <div className="p-4 text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-white dark:bg-slate-900 leading-relaxed">
                <p>
                  {language === 'ta'
                    ? '• நிலத்தின் பரப்பளவுக்கேற்ப "V" வடிவத்தில் 15 செ.மீ (6 அங்குலம்) ஆழத்திற்கு மண் வெட்டி எடுக்க வேண்டும்.'
                    : '• Make a V-shaped cut to a depth of 15 cm (6 inches) for field crops using a clean spade or auger.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• வரப்பு ஓரங்கள், மரத்தடி, உரக்குவியல் மற்றும் நீர் வாய்க்கால்களில் மாதிரி எடுக்கக் கூடாது.'
                    : '• Avoid field boundaries, shade of trees, compost pits, irrigation channels, and recently fertilized spots.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• வயலின் 10-15 இடங்களில் ஜிக்-ஜாக் (Zig-Zag) முறையில் சேகரித்த மண்ணை ஒரு சுத்தமான சாக்கில் ஒன்று கலக்கவும்.'
                    : '• Collect sub-samples from 10 to 15 spots across the field in a zig-zag pattern and mix thoroughly in a clean tray.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• "கால் பங்கு முறை" (Quartering method) மூலம் மண்ணை 4 பகுதிகளாக பிரித்து, எதிர் திசை பகுதிகளை நீக்கி அரை கிலோ (500 கிராம்) வரும் வரை சுருக்கவும்.'
                    : '• Use the quartering method to divide the mixed soil into 4 parts, discard opposite quarters, and repeat until ~500 grams remains.'}
                </p>
              </div>
            )}
          </div>

          {/* Guide Item 2: Required Quantity & Packing */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedGuide(expandedGuide === 'quantity' ? null : 'quantity')}
              className="w-full p-4 text-left font-bold text-sm bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {language === 'ta' ? '2. தேவையான மண் அளவு & விபர அட்டை (Sample Quantity & Labeling)' : '2. Required Sample Quantity & Packaging'}
              </span>
              {expandedGuide === 'quantity' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedGuide === 'quantity' && (
              <div className="p-4 text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-white dark:bg-slate-900 leading-relaxed">
                <p>
                  {language === 'ta'
                    ? '• மாதிரி அளவு: சரியாக 500 கிராம் நிழலில் உலர்த்திய மண்.'
                    : '• Sample Quantity: Exactly 500 grams of clean, shade-dried soil.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• பையினுள் வைக்க வேண்டிய அட்டை விவரம்: விவசாயி பெயர், கிராமம், பட்டா / சர்வே எண், முந்தைய பயிர், அடுத்து பயிரிட திட்டமிடும் பயிர், மற்றும் பாசன முறை.'
                    : '• Tag Details: Farmer name, village, survey/patta number, previous crop cultivated, next intended crop, and irrigation source.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• ஈரமான மண்ணை வெயிலில் காயவைக்காமல் நிழலில் பேப்பரில் பரப்பி உலர்த்த வேண்டும்.'
                    : '• Never dry wet soil directly under harsh sunlight; air-dry under shade on a clean sheet of paper.'}
                </p>
              </div>
            )}
          </div>

          {/* Guide Item 3: Soil Health Card Application */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedGuide(expandedGuide === 'card' ? null : 'card')}
              className="w-full p-4 text-left font-bold text-sm bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                {language === 'ta' ? '3. மண் வள அட்டைக்கு எவ்வாறு விண்ணப்பிப்பது? (Soil Health Card Scheme)' : '3. How to Apply for Soil Health Card'}
              </span>
              {expandedGuide === 'card' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {expandedGuide === 'card' && (
              <div className="p-4 text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-white dark:bg-slate-900 leading-relaxed">
                <p>
                  {language === 'ta'
                    ? '• உங்கள் வட்டார வேளாண்மை விரிவாக்க மையம் (Block Agriculture Extension Office) அல்லது கிராம வேளாண் உதவி அலுவலரை அணுகலாம்.'
                    : '• Approach your Assistant Agricultural Officer (AAO) at the Block Agriculture Extension Centre or Primary Agricultural Co-operative Society (PACS).'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• தமிழ்நாடு உழவன் செயலி (Uzhavan App) அல்லது மத்திய அரசின் soilhealth.dac.gov.in போர்ட்டலில் ஆன்லைனில் பதிவு செய்யலாம்.'
                    : '• Farmers can register directly via the Tamil Nadu Uzhavan App or the central Soil Health Portal at soilhealth.dac.gov.in.'}
                </p>
                <p>
                  {language === 'ta'
                    ? '• அரசு கட்டணம்: மாதிரி ஒன்றுக்கு ₹20 மட்டுமே. மண் பரிசோதனை அறிக்கை மற்றும் உர பரிந்துரை அட்டை 3-5 நாட்களில் உங்கள் கைபேசிக்கு எஸ்.எம்.எஸ் வடிவில் வந்து சேரும்.'
                    : '• Subsidized fee is only ₹20 per sample. The detailed 12-parameter soil health card with customized fertilizer dose is sent directly via SMS.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilTestingLabsView;
