import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  PieChart, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Calculator,
  RefreshCw,
  Info
} from 'lucide-react';
import { Language, ProfitAnalysisResponse } from '../types';
import { translations } from '../translations';
import { calculateProfit } from '../services/api';

interface CropProfitAnalysisViewProps {
  language: Language;
}

export const CropProfitAnalysisView: React.FC<CropProfitAnalysisViewProps> = ({ language }) => {
  const t = translations[language];

  // Form State
  const [crop, setCrop] = useState('Rice');
  const [areaAcres, setAreaAcres] = useState(2.5);
  const [expectedYieldPerAcre, setExpectedYieldPerAcre] = useState(2200); // kg/acre
  const [mandiPricePerKg, setMandiPricePerKg] = useState(24.50); // ₹24.50/kg

  // Expenses Breakdown (3 Months of Farm Expenses)
  const [seedCost, setSeedCost] = useState(3500);
  const [fertilizerCost, setFertilizerCost] = useState(6200);
  const [pesticideCost, setPesticideCost] = useState(2800);
  const [machineryFuelCost, setMachineryFuelCost] = useState(5500);
  const [laborCost, setLaborCost] = useState(12000);
  const [irrigationElecCost, setIrrigationElecCost] = useState(1800);
  const [transportCost, setTransportCost] = useState(2200);

  const [result, setResult] = useState<ProfitAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const data = await calculateProfit({
        crop,
        area_acres: areaAcres,
        expected_yield_kg_per_acre: expectedYieldPerAcre,
        expected_mandi_price_per_kg: mandiPricePerKg,
        seed_cost: seedCost,
        fertilizer_cost: fertilizerCost,
        pesticide_cost: pesticideCost,
        machinery_fuel_cost: machineryFuelCost,
        labor_cost: laborCost,
        irrigation_electricity_cost: irrigationElecCost,
        post_harvest_transport_cost: transportCost
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, [crop, areaAcres, expectedYieldPerAcre, mandiPricePerKg, seedCost, fertilizerCost, pesticideCost, machineryFuelCost, laborCost, irrigationElecCost, transportCost]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800">
              {language === 'ta' ? 'பயிர் லாப-நஷ்ட பகுப்பாய்வு & செலவு மதிப்பீடு' : 'AI Crop Profit & Financial Analytics'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              ICRISAT Cost of Cultivation Model
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ta'
              ? 'விதை, உரம், உழவு, கூலி மற்றும் பாசன செலவுகளை கணக்கிட்டு எதிர்பார்க்கப்படும் வருவாய் மற்றும் நிகர லாபத்தை கணிக்கிறது.'
              : 'Estimates 3-month farm cultivation expenditures, expected gross revenue, net profit margin, and price sensitivity.'
            }
          </p>
        </div>

        {/* Real-time reactive indicator (No calculation button) */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>
            {loading 
              ? t.common.loading 
              : (language === 'ta' ? 'தானியங்கி உடனடி லாபக் கணக்கீடு' : 'Instant Reactive Financial Model')
            }
          </span>
        </div>
      </div>

      {/* 2-Col Grid: Expenses Entry vs Financial Analysis Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: 3-Month Expenses Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ta' ? 'உற்பத்தி & செலவு உள்ளீடுகள்' : 'Production & Expense Ledger'}</span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Crop & Land */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Crop</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="Rice">Rice / நெல்</option>
                  <option value="Cotton">Cotton / பருத்தி</option>
                  <option value="Banana">Banana / வாழை</option>
                  <option value="Sugarcane">Sugarcane / கரும்பு</option>
                  <option value="Groundnut">Groundnut / நிலக்கடலை</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>

            {/* Expected Yield & Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Exp. Yield (kg/acre)</label>
                <input
                  type="number"
                  value={expectedYieldPerAcre}
                  onChange={(e) => setExpectedYieldPerAcre(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mandi Price (₹/kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={mandiPricePerKg}
                  onChange={(e) => setMandiPricePerKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-emerald-700 font-bold"
                />
              </div>
            </div>

            {/* Expense Breakdown List */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="font-bold text-slate-700 block">
                {language === 'ta' ? '3 மாத பண்ணை செலவுகள் (₹)' : '3-Month Farm Cultivation Expenses (₹)'}:
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">Seeds / நாற்று</label>
                  <input
                    type="number"
                    value={seedCost}
                    onChange={(e) => setSeedCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Fertilizers / உரம்</label>
                  <input
                    type="number"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Labor / கூலி ஆட்கள்</label>
                  <input
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Tractor / உழவு டீசல்</label>
                  <input
                    type="number"
                    value={machineryFuelCost}
                    onChange={(e) => setMachineryFuelCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Pesticides / பூச்சி மருந்து</label>
                  <input
                    type="number"
                    value={pesticideCost}
                    onChange={(e) => setPesticideCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">Mandi Transport / வண்டி வாடகை</label>
                  <input
                    type="number"
                    value={transportCost}
                    onChange={(e) => setTransportCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Profit & Financial KPI Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="space-y-4">
              {/* Primary Net Profit / Revenue Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-green-900 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                    {language === 'ta' ? 'எதிர்பார்க்கப்படும் நிகர லாபம்' : 'Projected Net Farmer Profit'}
                  </span>
                  <TrendingUp className="w-5 h-5 text-emerald-300" />
                </div>

                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black">
                    ₹{result.net_profit_or_loss.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                    ROI: {result.return_on_investment_roi_pct}%
                  </span>
                </div>

                <div className="grid grid-cols-2 pt-2 border-t border-emerald-700/60 text-xs">
                  <div>
                    <span className="text-emerald-300 block">Gross Revenue</span>
                    <strong className="text-white">₹{result.gross_expected_revenue.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-300 block">Total Cultivation Cost</span>
                    <strong className="text-white">₹{result.total_production_cost.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Expense Breakdown List */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  {language === 'ta' ? 'செலவு விகிதாச்சாரம்' : 'Cost Breakdown by Category'}:
                </h4>

                <div className="space-y-2">
                  {result.expense_breakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{item.category}</span>
                        <span className="font-bold text-slate-800">₹{item.amount.toLocaleString('en-IN')} ({item.pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensitivity Analysis Scenario */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">
                  {language === 'ta' ? 'சந்தை விலை ஏற்ற இறக்க உணர்திறன்' : 'Market Price Sensitivity Scenarios'}:
                </span>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 block">If Mandi Price Rises +10%</span>
                    <strong className="text-emerald-900 text-sm">
                      ₹{result.sensitivity_scenarios.if_market_price_rises_10pct.toLocaleString('en-IN')} Profit
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-200">
                    <span className="text-[10px] text-amber-800 block">If Mandi Price Dips -10%</span>
                    <strong className="text-amber-900 text-sm">
                      ₹{result.sensitivity_scenarios.if_market_price_drops_10pct.toLocaleString('en-IN')} Profit
                    </strong>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> Financial estimations are projections based on historical ICRISAT benchmarks and user expense inputs. Actual farm net returns depend on physical mandi bidding and harvest grade.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
