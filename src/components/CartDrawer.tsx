import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Zap, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Product, Zone, Language, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  currentZone: Zone;
  language: Language;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  currentZone,
  language,
  onOrderPlaced,
}) => {
  const [isExpress, setIsExpress] = useState(true);
  const [tip, setTip] = useState(20);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountINR: number } | null>({
    code: 'NEEMRANA15',
    discountINR: 15,
  });
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'SevaZo Wallet' | 'Card' | 'COD'>('UPI');
  const [walletBalance, setWalletBalance] = useState(250);
  const [contactName, setContactName] = useState('Rohit Verma');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Plot C-14, Daikin R&D Block 2, RIICO Industrial Zone, Neemrana'
  );
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 199 ? 0 : 25;
  const expressFee = isExpress ? 15 : 0;
  const handlingFee = 4;
  const discount = appliedCoupon ? appliedCoupon.discountINR : 0;
  const totalAmount = Math.max(0, subtotal + deliveryFee + expressFee + handlingFee + tip - discount);

  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'NEEMRANA15') {
      setAppliedCoupon({ code: 'NEEMRANA15', discountINR: 15 });
    } else if (code === 'FACTORY50') {
      if (subtotal >= 300) {
        setAppliedCoupon({ code: 'FACTORY50', discountINR: 50 });
      } else {
        setCouponError('FACTORY50 requires minimum ₹300 order amount');
      }
    } else if (code === 'CAMPUSFREE') {
      setAppliedCoupon({ code: 'CAMPUSFREE', discountINR: 25 });
    } else {
      setCouponError('Invalid promo code. Try NEEMRANA15, FACTORY50 or CAMPUSFREE');
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setIsPlacingOrder(true);

    // Fire joyful confetti celebration!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b35', '#e85d8c', '#8b6fe8', '#10b981'],
    });

    const newOrder: Order = {
      id: `SVZ-${Math.floor(1000 + Math.random() * 9000)}-NM`,
      items: [...cart],
      subtotal,
      deliveryFee,
      handlingFee: handlingFee + expressFee,
      discount,
      tip,
      isExpress,
      totalAmount,
      status: 'confirmed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: `${isExpress ? '10-12' : currentZone.estimatedDeliveryMin} Mins away`,
      deliveryAddress: {
        zone: currentZone.name,
        fullAddress: deliveryAddress,
        contactName,
        contactPhone,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'COD Authorized' : 'Paid',
      deliveryOtp: String(Math.floor(1000 + Math.random() * 9000)),
      rider: {
        id: 'rider-amit-07',
        name: 'Amit Yadav',
        phone: '+91 99887 76655',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        rating: 4.94,
        deliveriesCount: 1420,
        vehicleType: 'Electric EV Scooter (Eco)',
        vehicleNumber: 'RJ-02-EV-4821',
        lat: 27.9942,
        lng: 76.3871,
      },
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed & Verified',
          timestamp: 'Just now',
          completed: true,
        },
        {
          status: 'confirmed',
          title: 'Merchant Accepted Order',
          timestamp: 'Just now',
          completed: true,
        },
        {
          status: 'packing',
          title: 'Packed at Dark Store Node #1 (Majrakath)',
          timestamp: 'In 2 mins',
          completed: false,
        },
        {
          status: 'rider_assigned',
          title: 'Rider Amit Assigned',
          timestamp: 'In 4 mins',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          title: 'In Transit via NH-48',
          timestamp: 'In 7 mins',
          completed: false,
        },
        {
          status: 'delivered',
          title: 'Doorstep Handover with OTP',
          timestamp: `Est. in ${isExpress ? 11 : currentZone.estimatedDeliveryMin} mins`,
          completed: false,
        },
      ],
    };

    setTimeout(() => {
      setIsPlacingOrder(false);
      onOrderPlaced(newOrder);
      onClearCart();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900">
                  {language === 'hi' ? 'आपकी सुपरफास्ट कार्ट' : 'Your 15-Min Basket'}
                </h2>
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {currentZone.name} (⚡ {isExpress ? '10-12m' : `${currentZone.estimatedDeliveryMin}m`})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Your basket is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore fresh groceries, pharmacy essentials, Japanese pantry, and factory supplies delivered in under 15 mins!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Express Priority Delivery Toggle */}
                <div className="bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">Express Priority Slot</span>
                        <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-2xs">
                          ⚡ 10 MINS
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600">
                        Top-queue packing & dedicated EV rider dispatch (+₹15)
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isExpress}
                    onChange={(e) => setIsExpress(e.target.checked)}
                    className="w-5 h-5 accent-orange-600 cursor-pointer"
                  />
                </div>

                {/* Items List */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-2 border-b border-slate-200">
                    <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                    <button
                      onClick={onClearCart}
                      className="text-rose-600 hover:text-rose-700 text-[11px] flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-3 py-1.5 border-b border-slate-200/60 last:border-none"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 bg-white"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {language === 'hi' && item.product.hindiName
                            ? item.product.hindiName
                            : item.product.name}
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          {item.product.unit} • ₹{item.product.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white text-slate-900 rounded-xl border border-slate-200 p-0.5 shadow-2xs">
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item.product)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-lg text-emerald-700 font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-900 w-12 text-right">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address & Contact */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-900 font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Delivery Location
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                      {currentZone.type}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter factory plot / flat no. / hostel room"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500 font-medium"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Receiver Name"
                      className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-emerald-500 font-medium"
                    />
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo Code (e.g. NEEMRANA15)"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 uppercase font-bold outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[10px] text-rose-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      {couponError}
                    </p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[11px] bg-emerald-100/70 border border-emerald-300 text-emerald-800 p-2 rounded-xl">
                      <span className="flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Coupon '{appliedCoupon.code}' Applied (-₹{appliedCoupon.discountINR})
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="text-rose-600 hover:text-rose-800 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Tip Your Rider */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-orange-500" />
                      Tip your delivery hero (Amit)
                    </span>
                    <span className="text-[10px] text-slate-500">100% goes to rider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[10, 20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTip(tip === amount ? 0 : amount)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          tip === amount
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    Select Payment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'UPI'
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('SevaZo Wallet')}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'SevaZo Wallet'
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      <div className="text-left">
                        <span className="block">SevaZo Cash</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">₹{walletBalance}</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'Card'
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span>Card / NetBanking</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        paymentMethod === 'COD'
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {paymentMethod === 'COD' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-[10px] text-emerald-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI Fraud Score 0.04 (Passed). Contactless OTP verification active.</span>
                    </div>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Item Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-emerald-700">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {isExpress && (
                    <div className="flex justify-between text-slate-600">
                      <span>Express Priority Slot (⚡ 10m)</span>
                      <span className="font-semibold text-orange-600">₹{expressFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Handling & Packaging Fee</span>
                    <span className="font-semibold text-slate-900">₹{handlingFee}</span>
                  </div>
                  {tip > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Rider Tip</span>
                      <span className="font-semibold text-slate-900">₹{tip}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-black text-slate-900">To Pay</span>
                    <span className="text-xl font-black text-slate-900">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Dispatching Order to Micro-Hub...</span>
                  </div>
                ) : (
                  <>
                    <span>Place 15-Min Order • ₹{totalAmount}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by SevaZo 100% Quality & Timely Delivery Guarantee</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
