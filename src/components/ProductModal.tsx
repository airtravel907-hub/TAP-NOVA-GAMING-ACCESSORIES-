import React, { useState } from 'react';
import { X, ShoppingCart, MessageSquare, CheckCircle2, ShieldCheck, Eye, Plus, Minus, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    setActiveImageModal,
    addToCart,
    generateDirectWhatsAppUrl,
    settings
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const isOutOfStock = product.stock <= 0;
  const directWhatsAppUrl = generateDirectWhatsAppUrl('product', product.id, quantity);

  const handleAddToCart = () => {
    if (addToCart('product', product.id, quantity)) {
      setActiveProductModal(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setActiveProductModal(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#0A0D1F] border border-[#1E2648] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl p-6 sm:p-8">
          
          {/* Exit Button */}
          <button
            onClick={() => setActiveProductModal(null)}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#151B38] hover:bg-[#1E2648] border border-[#27325F] text-xs font-semibold transition-all active:scale-95 z-10"
            aria-label="Exit product preview"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Image Box */}
            <div className="relative aspect-square rounded-xl bg-[#070A18] overflow-hidden border border-[#1E2648] group">
              {product.image && product.image.trim() !== '' ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                  TapNova Gaming Gear
                </div>
              )}
              {product.image && product.image.trim() !== '' && (
                <button
                  onClick={() => setActiveImageModal(product.image)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#060813]/80 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-[#08D9FF] hover:text-[#060813] transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#08D9FF] block mb-1">
                  {product.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                  {product.name}
                </h3>

                {/* Selling Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {settings.currency} {product.sellingPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">Cash on Delivery</span>
                </div>

                {/* Stock Tag */}
                <div className="mb-4">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold border border-rose-500/20">
                      Out of Stock
                    </span>
                  ) : product.stock <= 3 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
                      Low Stock: Only {product.stock} units available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                      Available Stock: {product.stock} units
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    <Smartphone className="w-3 h-3" />
                    <span>Works On All Android Phones</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Android compatibility mini note */}
                <div className="p-2.5 rounded-xl bg-[#0D122D] border border-emerald-500/20 mb-4 text-[11px] text-emerald-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tested plug & play for Samsung, Xiaomi, POCO, Infinix, Tecno, Realme, Vivo, and OnePlus.</span>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Key Specifications:
                  </span>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#08D9FF] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="pt-4 border-t border-[#1E2648] space-y-4">
                {/* Quantity selector */}
                {!isOutOfStock && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Quantity:</span>
                    <div className="flex items-center gap-3 bg-[#0D1127] border border-[#1E2648] rounded-lg p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-7 h-7 rounded bg-[#151B38] text-slate-300 hover:text-white disabled:opacity-40 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white min-w-[24px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="w-7 h-7 rounded bg-[#151B38] text-slate-300 hover:text-white disabled:opacity-40 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#742CFF] hover:bg-[#8542ff] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(116,44,255,0.4)] transition-all active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {directWhatsAppUrl && !isOutOfStock ? (
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all active:scale-95 text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="py-3 px-4 rounded-xl bg-slate-800 text-slate-600 text-xs font-bold text-center cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#08D9FF]" />
                  <span>7-Day Replacement Warranty • COD Available</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
