import React, { useState, useEffect } from 'react';
import { 
  Bike, 
  MapPin, 
  Navigation, 
  Phone, 
  DollarSign, 
  Zap, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Zone } from '../types';

interface RiderDashboardProps {
  language: Language;
  currentZone: Zone;
}

export const RiderDashboard: React.FC<RiderDashboardProps> = ({
  language,
  currentZone,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [hasIncomingOrder, setHasIncomingOrder] = useState(true);
  const [orderCountdown, setOrderCountdown] = useState(28);
  const [activeJob, setActiveJob] = useState<{
    id: string;
    pickup: string;
    drop: string;
    itemsCount: number;
    payout: number;
    distanceKm: number;
    estMin: number;
    status: 'assigned' | 'picked_up' | 'arrived' | 'delivered';
    otp: string;
  } | null>({
    id: 'SVZ-9824-NM',
    pickup: 'Dark Store Node #1 (Majrakath, RIICO)',
    drop: 'Plot C-14, Daikin R&D Block 2 (Neemrana)',
    itemsCount: 5,
    payout: 75,
    distanceKm: 2.3,
    estMin: 9,
    status: 'picked_up',
    otp: '7419'
  });

  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    if (hasIncomingOrder && orderCountdown > 0) {
      const timer = setInterval(() => setOrderCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [hasIncomingOrder, orderCountdown]);

  const handleAcceptIncoming = () => {
    setHasIncomingOrder(false);
    setActiveJob({
      id: 'SVZ-4019-NM',
      pickup: 'Sanjeevani Medicos (Highway Flyover)',
      drop: 'Eldeco Eden Park, Tower B Flat 604',
      itemsCount: 3,
      payout: 65,
      distanceKm: 1.8,
      estMin: 8,
      status: 'assigned',
      otp: '4192'
    });
  };

  const handleVerifyOtp = () => {
    if (otpInput.length === 4) {
      setOtpVerified(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setActiveJob(null);
        setOtpVerified(false);
        setOtpInput('');
      }, 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in">
      {/* Top Rider Status Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-500 p-0.5 relative flex items-center justify-center shadow-2xs">
            <Bike className="w-8 h-8 text-emerald-600" />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-1 -right-1" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">Amit Yadav</h1>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                ★ 4.94 (Top Fleet)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Vehicle: <strong className="text-slate-800">Electric EV Scooter (RJ-02-EV-4821)</strong>
            </p>
          </div>
        </div>

        {/* Online / Offline Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              isOnline
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-ping' : 'bg-slate-400'}`} />
            <span>{isOnline ? 'ONLINE & RECEIVING' : 'GO ONLINE'}</span>
          </button>
        </div>
      </div>

      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Today's Earnings</span>
          <p className="text-xl font-black text-emerald-700 mt-1">₹890</p>
          <span className="text-[10px] text-slate-500">8 Orders Delivered</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Surge & Peak Bonus</span>
          <p className="text-xl font-black text-orange-600 mt-1">+₹260</p>
          <span className="text-[10px] text-slate-500">Shift Rush Pay</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Customer Tips</span>
          <p className="text-xl font-black text-emerald-700 mt-1">₹110</p>
          <span className="text-[10px] text-emerald-700 font-semibold">100% credited</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-900 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-semibold block">Evening Target</span>
          <p className="text-sm font-black text-slate-900 mt-1">8 / 12 Trips</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full w-[66%]" />
          </div>
          <span className="text-[9px] text-emerald-700 mt-1 block font-medium">4 more for ₹300 bonus</span>
        </div>
      </div>

      {/* Incoming Order Flash Notification */}
      {isOnline && hasIncomingOrder && (
        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-600 shadow-sm text-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                ⚡ New Order Alert • RIICO Industrial Zone
              </span>
            </div>
            <div className="bg-emerald-50 px-3 py-1 rounded-xl text-xs font-mono font-black text-emerald-800 border border-emerald-200">
              00:{orderCountdown < 10 ? `0${orderCountdown}` : orderCountdown}s
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900">
                Pickup: <span className="text-emerald-800">Sanjeevani Medicos & Pharmacy</span>
              </p>
              <p className="text-xs font-bold text-slate-900">
                Drop: <span className="text-slate-800">Eldeco Eden Park, Flat 604</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Distance: 1.8 km • Est. 8 mins • 3 Medical items
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block">Trip Payout</span>
              <span className="text-2xl font-black text-slate-900">
                ₹65
              </span>
              <span className="text-[9px] text-emerald-700 block font-semibold">+₹15 Peak Surge Incl.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHasIncomingOrder(false)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={handleAcceptIncoming}
              className="flex-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-black shadow-2xs transition-all cursor-pointer"
            >
              ACCEPT ORDER (⚡ ₹65)
            </button>
          </div>
        </div>
      )}

      {/* Current Active Trip Route Navigator */}
      {activeJob && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-slate-900 space-y-4">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">
                Active Trip: #{activeJob.id}
              </span>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
              ⚡ IN PROGRESS
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Step Route */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold mt-0.5">
                  1
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">PICKUP LOCATION</span>
                  <p className="font-bold text-slate-900">{activeJob.pickup}</p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-200 ml-3" />

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center text-[10px] font-bold mt-0.5">
                  2
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 uppercase font-semibold">CUSTOMER DROP</span>
                  <p className="font-bold text-slate-900">{activeJob.drop}</p>
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Start Turn-by-Turn Map</span>
              </button>
              <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Customer</span>
              </button>
            </div>

            {/* Proof of Delivery OTP Input */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900">Complete Delivery (Proof of Delivery)</span>
                  <p className="text-[10px] text-slate-500">
                    Ask the customer for the 4-digit handover OTP ({activeJob.otp})
                  </p>
                </div>
              </div>

              {otpVerified ? (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>OTP Verified! ₹{activeJob.payout} credited to your wallet.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter Customer OTP"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-center text-slate-900 outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-2xs cursor-pointer transition-all"
                  >
                    Confirm Drop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
