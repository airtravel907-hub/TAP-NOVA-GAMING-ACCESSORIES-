import React, { useState } from 'react';
import { Smartphone, CheckCircle, ShieldCheck, Flame, Zap, Cpu, Award, SlidersHorizontal } from 'lucide-react';

interface AndroidBrand {
  id: string;
  name: string;
  popularModels: string[];
  tag: string;
  testedGames: string[];
  coolerFit: string;
  audioSpec: string;
  cableCompatibility: string;
  sleeveTouchRating: string;
}

const ANDROID_BRANDS: AndroidBrand[] = [
  {
    id: 'samsung',
    name: 'Samsung Galaxy',
    popularModels: ['S24 / S23 / S22 Ultra', 'A55 / A54 / A34', 'Z Fold & Flip', 'M54 / M34'],
    tag: 'One UI 6 & Game Booster Ready',
    testedGames: ['PUBG Mobile 90FPS', 'Free Fire MAX', 'Call of Duty: Warzone Mobile'],
    coolerFit: 'Verified 100% fit on all Galaxy widths (65–88mm), fits over Armor & Silicone cases.',
    audioSpec: 'Ultra-clear spatial footstep audio with Dolby Atmos on Samsung devices.',
    cableCompatibility: 'Supports Samsung Adaptive Fast Charging & 25W/45W PD fast charging.',
    sleeveTouchRating: 'Sub-millisecond aiming response on Dynamic AMOLED 2X 120Hz displays.'
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / POCO / Redmi',
    popularModels: ['POCO F6 / X6 Pro / X5', 'Redmi Note 13 / 12 Pro', 'Xiaomi 14 / 13T', 'Black Shark 5'],
    tag: 'HyperOS & Game Turbo Certified',
    testedGames: ['PUBG Mobile 90/120FPS', 'Genshin Impact', 'Mobile Legends: Bang Bang'],
    coolerFit: 'Semiconductor Peltier plate drops POCO/Redmi gaming temperature by up to 18°C.',
    audioSpec: '3.5mm low-latency direct connection & Bluetooth 5.3 low-jitter squad voice.',
    cableCompatibility: 'Compatible with Xiaomi 33W/67W/120W HyperCharge Type-C protocols.',
    sleeveTouchRating: 'Eliminates sweaty thumb drag on 120Hz AMOLED & 144Hz DotDisplay screens.'
  },
  {
    id: 'infinix',
    name: 'Infinix & Tecno',
    popularModels: ['Infinix GT 20 Pro / GT 10 Pro', 'Zero 30 / Note 40 Pro', 'Tecno Camon 30 / Pova 6 Neo', 'Spark 20 Pro'],
    tag: 'Gaming Engine & HiOS / XOS Tuned',
    testedGames: ['PUBG Mobile 90FPS', 'Free Fire MAX 120FPS', 'Blood Strike'],
    coolerFit: 'Universal dual-clamp spring mechanism holds tight without pressing power/volume buttons.',
    audioSpec: 'Crisp squad voice communications with zero microphone static or hiss.',
    cableCompatibility: '90-degree right angle connector bypasses charging hand obstruction perfectly.',
    sleeveTouchRating: 'Zero touch friction for ultra-fast claw grip on curved and flat IPS/AMOLED.'
  },
  {
    id: 'realme',
    name: 'Realme & Oppo',
    popularModels: ['Realme GT 6 / GT Neo', 'Realme 12 / 11 Pro', 'Narzo 70 Pro', 'Oppo Reno 12 / 11'],
    tag: 'Realme UI & GT Mode Verified',
    testedGames: ['PUBG Mobile 90FPS', 'COD Mobile', 'BGMI / Apex Mobile'],
    coolerFit: 'Rapid heat dissipation eliminates thermal throttling and screen dimming.',
    audioSpec: 'Balanced bass and high-frequency footstep prioritization.',
    cableCompatibility: 'Fully compatible with Dart Charge & SuperVOOC fast charging.',
    sleeveTouchRating: 'Sweat-proof conductive silver microfibers ensure consistent aiming accuracy.'
  },
  {
    id: 'vivo',
    name: 'Vivo & iQOO',
    popularModels: ['iQOO 12 / Neo 9 Pro / Z9', 'Vivo V30 / V29 Pro', 'Vivo Y200 / T3 Pro'],
    tag: 'Monster Mode & Funtouch OS Approved',
    testedGames: ['PUBG Mobile 90/120FPS', 'CarX Street', 'League of Legends: Wild Rift'],
    coolerFit: 'Magnetic / clamp mount cools SoC area directly behind camera bump.',
    audioSpec: 'Dual mic setup ensures crystal clear teammate discord and in-game callout voice.',
    cableCompatibility: 'Reinforced 15,000+ bend strain relief stands up to aggressive competition.',
    sleeveTouchRating: 'Ultra-thin 0.3mm weave preserves natural thumb tactile touch sensation.'
  },
  {
    id: 'oneplus',
    name: 'OnePlus & ASUS ROG',
    popularModels: ['OnePlus 12 / 11 / 10T / Nord 4', 'ASUS ROG Phone 8 / 7 / 6', 'Nothing Phone (2) / (2a)'],
    tag: 'OxygenOS & Armoury Crate Optimized',
    testedGames: ['COD Mobile 120FPS', 'Warzone Mobile', 'PUBG Mobile 120FPS'],
    coolerFit: 'Engineered for extended tournament sessions with whisper-quiet fan acoustics.',
    audioSpec: 'High-definition spatial acoustic separation for 360-degree footsteps tracking.',
    cableCompatibility: 'Supports Warp Charge, SuperVOOC & USB Power Delivery 3.0.',
    sleeveTouchRating: 'Flawless precision tested on 144Hz & 165Hz LTPO AMOLED screens.'
  }
];

export const AndroidCompatibilitySection: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<AndroidBrand>(ANDROID_BRANDS[0]);
  const [customSearch, setCustomSearch] = useState('');

  const filteredBrands = ANDROID_BRANDS.filter(
    (b) =>
      b.name.toLowerCase().includes(customSearch.toLowerCase()) ||
      b.popularModels.some((m) => m.toLowerCase().includes(customSearch.toLowerCase()))
  );

  return (
    <section id="android-compatibility" className="py-14 sm:py-20 bg-[#080B1C] border-b border-[#1E2648] relative overflow-hidden">
      {/* Cyberpunk subtle background lights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#08D9FF]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Universal Android Compatibility Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-3">
            Engineered to Dominate on All Android Phones
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every TapNova cooling fan, thumb sleeve, audio kit, and charging cable is laboratory-tested across Samsung, Xiaomi, Infinix, Tecno, Realme, Vivo, and OnePlus devices for zero latency, safe clamp ergonomics, and seamless horizontal gaming grip.
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ANDROID_BRANDS.map((brand) => {
            const isSelected = selectedBrand.id === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)] scale-105'
                    : 'bg-[#0D1127] text-slate-300 hover:text-white border-[#1E2648] hover:border-emerald-500/40'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Brand Verified Compatibility Showcase Card */}
        <div className="rounded-2xl bg-[#0A0E24] border border-[#1E2648] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1E2648]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    {selectedBrand.name} Verified Compatibility
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                    {selectedBrand.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Universal hardware calibration tested across all Android screen refresh rates and clamp dimensions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Tested Models:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedBrand.popularModels.map((model, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#151B38] text-white border border-[#27325F] text-[11px] font-mono"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Core Compatibility Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            
            {/* Pillar 1: Thermal Cooler Fit */}
            <div className="p-4 rounded-xl bg-[#0D122D] border border-[#1E2648] space-y-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Cooler Clamp Fit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBrand.coolerFit}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                ✓ 65mm–88mm Spring Clamp
              </span>
            </div>

            {/* Pillar 2: Touch Digitzer Latency */}
            <div className="p-4 rounded-xl bg-[#0D122D] border border-[#1E2648] space-y-2">
              <div className="flex items-center gap-2 text-[#08D9FF]">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Touch Sensitivity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBrand.sleeveTouchRating}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                ✓ 60Hz / 90Hz / 120Hz / 144Hz Tested
              </span>
            </div>

            {/* Pillar 3: Type-C Fast Charging */}
            <div className="p-4 rounded-xl bg-[#0D122D] border border-[#1E2648] space-y-2">
              <div className="flex items-center gap-2 text-[#742CFF]">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Charging Ergonomics</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBrand.cableCompatibility}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                ✓ 90° Right Angle Hand Grip
              </span>
            </div>

            {/* Pillar 4: Spatial Audio & Voice */}
            <div className="p-4 rounded-xl bg-[#0D122D] border border-[#1E2648] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Acoustic Precision</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBrand.audioSpec}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                ✓ 45ms Low Latency Game Audio
              </span>
            </div>

          </div>

          {/* Competitive Games Verified Strip */}
          <div className="mt-6 pt-5 border-t border-[#182042] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Battle-tested in high-FPS tournaments for:</span>
              <div className="flex flex-wrap gap-2">
                {selectedBrand.testedGames.map((game, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#151B38] text-emerald-300 font-semibold text-[11px]"
                  >
                    {game}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#all-products"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2648] hover:bg-[#27325F] text-white font-bold text-xs transition-colors shrink-0"
            >
              <span>Shop Gear for {selectedBrand.name}</span>
              <span>&rarr;</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
