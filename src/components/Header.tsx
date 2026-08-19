import React from 'react';
import { 
  Zap, 
  MapPin, 
  ShoppingBag, 
  ShieldCheck, 
  Globe, 
  Store, 
  Bike, 
  LayoutDashboard, 
  User, 
  ChevronDown,
  Search,
  Clock
} from 'lucide-react';
import { Zone, AppRole, Language } from '../types';

interface HeaderProps {
  currentRole: AppRole;
  setCurrentRole: (role: AppRole) => void;
  currentZone: Zone;
  setCurrentZone: (zone: Zone) => void;
  zones: Zone[];
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSecurityModal: () => void;
  activeOrderCount: number;
  onViewActiveOrder: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSignUp: () => void;
  user: { firstName: string; lastName: string; phone: string } | null;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setCurrentRole,
  currentZone,
  setCurrentZone,
  zones,
  language,
  setLanguage,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSecurityModal,
  activeOrderCount,
  onViewActiveOrder,
  searchQuery,
  setSearchQuery,
  onOpenSignUp,
  user,
  onGoHome,
}) => {
  const [zoneDropdownOpen, setZoneDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 text-slate-800 shadow-2xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 px-4 py-1 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-emerald-600 text-white px-2 py-0.2 rounded-full font-bold text-[9px] uppercase tracking-wider">
            10-15 Min Express
          </span>
          <span>{language === 'hi' ? 'नीमराना व साउथ मुंबई सुपरफास्ट डिलीवरी' : 'Superfast 10-15 min express delivery active'}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {/* Portal Switchers */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setCurrentRole('consumer')}
              className={`hover:text-white transition-colors cursor-pointer ${currentRole === 'consumer' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Consumer
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentRole('merchant')}
              className={`hover:text-white transition-colors cursor-pointer ${currentRole === 'merchant' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Merchant
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentRole('rider')}
              className={`hover:text-white transition-colors cursor-pointer ${currentRole === 'rider' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Rider
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentRole('admin')}
              className={`hover:text-white transition-colors cursor-pointer ${currentRole === 'admin' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Ops Hub
            </button>
          </div>

          <span className="hidden md:inline">•</span>

          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer font-semibold"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </div>

      {/* Main Header matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <div 
          onClick={onGoHome}
          id="brand-logo"
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group select-none"
          title="Go to Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-[#239958] flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            SZ
          </div>
          <span className="text-2xl font-black tracking-tight text-[#175231] group-hover:text-emerald-800 transition-colors">
            SevaZo
          </span>
        </div>

        {/* Delivery To Location */}
        <div className="relative shrink-0 hidden sm:block border-l border-slate-200 pl-4">
          <button
            onClick={() => setZoneDropdownOpen(!zoneDropdownOpen)}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                DELIVERY TO
              </span>
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span>{currentZone.name.length > 24 ? currentZone.name.slice(0, 24) + '...' : currentZone.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-y-0.5 transition-transform" />
              </p>
            </div>
          </button>

          {zoneDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">Select Delivery Location</p>
              </div>
              <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                {zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      setCurrentZone(z);
                      setZoneDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentZone.id === z.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{z.name}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">⚡ {z.estimatedDeliveryMin}m</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search "dark chocolate", "milk", "vegetables"...'
              className="w-full bg-[#f1f5f9] hover:bg-[#eaf0f6] focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Actions: Cart & Sign-up / User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            id="cart-button"
            className="flex items-center gap-2 bg-[#239958] hover:bg-[#1e854c] text-white px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {cartCount > 0 ? `${cartCount} Items` : '0 Items'}
            </span>
          </button>

          {user ? (
            <button 
              onClick={onOpenSignUp}
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#239958] text-white flex items-center justify-center text-[10px] font-black">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[70px] truncate">{user.firstName}</span>
            </button>
          ) : (
            <button
              onClick={onOpenSignUp}
              id="signup-button"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>{language === 'hi' ? 'साइन-अप' : 'Sign Up'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
