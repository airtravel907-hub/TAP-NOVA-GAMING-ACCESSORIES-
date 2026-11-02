import React, { useState } from 'react';
import { ShoppingBag, Zap, Shield, Menu, X, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { cartTotals, setIsCartOpen, setIsAdminOpen, settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2648] bg-[#060813]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#742CFF] to-[#08D9FF] p-[2px] shadow-[0_0_15px_rgba(116,44,255,0.4)]">
              <div className="w-full h-full bg-[#060813] rounded-[6px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#08D9FF] group-hover:rotate-12 transition-transform duration-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Tap<span className="text-[#08D9FF]">Nova</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase -mt-1 hidden sm:block">
                Play • Gear • Win
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#todays-deals"
            className="hover:text-[#08D9FF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#08D9FF]"></span>
            Today's Deals
          </a>
          <a
            href="#android-compatibility"
            className="hover:text-emerald-400 text-emerald-400/90 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Android Gear
          </a>
          <a
            href="#categories"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Categories
          </a>
          <a
            href="#all-products"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            All Products
          </a>
          <a
            href="#special-offers"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Combos
          </a>
          <a
            href="#why-tapnova"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Why TapNova
          </a>
          <a
            href="#reviews"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action & utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick WhatsApp Support trigger */}
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors whitespace-nowrap"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Admin link */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded hover:bg-[#1E2648] transition-colors"
            title="Admin & Inventory Control"
            aria-label="Admin settings"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Primary Action: Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#742CFF] to-[#5a1ecb] hover:from-[#843eff] hover:to-[#6a25ed] text-white font-medium text-xs sm:text-sm shadow-[0_0_15px_rgba(116,44,255,0.4)] transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartTotals.itemCount > 0 ? (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#08D9FF] text-[#060813] font-bold text-xs tabular-nums">
                {cartTotals.itemCount}
              </span>
            ) : (
              <span className="text-slate-300 text-xs hidden sm:inline">(0)</span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#1E2648] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E2648] bg-[#0A0D1F] px-4 pt-3 pb-4 space-y-2">
          <a
            href="#todays-deals"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#08D9FF] hover:bg-[#151B38]"
          >
            🔥 Today's Deals
          </a>
          <a
            href="#android-compatibility"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-emerald-400 hover:bg-[#151B38]"
          >
            📱 All Android Phones Fit
          </a>
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            Shop by Category
          </a>
          <a
            href="#all-products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            All Products
          </a>
          <a
            href="#special-offers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            Special Offers & Combos
          </a>
          <a
            href="#why-tapnova"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            Why Choose TapNova
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            Verified Gamer Reviews
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            FAQ
          </a>
          <a
            href="#contact-ordering"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-[#151B38]"
          >
            WhatsApp Support & Ordering
          </a>
        </div>
      )}
    </header>
  );
};
