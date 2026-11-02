import React from 'react';
import { Gift, Zap, ShieldCheck, CheckCircle2, ShoppingCart, MessageSquare, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ComboDeal } from '../types/store';

export const SpecialOffers: React.FC = () => {
  const {
    combos,
    getProduct,
    getComboMaxAvailable,
    addToCart,
    generateDirectWhatsAppUrl,
    settings
  } = useStore();

  return (
    <section id="special-offers" className="py-14 sm:py-20 bg-[#070A1A] border-b border-[#1E2648] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B38] border border-[#27325F] text-[#742CFF] text-xs font-semibold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Value Bundles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-3">
            Special Offers & Combo Deals
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered bundles designed to maximize gaming performance while keeping hard-earned money in your wallet.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo: ComboDeal) => {
            const availableCombos = getComboMaxAvailable(combo);
            const isDeal5 = combo.id === 'combo-5';
            const showFreeDelivery = isDeal5 && settings.deal5FreeDeliveryActive;
            const directWhatsAppUrl = generateDirectWhatsAppUrl('combo', combo.id, 1);

            return (
              <div
                key={combo.id}
                className="rounded-2xl bg-[#0D1127] border border-[#1E2648] p-6 flex flex-col justify-between hover:border-[#742CFF]/60 transition-all duration-300 relative"
              >
                {/* Free delivery badge on Deal 5 */}
                {showFreeDelivery && (
                  <div className="absolute -top-3 left-6 right-6 mx-auto bg-gradient-to-r from-[#08D9FF] to-[#742CFF] text-[#060813] text-[11px] font-black py-1 px-3 rounded-full text-center uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>FREE DELIVERY — TODAY ONLY</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3 pt-2">
                    <span className="text-xs font-mono font-bold text-[#08D9FF] bg-[#151B38] px-2.5 py-1 rounded">
                      DEAL {combo.dealNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      Save {settings.currency} {combo.savings.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-5">
                    {combo.tagline}
                  </p>

                  {/* Components detailed breakdown */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                      Bundle Components:
                    </span>
                    {combo.productIds.map((pid) => {
                      const prod = getProduct(pid);
                      if (!prod) return null;
                      return (
                        <div
                          key={pid}
                          className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#080B1C] border border-[#182042]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#08D9FF] shrink-0" />
                            <span className="text-slate-200 truncate">{prod.name}</span>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                            {settings.currency} {prod.sellingPrice.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price and Stock Summary */}
                <div className="pt-4 border-t border-[#1E2648]">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-500 line-through block font-mono">
                        Normal: {settings.currency} {combo.normalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl font-black text-[#08D9FF] font-mono">
                        {settings.currency} {combo.comboPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Stock Limit</span>
                      {availableCombos > 0 ? (
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {availableCombos} available
                        </span>
                      ) : (
                        <span className="text-xs font-mono font-bold text-rose-400">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart('combo', combo.id, 1)}
                      disabled={availableCombos === 0}
                      className="py-2 px-3 rounded-lg bg-[#742CFF] hover:bg-[#8542ff] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add Bundle</span>
                    </button>

                    {directWhatsAppUrl ? (
                      <a
                        href={directWhatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </a>
                    ) : null}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Combo Promise Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#121633] via-[#0D1127] to-[#121633] border border-[#1E2648] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#742CFF]/20 border border-[#742CFF]/40 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#08D9FF]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                Automated Inventory Sync Guarantee
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Combo packages draw directly from verified physical warehouse items. If any item sells out individually, the combo is automatically capped to protect delivery fulfillment.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#08D9FF]" />
            <span>Zero Backorders • True Stock</span>
          </div>
        </div>

      </div>
    </section>
  );
};
