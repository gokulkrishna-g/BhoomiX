import React, { useState } from 'react';
import { 
  Bug, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FlaskConical, 
  Sparkles, 
  RefreshCw, 
  Leaf, 
  Eye,
  Info
} from 'lucide-react';
import { Language, PestDetectionResponse } from '../types';
import { translations } from '../translations';
import { detectPest } from '../services/api';

interface DiseasePestDetectionViewProps {
  language: Language;
}

export const DiseasePestDetectionView: React.FC<DiseasePestDetectionViewProps> = ({ language }) => {
  const t = translations[language];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<string>('army worm');
  const [result, setResult] = useState<PestDetectionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preset demo options from the user's Roboflow dataset
  const samplePresets = [
    { id: 'army worm', name: 'Army Worm', tamil: 'படைப்புழு', icon: '🐛' },
    { id: 'rice leaf roller', name: 'Rice Leaf Roller', tamil: 'இலை சுருட்டு புழு', icon: '🌾' },
    { id: 'yellow rice borer', name: 'Yellow Rice Borer', tamil: 'மஞ்சள் தண்டு துளைப்பான்', icon: '🦗' },
    { id: 'rice gall midge', name: 'Rice Gall Midge', tamil: 'ஆனைக்கொம்பன்', icon: '🦟' },
    { id: 'legume blister beetle', name: 'Legume Blister Beetle', tamil: 'வண்டு பூச்சி', icon: '🪲' },
    { id: 'agricultural weed', name: 'Agricultural Weeds', tamil: 'களைச்செடிகள்', icon: '🌿' },
    { id: 'healthy crop leaf', name: 'Healthy Leaf Canopy', tamil: 'ஆரோக்கியமான இலை', icon: '🍃' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedSample('');
    }
  };

  const handleRunInference = async (sampleOverride?: string) => {
    setLoading(true);
    setError(null);
    try {
      const sampleToUse = sampleOverride || (selectedFile ? undefined : selectedSample);
      const res = await detectPest(selectedFile || undefined, sampleToUse);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Image inference failed');
    } finally {
      setLoading(false);
    }
  };

  // Run reactively on mount or when a file is selected
  React.useEffect(() => {
    if (selectedFile) {
      handleRunInference();
    } else {
      handleRunInference('army worm');
    }
  }, [selectedFile]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'பயிர் பூச்சி & நோய் AI கண்டறிதல்' : 'Crop Disease & Pest AI Diagnostics'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
              Roboflow YOLOv8 Agriculture Collection
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'பயிரின் புகைப்படத்தை பதிவேற்றி படைப்புழு, தண்டு துளைப்பான், இலைச்சுருட்டு போன்ற பூச்சிகளை துல்லியமாக கண்டறிந்து இயற்கை மற்றும் ரசாயன மருந்துகளை பெறுங்கள்.'
              : 'Trained visual feature classifier diagnosing 10 key crop insect pests, agricultural weeds, and healthy foliage with integrated IPM remedies.'
            }
          </p>
        </div>

        {/* Real-time reactive indicator (No calculation button) */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>
            {loading 
              ? t.common.loading 
              : (language === 'ta' ? 'தானியங்கி உடனடி பட ஆய்வு' : 'Instant Vision Diagnostics')
            }
          </span>
        </div>
      </div>

      {/* Preset Selector Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
        <span className="text-xs font-bold text-slate-800 block">
          {language === 'ta' ? 'மாதிரி பூச்சி/நோய் படங்கள் (Roboflow தரவுத்தொகுப்பிலிருந்து)' : 'Select Roboflow Dataset Sample Presets'}:
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePresets.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedSample(sample.id);
                setSelectedFile(null);
                setPreviewUrl(null);
                handleRunInference(sample.id);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedSample === sample.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>{sample.icon}</span>
              <span>{language === 'ta' ? sample.tamil : sample.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Col Layout: Image Upload vs Diagnostic Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Visual Preview */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'இலை / பூச்சி படம் பதிவேற்றவும்' : 'Upload Crop Specimen Image'}</span>
            </h2>
            <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">
                {language === 'ta' ? 'படத்தை கிளிக் செய்து பதிவேற்றவும்' : 'Click or drop crop leaf photo here'}
              </p>
              <p className="text-[10px] text-slate-400">
                Camera shots of leaves, damaged stem, or field weeds
              </p>
            </div>
          </div>

          {/* Active Preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
            <span className="text-[11px] font-semibold text-slate-500 block">
              {language === 'ta' ? 'தற்போதைய ஆய்வு மாதிரி' : 'Active Specimen Under AI Analysis'}:
            </span>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Specimen"
                className="max-h-48 mx-auto rounded-xl shadow-md border border-slate-200 object-cover"
              />
            ) : (
              <div className="py-8 bg-emerald-950/5 rounded-xl border border-emerald-900/10 text-emerald-800">
                <span className="text-4xl block mb-1">
                  {samplePresets.find(s => s.id === selectedSample)?.icon || '🐛'}
                </span>
                <p className="text-xs font-bold capitalize">
                  {selectedSample || 'Army Worm'}
                </p>
                <p className="text-[10px] text-slate-500">Roboflow YOLOv8 Specimen Active</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Diagnostic Results & Safe Farming Guidance */}
        <div className="lg:col-span-7 space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Identified Specimen Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      AI Diagnostic Confirmed
                    </span>
                    <h3 className="text-2xl font-black capitalize text-slate-800 mt-2">
                      {result.identified_class}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      {result.tamil_name} • <span className="italic text-slate-500">{result.scientific_name}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-600">
                      {result.confidence_percent}%
                    </span>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Confidence</p>
                  </div>
                </div>

                {/* Symptoms Description */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{language === 'ta' ? 'அறிகுறிகள் & பாதிப்பு' : 'Field Symptoms & Damage Characteristics'}:</span>
                  </span>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    {result.symptoms}
                  </p>
                </div>

                {/* Affected Crops */}
                <div className="text-xs text-slate-600 flex items-center space-x-2">
                  <span className="font-semibold">{language === 'ta' ? 'பாதிக்கப்படும் பயிர்கள்' : 'Host Crops'}:</span>
                  <div className="flex flex-wrap gap-1">
                    {result.crops_affected.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Organic & Biological Remedies (Farmer-First) */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <Leaf className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                  <h4 className="font-bold text-sm">
                    {language === 'ta' ? 'இயற்கை மற்றும் உயிரியல் கட்டுப்பாடு (Biological Remedies)' : 'Organic & Biological Remedies (Zero Residue)'}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {result.organic_remedies.map((rem, i) => (
                    <li key={i} className="text-xs text-emerald-950 flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Remedies (Safe Dosage Guidelines) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 text-slate-800">
                  <FlaskConical className="w-5 h-5 flex-shrink-0 text-amber-600" />
                  <h4 className="font-bold text-sm">
                    {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட ரசாயன மருந்துகள் (CIBRC அளவு)' : 'CIBRC Approved Chemical Formulations'}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {result.chemical_remedies.map((chem, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{chem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preventive Practices */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-lg">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <h4 className="font-bold text-sm">
                    {language === 'ta' ? 'எதிர்கால தடுப்பு முறைகள்' : 'Proactive Agronomic Prevention'}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {result.preventive_practices.map((prev, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{prev}</span>
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
