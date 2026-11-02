import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck, Smartphone } from 'lucide-react';
import heroImage from '../assets/images/hero_tapnova_gaming_1793595759147.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1E2648]">
      {/* Cyberpunk ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#742CFF]/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[250px] bg-[#08D9FF]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline kicker & Android badge */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151B38] border border-[#27325F] text-[#08D9FF] text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#08D9FF]" />
                <span>TapNova • Play • Gear • Win</span>
              </div>
              <a
                href="#android-compatibility"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>100% On All Android Phones</span>
              </a>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-display [text-wrap:balance]">
              Elite Esports Gear For All Android Phones.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              Equip your battlestation with verified high-performance finger sleeves, semiconductor phone coolers, precision earphones, and desk light setups. Calibrated for flawless zero-latency gaming on all Android devices.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#todays-deals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#742CFF] to-[#08D9FF] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(116,44,255,0.45)] hover:shadow-[0_0_35px_rgba(8,217,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>Shop Deals</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#android-compatibility"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 hover:text-white font-semibold text-sm transition-all whitespace-nowrap"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Check Android Phone Fit</span>
              </a>
            </div>

            {/* Trust Markers Strip */}
            <div className="mt-10 pt-8 border-t border-[#1E2648]/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#08D9FF] shrink-0" />
                <span>100% In-Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-medium">All Android Phones</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#08D9FF] shrink-0" />
                <span>COD Nationwide</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#08D9FF] shrink-0" />
                <span>7-Day Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#742CFF]/40 via-[#1E2648] to-[#08D9FF]/30 shadow-[0_0_40px_rgba(116,44,255,0.25)]">
              <div className="relative rounded-xl overflow-hidden bg-[#0A0D1F] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]">
                <img
                  src={heroImage}
                  alt="TapNova Gaming Gear Setup"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-transparent opacity-80" />
                
                {/* Visual badge on photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs backdrop-blur-md bg-[#0A0D1F]/80 p-3 rounded-lg border border-[#1E2648]">
                  <div>
                    <span className="text-[#08D9FF] font-bold block text-sm">TapNova Battle Ready</span>
                    <span className="text-slate-400 text-[11px]">Esports Grade Precision</span>
                  </div>
                  <span className="text-white font-mono font-semibold bg-[#742CFF] px-2.5 py-1 rounded text-xs">
                    New 2026 Batch
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
