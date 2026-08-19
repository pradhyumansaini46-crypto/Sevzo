import React, { useState } from 'react';
import { Plus, Minus, Zap, Star, ShieldCheck, Info, Check } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  language: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onAddToCart,
  onRemoveFromCart,
  language,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <>
      <div className="group bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/85 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md relative">
        {/* Top Image Section */}
        <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discountPercent > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                {discountPercent}% OFF
              </span>
            )}
            {product.isRxRequired && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
                Rx Required
              </span>
            )}
          </div>

          {/* Delivery ETA Badge */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
            <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span>{product.deliveryTimeMin}m</span>
          </div>

          {/* Info Quick Peek Button */}
          <button
            onClick={() => setShowDetailModal(true)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-xs backdrop-blur-md transition-colors cursor-pointer"
            title="View Details & Compliance"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
          <div>
            {/* Category / Unit / Diet Indicators */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold text-slate-600 truncate max-w-[130px]">
                {product.unit}
              </span>
              
              {product.isVeg !== undefined && (
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      product.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-[10px] font-medium text-slate-600">
                    {product.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </span>
              )}
            </div>

            {/* Product Title */}
            <h3 
              onClick={() => setShowDetailModal(true)}
              className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
            >
              {language === 'hi' && product.hindiName ? product.hindiName : product.name}
            </h3>

            {/* Merchant / Dark Store node */}
            <p className="text-[10px] text-slate-500 truncate mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {product.merchantName}
            </p>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-black text-slate-900">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-[11px] text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Instant Add or Quantity Modifier */}
            {quantity === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-600 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                {language === 'hi' ? 'जोड़ें' : 'ADD'}
              </button>
            ) : (
              <div className="flex items-center bg-emerald-600 text-white rounded-xl shadow-xs p-0.5 border border-emerald-600">
                <button
                  onClick={() => onRemoveFromCart(product.id)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-black text-xs">
                  {quantity}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-7 h-7 flex items-center justify-center hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail & Compliance Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-900">
            <div className="relative h-56 bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-xs">
                ⚡ {product.deliveryTimeMin} Mins to Doorstep
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                  {product.category} • {product.unit}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  {language === 'hi' && product.hindiName ? product.hindiName : product.name}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Compliance & Regulatory Badges */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified & Sealed Hyper-Local Supply</span>
                </div>
                {product.fssaiLicense && (
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-900">FSSAI Central Food Lic:</strong> {product.fssaiLicense}
                  </p>
                )}
                {product.drugLicense && (
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-900">Raj State Drug License:</strong> {product.drugLicense}
                  </p>
                )}
                {product.gstin && (
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-900">GST B2B Tax Invoice:</strong> {product.gstin}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-500">Total Price:</span>
                  <div className="text-xl font-black text-slate-900">
                    ₹{product.price}{' '}
                    <span className="text-xs text-slate-400 line-through font-normal">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {quantity === 0 ? (
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        setShowDetailModal(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      {language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-emerald-600" />
                      {quantity} in Cart • Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
