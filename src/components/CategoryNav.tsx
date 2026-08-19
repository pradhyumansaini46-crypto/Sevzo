import React from 'react';
import { 
  ShoppingBag, 
  Pill, 
  UtensilsCrossed, 
  Apple, 
  Cpu, 
  ShieldAlert, 
  Coffee, 
  Wrench, 
  Building2,
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { ProductCategory, Language } from '../types';

interface CategoryNavProps {
  selectedCategory: ProductCategory | 'Home Services' | 'B2B Industrial';
  onSelectCategory: (cat: any) => void;
  language: Language;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  const categories = [
    {
      id: 'All',
      label: 'All Items',
      hindiLabel: 'सभी वस्तुएं',
      icon: LayoutGrid,
      color: 'from-purple-500 to-indigo-600',
      badge: '⚡ <15m'
    },
    {
      id: 'Grocery & Kitchen',
      label: 'Grocery & Dairy',
      hindiLabel: 'राशन व डेयरी',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-600',
      badge: 'Fresh'
    },
    {
      id: '10-Min Pharmacy',
      label: '10-Min Pharmacy',
      hindiLabel: '10-मिनट फार्मेसी',
      icon: Pill,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Drug Lic.'
    },
    {
      id: 'Japanese & Expat Pantry',
      label: 'Japanese Zone Pantry',
      hindiLabel: 'जापानी व विदेशी पैंट्री',
      icon: UtensilsCrossed,
      color: 'from-rose-500 to-pink-600',
      badge: 'JETRO Spec.'
    },
    {
      id: 'Fresh Fruits & Veggies',
      label: 'Fresh Veggies & Fruits',
      hindiLabel: 'ताज़ा सब्जियां व फल',
      icon: Apple,
      color: 'from-green-500 to-emerald-600',
      badge: 'Farm Direct'
    },
    {
      id: 'Industrial & Safety Supplies',
      label: 'Industrial & Safety',
      hindiLabel: 'औद्योगिक व सेफ्टी',
      icon: ShieldAlert,
      color: 'from-orange-500 to-amber-700',
      badge: 'RIICO B2B'
    },
    {
      id: 'Electronics & Cables',
      label: 'Electronics & Cables',
      hindiLabel: 'इलेक्ट्रॉनिक्स व केबल',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-600',
      badge: 'Fast Tech'
    },
    {
      id: 'Snacks & Beverages',
      label: 'Snacks & Drinks',
      hindiLabel: 'स्नैक्स व कोल्ड ड्रिंक्स',
      icon: Coffee,
      color: 'from-red-500 to-amber-600',
      badge: 'Late Night'
    },
    {
      id: 'Home Services',
      label: 'Home & AC Services',
      hindiLabel: 'घर व एसी रिपेयर सेवा',
      icon: Wrench,
      color: 'from-violet-500 to-purple-700',
      badge: 'Verified Pros'
    },
    {
      id: 'B2B Industrial',
      label: 'Factory Bulk Supply',
      hindiLabel: 'फैक्ट्री बल्क सप्लाय',
      icon: Building2,
      color: 'from-slate-600 to-zinc-800',
      badge: 'GST Invoicing'
    }
  ];

  return (
    <div className="w-full py-2">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">
                  {language === 'hi' ? cat.hindiLabel : cat.label}
                </p>
                {cat.badge && (
                  <span
                    className={`text-[9px] font-semibold leading-none ${
                      isSelected ? 'text-emerald-300' : 'text-emerald-600'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
