import React from 'react';
import { Target, CheckCircle, Truck, RefreshCw, MessageSquare, Shield } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Esports Grade Tested',
      description: 'Every product is handpicked and tested for real in-game ergonomics, touch sensitivity, thermal efficiency, and low audio latency.'
    },
    {
      icon: CheckCircle,
      title: 'Accurate Physical Stock',
      description: 'We do not drop-ship or accept backorders. What you see on our website is physically in our warehouse and ready to pack.'
    },
    {
      icon: MessageSquare,
      title: 'Direct WhatsApp Ordering',
      description: 'No complicated registration portals. Confirm your order directly with human staff via WhatsApp and receive instant live dispatch tracking.'
    },
    {
      icon: Truck,
      title: 'Reliable Cash on Delivery',
      description: 'Inspect your package and pay with peace of mind upon arrival with our trusted nationwide logistics partners.'
    },
    {
      icon: RefreshCw,
      title: '7-Day Replacement Policy',
      description: 'Receive peace of mind with a hassle-free 7-day replacement warranty for any unit with manufacturing defects or transit damage.'
    },
    {
      icon: Shield,
      title: 'Transparent Fair Pricing',
      description: 'We believe in honest gamer-first pricing with no hidden checkout surcharges or inflated markups.'
    }
  ];

  return (
    <section id="why-tapnova" className="py-14 sm:py-20 bg-[#060813] border-b border-[#1E2648]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#08D9FF] block mb-2">
            The TapNova Standard
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-3">
            Why Choose TapNova?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Founded by competitive gamers for gamers. We bridge the gap between high-performance hardware and genuine local customer service.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D1127] border border-[#1E2648] hover:border-[#742CFF]/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#151B38] border border-[#27325F] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#08D9FF]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ordering Steps in 3 Simple Milestones */}
        <div className="mt-14 pt-12 border-t border-[#1E2648]">
          <h3 className="text-xl font-bold text-white text-center font-display mb-8">
            How Simple It Is to Order
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#0B0F23] border border-[#182042] relative">
              <span className="text-2xl font-black text-[#742CFF] font-mono block mb-2">01</span>
              <h4 className="text-sm font-bold text-white mb-1">Select Your Gear</h4>
              <p className="text-xs text-slate-400">
                Pick individual items or grab our Today's Deals combos to save extra. Add to cart or hit Order on WhatsApp.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0B0F23] border border-[#182042] relative">
              <span className="text-2xl font-black text-[#08D9FF] font-mono block mb-2">02</span>
              <h4 className="text-sm font-bold text-white mb-1">Confirm on WhatsApp</h4>
              <p className="text-xs text-slate-400">
                Your cart details, delivery address, and reference code format into a quick message ready to send to our team.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0B0F23] border border-[#182042] relative">
              <span className="text-2xl font-black text-emerald-400 font-mono block mb-2">03</span>
              <h4 className="text-sm font-bold text-white mb-1">Fast Delivery & COD</h4>
              <p className="text-xs text-slate-400">
                We pack and dispatch your parcel with tracking. Pay conveniently via Cash on Delivery when the courier arrives!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
