import React from 'react';
import { Zap, Shield, MessageSquare, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setIsAdminOpen } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060E] border-t border-[#1E2648] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#742CFF] to-[#08D9FF] p-[2px]">
                <div className="w-full h-full bg-[#060813] rounded-[6px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#08D9FF]" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display">
                Tap<span className="text-[#08D9FF]">Nova</span>
              </span>
            </div>
            <p className="text-[#08D9FF] font-semibold text-xs tracking-wider uppercase">
              Play • Gear • Win
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Esports performance accessories, mobile battle royale triggers, cooling gear, and ambient desk aesthetics.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#todays-deals" className="hover:text-[#08D9FF] transition-colors">
                  Today's Deals
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Shop by Category
                </a>
              </li>
              <li>
                <a href="#all-products" className="hover:text-white transition-colors">
                  All Products Catalog
                </a>
              </li>
              <li>
                <a href="#special-offers" className="hover:text-white transition-colors">
                  Combo Offers
                </a>
              </li>
              <li>
                <a href="#why-tapnova" className="hover:text-white transition-colors">
                  Why TapNova
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Gamer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  7-Day Replacement Policy
                </a>
              </li>
              <li>
                <a href="#contact-ordering" className="hover:text-white transition-colors">
                  Cash on Delivery Terms
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp Direct Helpdesk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Store Assurance & Admin Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Secure Operations
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              All deliveries are verified and fulfilled via Cash on Delivery (COD) or confirmed bank deposit. Zero fraudulent online card charges.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E132B] border border-[#1E2648] hover:border-[#742CFF] text-slate-300 hover:text-white text-xs transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#742CFF]" />
                <span>Store Management Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#151B38] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} TapNova Gaming Accessories Store. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Authentic Gaming Gear</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#08D9FF] flex items-center gap-1 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
