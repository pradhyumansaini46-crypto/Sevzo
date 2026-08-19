import React, { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  FileText, 
  Truck, 
  CheckCircle2, 
  Zap, 
  Plus, 
  Minus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS } from '../data/mockData';
import { Product, Language } from '../types';

interface B2BIndustrialViewProps {
  onAddToCart: (product: Product) => void;
  language: Language;
}

export const B2BIndustrialView: React.FC<B2BIndustrialViewProps> = ({
  onAddToCart,
  language,
}) => {
  const [gstinNumber, setGstinNumber] = useState('08AAACD5432E1Z8');
  const [factoryName, setFactoryName] = useState('Daikin India Pvt Ltd (Plant 2, RIICO)');
  const [bulkOrderPlaced, setBulkOrderPlaced] = useState(false);

  const b2bProducts = PRODUCTS.filter(p => p.category === 'Industrial & Safety Supplies' || p.tags.includes('canteen'));

  const handleCreateB2BQuote = () => {
    setBulkOrderPlaced(true);
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.5 },
      colors: ['#ff6b35', '#e85d8c', '#3b82f6'],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 animate-in fade-in">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-slate-900 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
              <Building2 className="w-3.5 h-3.5" />
              B2B Enterprise & Factory Portal
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              RIICO & Japanese Zone Express
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            15-Minute Industrial Consumables & Canteen Bulk Supply
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Eliminate factory assembly downtime in Neemrana. Instant doorstep dispatch for 3M respiratory gear, packaging consumables, safety gloves, and canteen bulk packs with instant 18% GST input credit invoices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <span className="text-emerald-700 font-black block text-sm">⚡ 15-Min Delivery</span>
              <span className="text-slate-500 text-[11px]">Direct to factory gate / plant security</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <span className="text-emerald-700 font-black block text-sm">🧾 Full GST Invoice</span>
              <span className="text-slate-500 text-[11px]">Instant GST input tax credit</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-800 font-black block text-sm">💳 30-Day Credit Terms</span>
              <span className="text-slate-500 text-[11px]">For verified corporate accounts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Industrial Safety & High-Priority Consumables
            </h2>
            <p className="text-xs text-slate-500">
              Sourced from certified RIICO industrial safety depots
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {b2bProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-500/60 transition-all p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    B2B Wholesale
                  </span>
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                    ⚡ {prod.deliveryTimeMin}m Dispatch
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    {prod.unit}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>In Stock at RIICO Hub:</span>
                    <span className="text-emerald-700 font-bold">{prod.stockCount} units</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax Slab:</span>
                    <span className="text-slate-900 font-semibold">18% GST Applicable</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Unit Price (ex. GST)</span>
                  <span className="text-base font-black text-slate-900">₹{prod.price}</span>
                </div>

                <button
                  onClick={() => onAddToCart(prod)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Invoicing Setup Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-slate-900 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            Corporate GST Invoicing & Plant PO Billing
          </h3>
        </div>

        {bulkOrderPlaced ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-800 space-y-1">
            <p className="font-bold text-emerald-900 text-sm">✓ B2B Industrial PO Quote Generated!</p>
            <p>Order assigned to SevaZo B2B Corporate Desk for {factoryName} (GST: {gstinNumber}).</p>
            <p className="text-emerald-950">Our industrial fleet coordinator will dispatch bulk orders with sealed delivery chalans.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Factory / Enterprise Name</label>
              <input
                type="text"
                value={factoryName}
                onChange={(e) => setFactoryName(e.target.value)}
                placeholder="e.g. Daikin, Havells, Hero Plant 2"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">Company GSTIN Number</label>
              <input
                type="text"
                value={gstinNumber}
                onChange={(e) => setGstinNumber(e.target.value)}
                placeholder="15-digit GSTIN"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono uppercase outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex justify-end">
              <button
                onClick={handleCreateB2BQuote}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Save GST Profile & Generate Purchase Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
