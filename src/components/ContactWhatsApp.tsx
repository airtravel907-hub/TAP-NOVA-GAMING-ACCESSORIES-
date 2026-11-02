import React, { useState } from 'react';
import { MessageSquare, PhoneCall, Clock, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const [customQuery, setCustomQuery] = useState('');

  const cleanNumber = settings.whatsappNumber.replace(/\D/g, '');
  const isNumberConfigured = cleanNumber.length >= 7;

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNumberConfigured) return;
    const text = customQuery.trim() || 'Hi TapNova team! I have a question about your gaming accessories.';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-ordering" className="py-14 sm:py-20 bg-[#060813] border-b border-[#1E2648]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B38] border border-[#27325F] text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Gamer Helpdesk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-2">
            Contact & WhatsApp Ordering
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have a question about phone compatibility, need custom advice, or ready to submit an order? Connect instantly with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-[#0D1127] border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Official WhatsApp
                  </span>
                  <span className="text-lg font-black text-white font-mono">
                    {settings.whatsappDisplayNumber || `+${cleanNumber}`}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Connect directly for instant stock verification, real-time photo requests of physical stock, and express COD order confirmation.
              </p>

              {isNumberConfigured ? (
                <a
                  href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                    'Hello TapNova! I want to inquire about gaming accessories.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.35)] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp number needs to be configured in Admin Settings.</span>
                </div>
              )}
            </div>

            {/* Operating Hours & Dispatch Details */}
            <div className="p-5 rounded-2xl bg-[#0D1127] border border-[#1E2648] space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#08D9FF] shrink-0" />
                <div>
                  <strong className="text-white block">Support Hours</strong>
                  <span>Monday – Sunday: 10:00 AM – 11:00 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#182042]">
                <CheckCircle className="w-4 h-4 text-[#08D9FF] shrink-0" />
                <div>
                  <strong className="text-white block">Dispatch Schedule</strong>
                  <span>Same-day packing on orders placed before 4:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Quick Direct WhatsApp Message Composer */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1127] border border-[#1E2648]">
              <h3 className="text-lg font-bold text-white font-display mb-1">
                Quick Message to TapNova
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Type any specific request or hardware compatibility question. We'll open WhatsApp with your text ready to send.
              </p>

              <form onSubmit={handleSendCustomMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                    What can we help you with?
                  </label>
                  <textarea
                    rows={4}
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="e.g. Will the semiconductor cooler clip fit iPhone 15 Pro with a case? What are the delivery times to Lahore / Karachi?"
                    className="w-full bg-[#080B1C] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl p-3.5 text-xs text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Quick Prompts */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 block">Quick Questions:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomQuery('Hi TapNova! Will your phone cooler and gaming accessories fit my Android phone model (Samsung/Xiaomi/Infinix/Realme/Vivo)?')}
                      className="text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                    >
                      📱 Check Android Phone Fit
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomQuery('Hi, I want to check compatibility for the Phone Cooler Fan with my phone model.')}
                      className="text-[11px] px-2.5 py-1 rounded bg-[#151B38] hover:bg-[#1E2648] text-slate-300 border border-[#27325F] transition-colors"
                    >
                      Cooler Compatibility?
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomQuery('Hi, is Deal 5 (Ultimate Gaming Combo) available with Free Delivery today?')}
                      className="text-[11px] px-2.5 py-1 rounded bg-[#151B38] hover:bg-[#1E2648] text-slate-300 border border-[#27325F] transition-colors"
                    >
                      Deal 5 Free Delivery?
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomQuery('Hi, do you offer Cash on Delivery to my city?')}
                      className="text-[11px] px-2.5 py-1 rounded bg-[#151B38] hover:bg-[#1E2648] text-slate-300 border border-[#27325F] transition-colors"
                    >
                      Check COD Availability
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isNumberConfigured}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
