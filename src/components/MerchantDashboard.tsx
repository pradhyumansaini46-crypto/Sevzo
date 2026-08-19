import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  DollarSign, 
  Layers, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  ChevronDown,
  Search
} from 'lucide-react';
import { MERCHANTS, PRODUCTS } from '../data/mockData';
import { Merchant, Product, Language } from '../types';

interface MerchantDashboardProps {
  language: Language;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  language,
}) => {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>(MERCHANTS[0]);
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'analytics' | 'payouts'>('orders');
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [searchCatalog, setSearchCatalog] = useState('');

  // Sample incoming live orders for this merchant
  const [merchantOrders, setMerchantOrders] = useState([
    {
      id: 'ORD-7192',
      customer: 'Rohit Verma (Daikin R&D)',
      items: ['Amul Gold Milk 500ml x 2', 'Dolo 650 Strip x 1', 'Sting Energy 250ml x 2'],
      total: 149,
      status: 'pending_prep',
      prepTimeMin: 3,
      receivedAt: '2 mins ago',
      isExpress: true
    },
    {
      id: 'ORD-7193',
      customer: 'Pooja Agarwal (Eldeco Flat 301)',
      items: ['Aashirvaad Atta 5kg x 1', 'Tata Tea Gold 500g x 1'],
      total: 530,
      status: 'packing',
      prepTimeMin: 4,
      receivedAt: '6 mins ago',
      isExpress: false
    },
    {
      id: 'ORD-7188',
      customer: 'Kenji Takahashi (Japanese Zone Mikuni)',
      items: ['Nongshim Shin Ramen x 2', 'Ito En Green Tea x 2'],
      total: 590,
      status: 'dispatched',
      prepTimeMin: 2,
      receivedAt: '18 mins ago',
      isExpress: true
    }
  ]);

  const toggleStock = (prodId: string) => {
    setProductList(prev =>
      prev.map(p => (p.id === prodId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleAcceptOrder = (orderId: string) => {
    setMerchantOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'packing' } : o))
    );
  };

  const handleMarkReady = (orderId: string) => {
    setMerchantOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'dispatched' } : o))
    );
  };

  const filteredCatalog = productList.filter(p =>
    p.name.toLowerCase().includes(searchCatalog.toLowerCase()) ||
    p.category.toLowerCase().includes(searchCatalog.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in">
      {/* Top Merchant Selection & Stats Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
            <Store className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {selectedMerchant.name}
              </h1>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                ● Live & Accepting
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedMerchant.zone} • Avg Prep: <strong className="text-emerald-700">{selectedMerchant.avgPrepTimeMin} mins</strong>
            </p>
          </div>
        </div>

        {/* Store Selector Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={selectedMerchant.id}
            onChange={(e) => {
              const found = MERCHANTS.find(m => m.id === e.target.value);
              if (found) setSelectedMerchant(found);
            }}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none cursor-pointer focus:border-emerald-500 shadow-2xs"
          >
            {MERCHANTS.map(m => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-1 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold">Today's Revenue</span>
          <p className="text-xl font-black text-emerald-700">
            ₹{selectedMerchant.todayRevenueINR}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">+18.4% vs yesterday</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-1 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold">Orders Completed</span>
          <p className="text-xl font-black text-slate-900">
            {selectedMerchant.todayOrdersCount} orders
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold">⚡ 99.2% on-time SLA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-1 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold">Pending Settlement</span>
          <p className="text-xl font-black text-orange-600">
            ₹{selectedMerchant.payoutPendingINR}
          </p>
          <span className="text-[10px] text-slate-500">Auto-transfers nightly</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 space-y-1 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold">Store Tier</span>
          <p className="text-base font-black text-slate-900 truncate">
            {selectedMerchant.subscriptionPlan}
          </p>
          <span className="text-[10px] text-slate-500">Priority Algorithm Boost</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'orders', label: 'Live Order Inbox (3 Active)', icon: Package },
          { id: 'catalog', label: 'Catalog & Stock Controls', icon: Layers },
          { id: 'analytics', label: 'Sales & Shift Rush Heatmap', icon: TrendingUp },
          { id: 'payouts', label: 'Settlement & Bank Payouts', icon: DollarSign }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* Tab 1: Live Order Inbox */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              Live Order Queue (Auto-Syncing with Neemrana Dispatch)
            </h3>
          </div>

          <div className="space-y-3">
            {merchantOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{order.id}</span>
                    {order.isExpress && (
                      <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow-2xs">
                        ⚡ EXPRESS 10M
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500">• {order.receivedAt}</span>
                  </div>

                  <p className="text-xs font-bold text-emerald-800">{order.customer}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {order.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 text-[11px] px-2 py-0.5 rounded-lg border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Order Value</span>
                    <span className="text-base font-black text-slate-900">₹{order.total}</span>
                  </div>

                  {order.status === 'pending_prep' && (
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
                    >
                      Accept & Pack (3m)
                    </button>
                  )}

                  {order.status === 'packing' && (
                    <button
                      onClick={() => handleMarkReady(order.id)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
                    >
                      Mark Ready for Rider
                    </button>
                  )}

                  {order.status === 'dispatched' && (
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Dispatched with Rider
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Catalog & Stock */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchCatalog}
                onChange={(e) => setSearchCatalog(e.target.value)}
                placeholder="Search catalog SKU..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
            <span className="text-xs text-slate-500">
              Total SKUs: {filteredCatalog.length}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-900">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Unit Price</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3">In-Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCatalog.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 flex items-center gap-2.5 font-bold">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200 bg-slate-50"
                        />
                        <span>{prod.name}</span>
                      </td>
                      <td className="p-3 text-slate-500">{prod.category}</td>
                      <td className="p-3 font-black text-slate-900">₹{prod.price}</td>
                      <td className="p-3 font-mono text-emerald-700">{prod.stockCount} units</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleStock(prod.id)}
                          className="flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                        >
                          {prod.inStock ? (
                            <>
                              <ToggleRight className="w-6 h-6 text-emerald-600" />
                              <span className="text-emerald-700">Live</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-6 h-6 text-slate-400" />
                              <span className="text-slate-500">Sold Out</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sales Analytics & Peak Hour Rush */}
      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 text-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Neemrana Industrial Zone Order Velocity Heatmap
              </h3>
              <p className="text-xs text-slate-500">
                Peak order spikes coincide with factory shift timings (07:00 AM, 12:30 PM, 08:30 PM)
              </p>
            </div>
          </div>

          {/* Heatmap Bar Chart Simulation */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 text-center pt-4">
            {[
              { hour: '6 AM', val: 20, isPeak: false },
              { hour: '8 AM', val: 65, isPeak: true },
              { hour: '10 AM', val: 40, isPeak: false },
              { hour: '12 PM', val: 95, isPeak: true },
              { hour: '2 PM', val: 55, isPeak: false },
              { hour: '4 PM', val: 70, isPeak: true },
              { hour: '6 PM', val: 60, isPeak: false },
              { hour: '8 PM', val: 100, isPeak: true },
              { hour: '10 PM', val: 85, isPeak: true },
              { hour: '12 AM', val: 45, isPeak: false },
              { hour: '2 AM', val: 15, isPeak: false },
              { hour: '4 AM', val: 10, isPeak: false }
            ].map((slot, idx) => (
              <div key={idx} className="space-y-1.5 flex flex-col items-center">
                <div className="w-full bg-slate-100 h-32 rounded-xl relative flex items-end p-1">
                  <div
                    style={{ height: `${slot.val}%` }}
                    className={`w-full rounded-lg transition-all ${
                      slot.isPeak
                        ? 'bg-emerald-600 shadow-2xs'
                        : 'bg-slate-300'
                    }`}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">{slot.hour}</span>
                {slot.isPeak && (
                  <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-1 rounded border border-emerald-200">
                    RUSH
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="text-emerald-700 font-bold block">AI Merchant Tip:</span>
            <p className="text-slate-600">
              Pre-pack 30 units of cold Sting drinks and Shin Ramyun noodle cups by 12:15 PM to keep fulfillment time under 2.5 minutes during the Daikin/Havells shift break.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Payouts */}
      {activeTab === 'payouts' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 text-slate-900 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Bank Settlement & Ledger</h3>
              <p className="text-xs text-slate-500">Registered HDFC Bank Acc: •••• 9182 (IFSC: HDFC0001892)</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xs cursor-pointer">
              Request Instant Withdrawal (₹{selectedMerchant.payoutPendingINR})
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600">Yesterday Net Settlement</span>
              <span className="font-bold text-emerald-700">₹16,420 (Processed)</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600">Commission Deducted (8%)</span>
              <span className="font-bold text-slate-500">-₹1,427</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600">GST Input Credit TDS</span>
              <span className="font-bold text-slate-500">₹284</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
