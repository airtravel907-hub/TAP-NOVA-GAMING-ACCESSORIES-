import React from 'react';
import { Home, Flame, Smartphone, ShoppingBag, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AndroidBottomNav: React.FC = () => {
  const { cartTotals, setIsCartOpen, settings } = useStore();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060813]/95 backdrop-blur-lg border-t border-[#1E2648] px-2 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.6)]"
      style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
      aria-label="Android Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-[#08D9FF] active:text-[#08D9FF] transition-colors min-w-[56px]"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Deals */}
        <button
          onClick={() => scrollToSection('todays-deals')}
          className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-amber-400 active:text-amber-400 transition-colors min-w-[56px]"
        >
          <Flame className="w-5 h-5 mb-0.5 text-amber-400" />
          <span className="text-[10px] font-medium">Deals</span>
        </button>

        {/* Android Gear */}
        <button
          onClick={() => scrollToSection('android-compatibility')}
          className="flex flex-col items-center justify-center p-1.5 text-emerald-400 hover:text-emerald-300 active:text-emerald-300 transition-colors min-w-[56px]"
        >
          <div className="relative">
            <Smartphone className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold">Android</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-[#742CFF] active:text-[#742CFF] transition-colors min-w-[56px]"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartTotals.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#742CFF] to-[#08D9FF] text-white font-mono text-[9px] font-black px-1.5 py-0.2 rounded-full border border-[#060813] shadow-[0_0_8px_rgba(8,217,255,0.6)]">
                {cartTotals.itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-1.5 text-emerald-400 hover:text-emerald-300 active:text-emerald-300 transition-colors min-w-[56px]"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Support</span>
        </a>

      </div>
    </nav>
  );
};
