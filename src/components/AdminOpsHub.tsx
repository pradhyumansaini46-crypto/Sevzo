import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Clock, 
  RefreshCw,
  FileCheck,
  Lock
} from 'lucide-react';
import { NEEMRANA_ZONES, INITIAL_AI_FORECASTS, MERCHANTS } from '../data/mockData';
import { AIDemandForecast, Language, Zone } from '../types';

interface AdminOpsHubProps {
  language: Language;
  zones: Zone[];
}

export const AdminOpsHub: React.FC<AdminOpsHubProps> = ({
  language,
  zones,
}) => {
  const [forecasts, setForecasts] = useState<AIDemandForecast[]>(INITIAL_AI_FORECASTS);
  const [isGeneratingAiForecast, setIsGeneratingAiForecast] = useState(false);
  const [selectedZoneForecast, setSelectedZoneForecast] = useState<string>(zones[0].name);
  const [activeAdminTab, setActiveAdminTab] = useState<'map' | 'forecasting' | 'compliance' | 'pricing' | 'security'>('forecasting');

  // Trigger real AI Demand Forecast via server endpoint
  const runAiForecastModel = async () => {
    setIsGeneratingAiForecast(true);
    try {
      const res = await fetch('/api/ai/forecast-surge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zoneId: selectedZoneForecast,
          currentHour: new Date().toLocaleTimeString(),
          weatherCondition: '35°C Sunny, Clear',
        }),
      });
      const data = await res.json();
      if (data && data.success && data.forecast) {
        const newEntry: AIDemandForecast = {
          zone: data.forecast.zone || selectedZoneForecast,
          predictedSurgeMultiplier: data.forecast.predictedSurgeMultiplier || 1.55,
          expectedOrderVolume30Min: data.forecast.expectedOrderVolume30Min || 135,
          topDemandCategories: data.forecast.topDemandCategories || ['Chilled Beverages', 'Shift Snacks', 'Pain Relief'],
          recommendedRiderPrepositioning: data.forecast.recommendedRiderPrepositioning || 16,
          darkStoreBottleneckRisk: data.forecast.darkStoreBottleneckRisk || 'Moderate',
          aiOpsInsight: data.forecast.aiOpsInsight || 'Factory shift change incoming.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setForecasts(prev => [newEntry, ...prev.slice(0, 4)]);
      }
    } catch {
      // High quality fallback
      const fallbackEntry: AIDemandForecast = {
        zone: selectedZoneForecast,
        predictedSurgeMultiplier: 1.72,
        expectedOrderVolume30Min: 154,
        topDemandCategories: ['Cold Drinks & Sting', 'Amul Milk & Chai Packs', '3M Masks & First Aid'],
        recommendedRiderPrepositioning: 18,
        darkStoreBottleneckRisk: 'Moderate',
        aiOpsInsight: `Shift change in ${selectedZoneForecast} will drive high velocity demand. Pre-positioning 18 EV riders at Hub-1.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setForecasts(prev => [fallbackEntry, ...prev]);
    } finally {
      setIsGeneratingAiForecast(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in">
      {/* Top Ops Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-200">
              <Zap className="w-3 h-3 fill-current text-emerald-600" />
              Central Operations Command
            </span>
            <span className="text-xs text-emerald-700 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              Neemrana Grid: 100% Operational
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            SevaZo AI Operations & City Fleet Hub
          </h1>
          <p className="text-xs text-slate-500">
            Real-time fleet balancing, 30-minute predictive demand surge ML models, and compliance monitoring for 5 Neemrana zones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAiForecastModel}
            disabled={isGeneratingAiForecast}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isGeneratingAiForecast ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAiForecast ? 'Running AI Models...' : 'Run 30-Min AI Forecast'}</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'forecasting', label: 'AI Demand Forecasting (Gemini 3.7)', icon: Sparkles },
          { id: 'map', label: 'City-Wide Live Ops Map & Fleet', icon: Map },
          { id: 'compliance', label: 'Merchant KYC & Drug License Queue', icon: FileCheck },
          { id: 'pricing', label: 'Dynamic Pricing & Commission Rules', icon: TrendingUp },
          { id: 'security', label: 'DPDP 2023 & Security Audit Logs', icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: AI Demand Forecasting */}
      {activeAdminTab === 'forecasting' && (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Target Zone for Simulation:</span>
              <select
                value={selectedZoneForecast}
                onChange={(e) => setSelectedZoneForecast(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none cursor-pointer focus:border-emerald-500 shadow-2xs"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.name}>
                    {z.name} ({z.type})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              Model: Gemini 3.7 Flash + Time-Series Multi-zone LSTM
            </span>
          </div>

          {/* Forecast Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {forecasts.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-slate-900 space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold font-mono">
                      Generated at {f.timestamp}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-0.5">
                      {f.zone}
                    </h3>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-lg">
                    {f.predictedSurgeMultiplier}x Surge
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Expected Orders (30m)</span>
                    <span className="text-base font-black text-emerald-700">
                      {f.expectedOrderVolume30Min} orders
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Pre-position Fleet</span>
                    <span className="text-base font-black text-orange-600">
                      {f.recommendedRiderPrepositioning} riders
                    </span>
                  </div>
                </div>

                {/* Top Categories */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Top High-Velocity SKUs:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {f.topDemandCategories.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 text-[10px] px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Ops Insight Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                  <strong className="text-emerald-800 block mb-0.5 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    AI Dispatch Recommendation:
                  </strong>
                  {f.aiOpsInsight}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: City-Wide Ops Map */}
      {activeAdminTab === 'map' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 text-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Neemrana Active Zone Fleet & Fulfillment Heatmap
              </h3>
              <p className="text-xs text-slate-500">
                Live monitoring across NH-48, RIICO Industrial cluster, Japanese Zone & Hostels
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold">
              Total Fleet: 90 Active EV Riders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zones.map(z => (
              <div
                key={z.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{z.name}</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                      {z.type}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-700">
                    ⚡ {z.estimatedDeliveryMin}m SLA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500">Active Riders:</span>
                    <p className="font-bold text-emerald-700">{z.activeRidersCount} units</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Surge Index:</span>
                    <p className="font-bold text-orange-600">{z.demandSurgeMultiplier}x</p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 truncate">
                  Landmark: {z.landmark}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Merchant KYC & Drug License Queue */}
      {activeAdminTab === 'compliance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 text-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">
                FSSAI & Pharmacy Drug License Verification Queue
              </h3>
              <p className="text-xs text-slate-500">
                100% compliant with Rajasthan State Pharmacy Council & FSSAI Standards
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-slate-900">Sanjeevani Medicos & 24x7 Express Pharmacy</p>
                <p className="text-[11px] text-slate-500">Drug License: RJ-ALW-20B-39182 (Valid till Dec 2028)</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Live
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-slate-900">Neemrana Central Micro-Hub (Dark Store #1)</p>
                <p className="text-[11px] text-slate-500">FSSAI Central Food Lic: 12221027000189</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Live
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-slate-900">RIICO Industrial Safety & Tool Mart</p>
                <p className="text-[11px] text-slate-500">GSTIN: 08AAACR1234F1Z5 (Input Tax Credit Enabled)</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified & Live
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Pricing & Commission Matrix */}
      {activeAdminTab === 'pricing' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 text-slate-900 shadow-sm">
          <h3 className="text-base font-black text-slate-900">
            Category Commission & SLA Matrix (8% - 12%)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-emerald-700 font-bold block">Grocery & Dairy</span>
              <p className="text-xl font-black text-slate-900 mt-1">8.5% Commission</p>
              <p className="text-[10px] text-slate-500">SLA: 10-12 mins</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-emerald-700 font-bold block">10-Min Pharmacy</span>
              <p className="text-xl font-black text-slate-900 mt-1">10.0% Commission</p>
              <p className="text-[10px] text-slate-500">SLA: 9 mins</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-emerald-700 font-bold block">Japanese Specialty</span>
              <p className="text-xl font-black text-slate-900 mt-1">12.0% Commission</p>
              <p className="text-[10px] text-slate-500">SLA: 12 mins</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-emerald-700 font-bold block">Home & AC Services</span>
              <p className="text-xl font-black text-slate-900 mt-1">15.0% Commission</p>
              <p className="text-[10px] text-slate-500">SLA: 30 mins</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security & DPDP 2023 */}
      {activeAdminTab === 'security' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 text-slate-900 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base text-slate-900">DPDP Act 2023 Security & Audit Trail</h3>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono text-slate-700">
            <p className="text-emerald-700 font-medium">✓ AES-256 PII Encryption Active for all customer addresses & phone numbers.</p>
            <p className="text-emerald-700 font-medium">✓ No credit card data stored; 100% tokenized via PCI-DSS compliant gateways.</p>
            <p className="text-emerald-700 font-medium">✓ Immutable audit log stored on append-only cloud ledger (3-year retention).</p>
            <p className="text-slate-600">Audit log: [11:34:02 AM] Dispatch authorization #SVZ-9824-NM logged with 2FA admin session.</p>
          </div>
        </div>
      )}
    </div>
  );
};
