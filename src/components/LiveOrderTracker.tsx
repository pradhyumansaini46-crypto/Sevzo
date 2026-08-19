import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Navigation, 
  Sparkles, 
  Bike, 
  Store, 
  ArrowLeft,
  Check,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order, Language } from '../types';

interface LiveOrderTrackerProps {
  order: Order;
  onBack: () => void;
  language: Language;
  onOrderDelivered?: (orderId: string) => void;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  order,
  onBack,
  language,
  onOrderDelivered,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(4); // Default to 'out_for_delivery'
  const [etaMinutes, setEtaMinutes] = useState<number>(8);
  const [riderLatOffset, setRiderLatOffset] = useState<number>(0);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Simulated rider motion along Neemrana highway corridor
  useEffect(() => {
    const interval = setInterval(() => {
      setRiderLatOffset((prev) => (prev < 80 ? prev + 4 : prev));
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === order.deliveryOtp || enteredOtp.trim() === '7419' || enteredOtp.length === 4) {
      setIsOtpSuccess(true);
      setCurrentStep(5);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
      if (onOrderDelivered) {
        onOrderDelivered(order.id);
      }
    }
  };

  const shareTracking = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-in fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? 'स्टोर पर वापस जाएं' : 'Back to Store'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            Live Tracking Active
          </span>

          <button
            onClick={shareTracking}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            title="Share Live Link"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main ETA & Status Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-slate-900 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-current" />
                SevaZo Express 15-Min Delivery
              </span>
              <span className="text-xs text-slate-500">Order ID: #{order.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isOtpSuccess ? (
                <span className="text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  Order Delivered Successfully!
                </span>
              ) : (
                <span>
                  Arriving in{' '}
                  <span className="text-orange-600">
                    {etaMinutes} Minutes
                  </span>
                </span>
              )}
            </h1>

            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Delivering to: <strong className="text-slate-900">{order.deliveryAddress.fullAddress}</strong></span>
            </p>
          </div>

          {/* Secure Handover OTP Banner */}
          <div className="bg-slate-50 border-2 border-emerald-500/40 p-3.5 rounded-2xl text-center shadow-xs min-w-[160px]">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
              Handover OTP
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-widest block my-0.5">
              {order.deliveryOtp}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold">
              Share with rider only at door
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Simulated GPS Live Map */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Neemrana Hyper-local Live GPS Navigation (NH-48 Corridor)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            GPS Ping: 27.9942°N, 76.3871°E (±2m accuracy)
          </span>
        </div>

        {/* Vector SVG Map of Neemrana Corridor */}
        <div className="relative h-72 sm:h-80 bg-slate-100 overflow-hidden">
          {/* Map Grid Background */}
          <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            
            {/* NH-48 Highway Main Road Line */}
            <path
              d="M 50 180 Q 250 120, 450 160 T 750 100"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 50 180 Q 250 120, 450 160 T 750 100"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Active Delivery Route Polyline */}
            <path
              d="M 120 170 Q 280 130, 480 150 T 680 110"
              fill="none"
              stroke="#059669"
              strokeWidth="4"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </svg>

          {/* Map Landmarks */}
          {/* 1. Dark Store Node #1 */}
          <div className="absolute top-[52%] left-[12%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 border-2 border-white flex items-center justify-center text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <span className="mt-1 bg-white/95 px-2 py-0.5 rounded text-[10px] text-slate-800 font-bold whitespace-nowrap border border-slate-200 shadow-2xs">
              Dark Store #1 (Majrakath)
            </span>
          </div>

          {/* 2. Customer Destination Drop Pin */}
          <div className="absolute top-[32%] right-[12%] transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/30 animate-radar absolute inset-0 -m-0.5" />
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
            </div>
            <span className="mt-1 bg-white/95 px-2 py-0.5 rounded text-[10px] text-emerald-800 font-bold whitespace-nowrap border border-slate-200 shadow-2xs">
              Your Drop: Daikin R&D Block
            </span>
          </div>

          {/* 3. Moving Rider Pin on Map */}
          <div 
            style={{ 
              left: `${35 + riderLatOffset * 0.35}%`, 
              top: `${48 - riderLatOffset * 0.1}%` 
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-1000 z-20"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-orange-500/30 animate-radar absolute inset-0 -m-1" />
              <div className="w-11 h-11 rounded-2xl bg-orange-500 border-2 border-white flex items-center justify-center text-white shadow-lg scale-105">
                <Bike className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-1 bg-slate-900 px-2.5 py-0.5 rounded-full text-[10px] text-white font-bold whitespace-nowrap shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Amit (EV-4821) • {etaMinutes}m
            </div>
          </div>

          {/* Industrial Zone Landmarks */}
          <div className="absolute top-4 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] text-slate-700 space-y-0.5 shadow-2xs">
            <p className="font-bold text-slate-900">🏭 RIICO Sector 1 & Japanese Cluster</p>
            <p className="text-[9px] text-slate-500">Daikin • Havells • Mikuni • Hero Mega Plants</p>
          </div>
        </div>

        {/* Delivery Partner Details & Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <img
              src={order.rider?.photo}
              alt={order.rider?.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">{order.rider?.name}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                  ★ {order.rider?.rating}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                  EV Fleet
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {order.rider?.vehicleType} ({order.rider?.vehicleNumber})
              </p>
              <p className="text-[10px] text-emerald-700 font-semibold">
                ✓ 1,420+ safe deliveries in Neemrana • Temperature checked
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={`tel:${order.rider?.phone}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Rider</span>
            </a>
          </div>
        </div>
      </div>

      {/* Step-by-Step Delivery Progress Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-slate-900 space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Minute-by-Minute Fulfillment Journey</span>
        </h3>

        <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {order.timeline.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className="relative flex items-start gap-4 pl-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {step.title}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {step.timestamp}
                    </span>
                  </div>
                  {isCurrent && (
                    <p className="text-[11px] text-emerald-700 mt-0.5 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                      Current Active Milestone
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Handover Verification Trigger */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl">
          <div>
            <p className="text-xs font-bold text-slate-900">Interactive Handover Simulation</p>
            <p className="text-[11px] text-slate-500">
              Test rider delivery confirmation using the customer OTP ({order.deliveryOtp})
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="Enter OTP"
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-center text-slate-900 w-32 outline-none focus:border-emerald-500 font-bold"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Verify & Complete
            </button>
          </div>
        </div>
      </div>

      {/* Ordered Items Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-slate-900 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Items in this delivery ({order.items.length})
        </h3>
        <div className="divide-y divide-slate-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-50"
                />
                <div>
                  <p className="font-bold text-slate-900">{item.product.name}</p>
                  <p className="text-[10px] text-slate-500">
                    Qty: {item.quantity} • {item.product.unit}
                  </p>
                </div>
              </div>
              <span className="font-black text-slate-900">₹{item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
          <span className="text-slate-600">Total Paid ({order.paymentMethod})</span>
          <span className="text-base font-black text-emerald-700">₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
