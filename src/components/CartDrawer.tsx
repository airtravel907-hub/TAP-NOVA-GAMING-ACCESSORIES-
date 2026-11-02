import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotals,
    settings,
    setIsCheckoutOpen,
    getProductStock,
    combos,
    getComboMaxAvailable
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0D1F] border-l border-[#1E2648] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1E2648] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#08D9FF]" />
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Your Shopping Cart
              </h2>
              <span className="text-xs font-mono font-bold text-slate-400 bg-[#151B38] px-2 py-0.5 rounded-full">
                {cartTotals.itemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#151B38] hover:bg-[#1E2648] border border-[#27325F] text-xs font-semibold transition-all active:scale-95"
              aria-label="Exit cart drawer"
            >
              <X className="w-4 h-4" />
              <span>Exit</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#151B38] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Explore our Today's Deals or browse gaming accessories to build your ideal setup.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#742CFF] to-[#08D9FF] text-white text-xs font-bold shadow-[0_0_15px_rgba(116,44,255,0.4)]"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery active banner in cart */}
                {cartTotals.isFreeDelivery && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#08D9FF]/20 to-[#742CFF]/20 border border-[#08D9FF]/40 flex items-center gap-2.5 text-xs text-[#08D9FF]">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>
                      <strong>FREE DELIVERY UNLOCKED!</strong> Ultimate Gaming Combo promotion applied.
                    </span>
                  </div>
                )}

                {cart.map((item) => {
                  // Determine max available for quantity bound
                  let maxStock = 99;
                  if (item.type === 'product' && item.productId) {
                    maxStock = getProductStock(item.productId);
                  } else if (item.type === 'combo' && item.comboId) {
                    const combo = combos.find((c) => c.id === item.comboId);
                    if (combo) {
                      maxStock = getComboMaxAvailable(combo);
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#0D1127] border border-[#1E2648] flex gap-3 relative group"
                    >
                      {/* Image */}
                      {item.image && item.image.trim() !== '' ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover bg-[#070A18] shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-[#070A18] border border-[#1E2648] flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                          TapNova
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-mono font-bold text-[#08D9FF] mt-0.5">
                          {settings.currency} {item.price.toLocaleString()}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#182042]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-[#151B38] text-slate-300 hover:text-white flex items-center justify-center text-xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= maxStock}
                              className="w-6 h-6 rounded bg-[#151B38] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[11px] text-slate-400 font-mono">
                            Sub: {settings.currency} {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#1E2648] bg-[#070A18] space-y-3">
              {cartTotals.totalSavings > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Total Bundle Savings:</span>
                  </span>
                  <span className="font-mono font-bold">
                    {settings.currency} {cartTotals.totalSavings.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-mono text-white">
                    {settings.currency} {cartTotals.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges:</span>
                  <span className="font-mono">
                    {cartTotals.deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE DELIVERY</span>
                    ) : (
                      <span className="text-white">
                        {settings.currency} {cartTotals.deliveryFee.toLocaleString()}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-[#1E2648]">
                  <span>Total Payable (COD):</span>
                  <span className="font-mono text-[#08D9FF]">
                    {settings.currency} {cartTotals.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#742CFF] to-[#08D9FF] hover:from-[#8542ff] hover:to-[#22e0ff] text-white font-bold text-sm shadow-[0_0_20px_rgba(116,44,255,0.4)] transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
