/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  MapPin, 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Store, 
  Building2, 
  Wrench, 
  Flame, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { Header } from './components/Header';
import { SmartSearchBar } from './components/SmartSearchBar';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { HomeServicesView } from './components/HomeServicesView';
import { B2BIndustrialView } from './components/B2BIndustrialView';
import { MerchantDashboard } from './components/MerchantDashboard';
import { RiderDashboard } from './components/RiderDashboard';
import { AdminOpsHub } from './components/AdminOpsHub';
import { SecurityComplianceModal } from './components/SecurityComplianceModal';
import { AuthModal } from './components/AuthModal';

import { NEEMRANA_ZONES, PRODUCTS, INITIAL_DEMO_ORDER } from './data/mockData';
import { 
  AppRole, 
  Language, 
  Zone, 
  Product, 
  CartItem, 
  Order, 
  ProductCategory 
} from './types';

export default function App() {
  const [currentRole, setCurrentRole] = useState<AppRole>('consumer');
  const [language, setLanguage] = useState<Language>('en');
  const [currentZone, setCurrentZone] = useState<Zone>(NEEMRANA_ZONES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Home Services' | 'B2B Industrial'>('All');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 2 }, // 2x Amul Milk
    { product: PRODUCTS[4], quantity: 1 }  // 1x Dolo 650
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active Live Order for Demo tracking
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_DEMO_ORDER);
  const [isViewingActiveOrder, setIsViewingActiveOrder] = useState(false);

  // Security Modal
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // Auth / Sign-Up state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string; phone: string } | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.quantity, 0), [cart]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.hindiName && product.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' ||
        selectedCategory === 'Home Services' ||
        selectedCategory === 'B2B Industrial' ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (cat: any) => {
    setSelectedCategory(cat);
    if (isViewingActiveOrder) {
      setIsViewingActiveOrder(false);
    }
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setActiveOrder(newOrder);
    setIsViewingActiveOrder(true);
  };

  const handleOrderDelivered = (orderId: string) => {
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder({
        ...activeOrder,
        status: 'delivered',
        timeline: activeOrder.timeline.map(t => ({ ...t, completed: true }))
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Universal Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          setIsViewingActiveOrder(false);
        }}
        currentZone={currentZone}
        setCurrentZone={setCurrentZone}
        zones={NEEMRANA_ZONES}
        language={language}
        setLanguage={setLanguage}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        activeOrderCount={activeOrder && activeOrder.status !== 'delivered' ? 1 : 0}
        onViewActiveOrder={() => setIsViewingActiveOrder(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSignUp={() => setIsAuthModalOpen(true)}
        user={currentUser}
        onGoHome={() => {
          setCurrentRole('consumer');
          setSelectedCategory('All');
          setSearchQuery('');
          setIsViewingActiveOrder(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* ROLE 1: CONSUMER APP */}
        {currentRole === 'consumer' && (
          <>
            {isViewingActiveOrder && activeOrder ? (
              <LiveOrderTracker
                order={activeOrder}
                onBack={() => setIsViewingActiveOrder(false)}
                language={language}
                onOrderDelivered={handleOrderDelivered}
              />
            ) : selectedCategory === 'Home Services' ? (
              <HomeServicesView
                language={language}
                currentZone={currentZone}
              />
            ) : selectedCategory === 'B2B Industrial' ? (
              <B2BIndustrialView
                onAddToCart={handleAddToCart}
                language={language}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar Column: Categories & SevaZo Plus */}
                <aside className="lg:col-span-3 space-y-6">
                  {/* Categories List */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">
                      Categories
                    </h2>

                    <nav className="flex flex-col gap-1">
                      {[
                        { id: 'Fresh Vegetables', label: 'Fresh Vegetables' },
                        { id: 'Grocery & Dairy', label: 'Dairy & Bread' },
                        { id: 'Snacks & Beverages', label: 'Instant Food' },
                        { id: '10-Min Pharmacy', label: 'Personal Care & Pharmacy' },
                        { id: 'Household Items', label: 'Household Items' },
                        { id: 'Japanese & Expat Pantry', label: 'Japanese & Expat Pantry' },
                        { id: 'Home Services', label: 'Home Services' },
                        { id: 'B2B Industrial', label: 'B2B Industrial' },
                        { id: 'All', label: 'All Items' }
                      ].map((cat) => {
                        const isActive = 
                          (cat.id === 'Fresh Vegetables' && selectedCategory === 'Fresh Vegetables') ||
                          (cat.id === selectedCategory) ||
                          (cat.id === 'Fresh Vegetables' && selectedCategory === 'All');

                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              if (cat.id === 'Fresh Vegetables') {
                                setSelectedCategory('Fresh Vegetables' as any);
                              } else {
                                setSelectedCategory(cat.id as any);
                              }
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#e6f8ee] text-[#1b7a43] shadow-2xs'
                                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <span>{cat.label}</span>
                            {isActive && <ChevronRight className="w-4 h-4 text-[#1b7a43]" />}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* SevaZo Plus Banner Card */}
                  <div className="bg-gradient-to-br from-[#4338ca] via-[#3b49df] to-[#2563eb] text-white p-5 rounded-3xl shadow-sm space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200 block">
                      SEVAZO PLUS
                    </span>
                    <h3 className="text-base sm:text-lg font-black leading-tight">
                      Zero Delivery on all orders
                    </h3>
                    <p className="text-[11px] text-indigo-100/90 pt-1">
                      Enjoy unlimited free 10-min deliveries across all Neemrana & South Mumbai micro-zones.
                    </p>
                  </div>
                </aside>

                {/* Right Main Content Area */}
                <section className="lg:col-span-9 space-y-8">
                  {/* Big Emerald Green Hero Banner */}
                  <div className="bg-gradient-to-r from-[#20a160] via-[#24a967] to-[#2cb974] rounded-[2rem] p-6 sm:p-10 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-3 z-10 max-w-md">
                      <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 backdrop-blur-xs">
                        10 MIN GUARANTEE
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        Groceries at your doorstep in minutes.
                      </h1>
                      <p className="text-xs sm:text-sm text-white/90 font-medium">
                        SevaZo is now serving in South Mumbai & Neemrana Hub.
                      </p>
                    </div>

                    {/* Right Graphic Box / Illustration */}
                    <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center p-4 shrink-0 shadow-inner">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-[#a3f0c4]/40 flex items-center justify-center border-2 border-white/40">
                        <ShoppingBag className="w-12 h-12 text-white fill-white/20" />
                      </div>
                    </div>
                  </div>

                  {/* Trending Now Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        Trending Now
                      </h2>
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="text-xs sm:text-sm font-bold text-[#20a160] hover:text-[#187c4a] hover:underline cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredProducts.slice(0, 12).map((product) => {
                        const itemInCart = cart.find((i) => i.product.id === product.id);
                        const qty = itemInCart ? itemInCart.quantity : 0;

                        return (
                          <ProductCard
                            key={product.id}
                            product={product}
                            quantity={qty}
                            onAddToCart={handleAddToCart}
                            onRemoveFromCart={handleRemoveFromCart}
                            language={language}
                          />
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </>
        )}

        {/* ROLE 2: MERCHANT DASHBOARD */}
        {currentRole === 'merchant' && (
          <MerchantDashboard language={language} />
        )}

        {/* ROLE 3: RIDER PARTNER APP */}
        {currentRole === 'rider' && (
          <RiderDashboard language={language} currentZone={currentZone} />
        )}

        {/* ROLE 4: ADMIN AI OPS HUB */}
        {currentRole === 'admin' && (
          <AdminOpsHub language={language} zones={NEEMRANA_ZONES} />
        )}
      </main>

      {/* Floating Active Order Widget (Bottom Right) */}
      {activeOrder && activeOrder.status !== 'delivered' && currentRole === 'consumer' && (
        <div 
          onClick={() => setIsViewingActiveOrder(true)}
          className="fixed bottom-5 right-5 z-40 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3.5 flex items-center gap-3 cursor-pointer hover:scale-102 active:scale-98 transition-all max-w-xs animate-in slide-in-from-bottom-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#e6f8ee] text-[#1b7a43] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              ON THE WAY
            </span>
            <p className="text-xs font-black text-slate-800">
              Delivering in 6 mins
            </p>
            {/* Progress Bar */}
            <div className="w-36 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-[#20a160] h-full w-3/4 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Cart Bar for Quick Access */}
      {cartCount > 0 && currentRole === 'consumer' && !isViewingActiveOrder && (
        <div className="fixed bottom-3 left-4 z-40 max-w-xs animate-in slide-in-from-bottom-3 hidden sm:block">
          <div 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#239958] p-3 rounded-2xl shadow-xl text-white flex items-center justify-between gap-3 cursor-pointer hover:bg-[#1e854c] transition-all"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xs">
                {cartCount}
              </div>
              <span className="text-xs font-black">₹{cartTotal}</span>
            </div>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">
              View Cart →
            </span>
          </div>
        </div>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currentZone={currentZone}
        language={language}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Security & Compliance Modal */}
      <SecurityComplianceModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        language={language}
      />

      {/* Sign-Up / Mobile OTP Verification Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(userData) => {
          setCurrentUser(userData);
        }}
        language={language}
      />
    </div>
  );
}
