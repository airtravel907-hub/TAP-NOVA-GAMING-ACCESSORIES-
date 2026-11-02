import React from 'react';
import { Flame, ShoppingCart, MessageSquare, Truck, Check, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ComboDeal } from '../types/store';

export const TodaysDeals: React.FC = () => {
  const {
    combos,
    getProduct,
    getComboMaxAvailable,
    addToCart,
    generateDirectWhatsAppUrl,
    settings,
    setActiveImageModal
  } = useStore();

  return (
    <section id="todays-deals" className="py-14 sm:py-20 bg-[#070A18] relative">
      {/* Background neon accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#742CFF]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#08D9FF]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1E2648]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#08D9FF] mb-2">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>TapNova Exclusive Bundles • {settings.promoExpiryDate}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
              Today's Deals
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              Curated gaming pairs engineered to perform together. Instant package discounts with guaranteed component compatibility.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Real-time stock reservation</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {combos.map((combo: ComboDeal) => {
            const availableCombos = getComboMaxAvailable(combo);
            const isDeal5 = combo.id === 'combo-5';
            const showFreeDelivery = isDeal5 && settings.deal5FreeDeliveryActive;
            const directWhatsAppUrl = generateDirectWhatsAppUrl('combo', combo.id, 1);

            return (
              <div
                key={combo.id}
                className={`flex flex-col rounded-2xl bg-[#0D1127] border transition-all duration-300 relative overflow-hidden group ${
                  isDeal5
                    ? 'border-[#08D9FF]/60 shadow-[0_0_30px_rgba(8,217,255,0.2)] md:col-span-2 lg:col-span-1'
                    : 'border-[#1E2648] hover:border-[#742CFF]/60 hover:shadow-[0_0_25px_rgba(116,44,255,0.2)]'
                }`}
              >
                {/* Free delivery badge for Deal 5 strictly */}
                {showFreeDelivery && (
                  <div className="bg-gradient-to-r from-[#08D9FF] to-[#742CFF] text-[#060813] font-black text-xs px-4 py-1.5 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-md">
                    <Truck className="w-3.5 h-3.5" />
                    <span>FREE DELIVERY — TODAY ONLY</span>
                  </div>
                )}

                {/* Top Media / Thumbnail */}
                <div className="relative aspect-[16/10] bg-[#070A18] overflow-hidden">
                  {combo.image && combo.image.trim() !== '' ? (
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#151B38] text-slate-500 text-sm">
                      TapNova Bundle
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1127] via-transparent to-transparent opacity-90" />

                  {/* Quick preview icon */}
                  {combo.image && combo.image.trim() !== '' && (
                    <button
                      onClick={() => setActiveImageModal(combo.image!)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-[#060813]/70 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-[#742CFF] transition-all opacity-0 group-hover:opacity-100"
                      title="Enlarge photo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {/* Deal Number Tag */}
                  <div className="absolute top-3 left-3 bg-[#060813]/85 backdrop-blur-md border border-[#1E2648] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#08D9FF] font-semibold">
                    DEAL {combo.dealNumber}
                  </div>

                  {/* Savings pill */}
                  <div className="absolute bottom-3 right-3 bg-[#742CFF] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-[0_0_12px_rgba(116,44,255,0.6)]">
                    Save {settings.currency} {combo.savings.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#08D9FF] transition-colors font-display mb-1">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {combo.tagline}
                    </p>

                    {/* Breakdown of what's inside */}
                    <div className="p-3 rounded-xl bg-[#080B1C] border border-[#182042] mb-4 space-y-2">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Included in this combo:
                      </span>
                      {combo.productIds.map((pid) => {
                        const prod = getProduct(pid);
                        if (!prod) return null;
                        return (
                          <div
                            key={pid}
                            className="flex items-center justify-between text-xs text-slate-300"
                          >
                            <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                              <Check className="w-3.5 h-3.5 text-[#08D9FF] shrink-0" />
                              <span className="truncate">{prod.name}</span>
                            </span>
                            <span className="text-slate-400 font-mono text-[11px] shrink-0">
                              {settings.currency} {prod.sellingPrice.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Stock indicator */}
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="text-slate-400">Available Combos:</span>
                      {availableCombos > 0 ? (
                        <span className="font-mono font-semibold text-emerald-400">
                          {availableCombos} packs left
                        </span>
                      ) : (
                        <span className="font-mono font-semibold text-rose-400">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-4 border-t border-[#1E2648]">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-slate-500 line-through font-mono block">
                          Normal: {settings.currency} {combo.normalPrice.toLocaleString()}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-black text-[#08D9FF] font-mono">
                            {settings.currency} {combo.comboPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-medium">
                        You Save {settings.currency} {combo.savings.toLocaleString()}
                      </span>
                    </div>

                    {/* Buttons: Add to Cart and Order on WhatsApp */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart('combo', combo.id, 1)}
                        disabled={availableCombos === 0}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#742CFF] hover:bg-[#8542ff] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(116,44,255,0.3)] active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      {directWhatsAppUrl ? (
                        <a
                          href={directWhatsAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 text-center"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      ) : (
                        <button
                          disabled
                          className="py-2.5 px-3 rounded-lg bg-slate-800 text-slate-500 text-xs font-semibold text-center"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
