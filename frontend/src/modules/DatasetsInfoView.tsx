import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  GitFork, 
  Layers, 
  Sparkles, 
  FileSpreadsheet,
  Globe,
  HardDrive
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getDatasetsInfo } from '../services/api';

interface DatasetsInfoViewProps {
  language: Language;
}

export const DatasetsInfoView: React.FC<DatasetsInfoViewProps> = ({ language }) => {
  const t = translations[language];

  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getDatasetsInfo();
      setInfo(res);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'தரவுத்தொகுப்பு & மாதிரி வெளிப்படைத்தன்மை' : 'Datasets & AI Model Transparency Registry'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Open Data & Research Benchmarks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'பூமி எக்ஸ் தளத்தில் பயன்படுத்தப்பட்டுள்ள உண்மையான தரவுத்தொகுப்புகள், மாதிரி மதிப்பீடுகள் மற்றும் வெளிப்புற மேற்கோள்களின் முழுமையான பட்டியல்.'
              : 'Complete registry of physical datasets utilized in training BhoomiX AI models, verified evaluation metrics, and external repository references.'
            }
          </p>
        </div>
      </div>

      {info && (
        <div className="space-y-8">
          {/* Datasets List */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <span>Physical Datasets Integrated & Trained in BhoomiX</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {info.datasets_used.map((ds: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase">
                        {ds.file}
                      </span>
                      <h3 className="font-bold text-base text-slate-800 mt-1.5">{ds.name}</h3>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    {ds.size_records && (
                      <p className="text-slate-600">
                        Total Dataset Records: <strong className="text-slate-800">{ds.size_records.toLocaleString('en-IN')} rows</strong>
                      </p>
                    )}
                    {ds.features && (
                      <p className="text-slate-600">
                        Features: <span className="font-mono text-emerald-700">{ds.features.join(', ')}</span>
                      </p>
                    )}
                    {ds.resolution && (
                      <p className="text-slate-600">
                        Satellite Resolution: <strong className="text-slate-800">{ds.resolution}</strong>
                      </p>
                    )}
                    {ds.coordinates && (
                      <p className="text-slate-600">
                        South Asia Coordinates: <strong className="text-slate-800">{ds.coordinates}</strong>
                      </p>
                    )}
                    {ds.model_trained && (
                      <p className="text-slate-900 font-semibold pt-1 border-t border-slate-200">
                        Trained AI Model: <span className="text-emerald-700 font-bold">{ds.model_trained}</span>
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Source: <strong className="text-slate-600">{ds.source}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* External GitHub Reference Repositories */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <GitFork className="w-5 h-5 text-indigo-600" />
              <span>External Research & Architectural References</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {info.external_github_references.map((repo: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-slate-800">{repo.name}</h3>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <span>GitHub Repo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {repo.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                    {repo.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
