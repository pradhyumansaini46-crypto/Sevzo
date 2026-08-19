import React, { useState } from 'react';
import { 
  Zap, 
  Wind, 
  Sparkles, 
  Droplets, 
  Wrench, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Check, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOME_SERVICES } from '../data/mockData';
import { HomeService, Language, Zone } from '../types';

interface HomeServicesViewProps {
  language: Language;
  currentZone: Zone;
}

export const HomeServicesView: React.FC<HomeServicesViewProps> = ({
  language,
  currentZone,
}) => {
  const [selectedService, setSelectedService] = useState<HomeService | null>(null);
  const [bookingDate, setBookingDate] = useState('Today (Express within 30 mins)');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('12:00 PM - 02:00 PM');
  const [serviceAddress, setServiceAddress] = useState('Flat 402, Eldeco Eden Park, Neemrana');
  const [contactName, setContactName] = useState('Rohit Verma');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [isBooked, setIsBooked] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Wind':
        return Wind;
      case 'Sparkles':
        return Sparkles;
      case 'Droplets':
        return Droplets;
      case 'Wrench':
      default:
        return Wrench;
    }
  };

  const handleConfirmBooking = () => {
    setIsBooked(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff6b35', '#8b6fe8', '#10b981'],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified & Background Checked Experts
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            On-Demand Home & Industrial Services in{' '}
            <span className="text-emerald-700">
              Neemrana
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From split AC jet-cleaning in Eldeco societies to industrial electrical rewiring in RIICO Phase 1 — booked in 30 seconds with transparent fixed rate cards.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-700">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              ✓ 30-Day Service Warranty
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              ✓ Aadhaar & Police Clearance Verified
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              ✓ Fixed Rate Card, Zero Hidden Charges
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOME_SERVICES.map((service) => {
          const Icon = getServiceIcon(service.icon);

          return (
            <div
              key={service.id}
              className="bg-white hover:bg-slate-50/70 rounded-3xl border border-slate-200 hover:border-emerald-500/60 transition-all p-5 shadow-sm flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-semibold">Starts at</span>
                    <span className="text-xl font-black text-slate-900">₹{service.priceStartingINR}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                      {service.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Arrives in {service.estimatedArrivalMin} mins
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {language === 'hi' ? service.hindiTitle : service.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Service Professional Info */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={service.servicePartner.avatar}
                    alt={service.servicePartner.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {service.servicePartner.name}
                      </h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Police & Aadhaar Verified" />
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {service.servicePartner.jobsDone}+ jobs in Neemrana • ★ {service.servicePartner.rating}
                    </p>
                  </div>
                </div>

                {/* Verified Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {service.verifiedBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Slot CTA */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{service.rating}</span>
                  <span className="text-slate-500 text-[10px]">({service.reviewsCount} reviews)</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedService(service);
                    setIsBooked(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Book Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Slot Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-900">
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  Instant Service Booking
                </span>
                <h3 className="text-base font-black text-slate-900">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {isBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    Service Slot Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {selectedService.servicePartner.name} will reach your location ({serviceAddress}) for <strong className="text-slate-900">{bookingDate} ({bookingTimeSlot})</strong>.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-left max-w-xs mx-auto space-y-1">
                    <p className="text-slate-900 font-bold">Booking Ref: #SRV-{Math.floor(1000 + Math.random() * 9000)}</p>
                    <p className="text-slate-600">Technician Phone: +91 98290 11223</p>
                    <p className="text-emerald-700 font-semibold">Pay ₹{selectedService.priceStartingINR} after service completion</p>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Select Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      Select Service Day
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Today (Express within 30 mins)', 'Tomorrow (Flexible Slot)'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setBookingDate(d)}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                            bookingDate === d
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time Slot */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Select Preferred Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['10 AM - 12 PM', '12 PM - 02 PM', '02 PM - 04 PM', '04 PM - 06 PM', '06 PM - 08 PM', 'Emergency Now'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setBookingTimeSlot(slot)}
                          className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                            bookingTimeSlot === slot
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location & Details */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900">Address & Contact in Neemrana</label>
                    <input
                      type="text"
                      value={serviceAddress}
                      onChange={(e) => setServiceAddress(e.target.value)}
                      placeholder="Society flat / Factory plot no."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Name"
                        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-600 block font-medium">Inspection & Service Base Fee</span>
                      <span className="text-emerald-700 font-semibold text-[10px]">No advance payment needed</span>
                    </div>
                    <span className="text-lg font-black text-slate-900">₹{selectedService.priceStartingINR}</span>
                  </div>

                  {/* Submit CTA */}
                  <button
                    onClick={handleConfirmBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Confirm Booking with {selectedService.servicePartner.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
