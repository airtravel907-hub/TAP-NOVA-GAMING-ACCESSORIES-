/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AndroidCompatibilitySection } from './components/AndroidCompatibilitySection';
import { TodaysDeals } from './components/TodaysDeals';
import { ShopByCategory } from './components/ShopByCategory';
import { AllProducts } from './components/AllProducts';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VerifiedReviews } from './components/VerifiedReviews';
import { FAQ } from './components/FAQ';
import { ContactWhatsApp } from './components/ContactWhatsApp';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { ImageLightbox } from './components/ImageLightbox';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminModal } from './components/AdminModal';
import { AndroidBottomNav } from './components/AndroidBottomNav';
import { AndroidInstallPrompt } from './components/AndroidInstallPrompt';
import { CheckCircle2 } from 'lucide-react';

const NotificationToast: React.FC = () => {
  const { notification } = useStore();
  if (!notification) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0D1127] border border-[#08D9FF] text-white text-xs font-semibold shadow-[0_0_20px_rgba(8,217,255,0.35)]">
        <CheckCircle2 className="w-4 h-4 text-[#08D9FF] shrink-0" />
        <span>{notification}</span>
      </div>
    </div>
  );
};

function MainLayout() {
  const {
    isAdminOpen,
    isCartOpen,
    isCheckoutOpen,
    activeProductModal,
    activeImageModal,
    lastOrder,
    setIsAdminOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActiveProductModal,
    setActiveImageModal,
    setLastOrder
  } = useStore();

  // Android Back Button gesture & hardware handling for all modals
  useEffect(() => {
    const isAnyModalOpen =
      isAdminOpen ||
      isCartOpen ||
      isCheckoutOpen ||
      Boolean(activeProductModal) ||
      Boolean(activeImageModal) ||
      Boolean(lastOrder);

    if (isAnyModalOpen) {
      window.history.pushState({ modal: true }, '');

      const handlePopState = () => {
        if (activeImageModal) {
          setActiveImageModal(null);
        } else if (activeProductModal) {
          setActiveProductModal(null);
        } else if (isCheckoutOpen) {
          setIsCheckoutOpen(false);
        } else if (isCartOpen) {
          setIsCartOpen(false);
        } else if (isAdminOpen) {
          setIsAdminOpen(false);
        } else if (lastOrder) {
          setLastOrder(null);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [
    isAdminOpen,
    isCartOpen,
    isCheckoutOpen,
    activeProductModal,
    activeImageModal,
    lastOrder,
    setIsAdminOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActiveProductModal,
    setActiveImageModal,
    setLastOrder
  ]);

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 flex flex-col selection:bg-[#742CFF] selection:text-white">
      {/* 1. Header and logo */}
      <Header />

      {/* Main Content Sections with bottom padding for mobile Android nav */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 2. Hero section with Shop Now button */}
        <Hero />

        {/* 3. Universal Android Phone Compatibility & Brand Showcase */}
        <AndroidCompatibilitySection />

        {/* 4. Today's Deals */}
        <TodaysDeals />

        {/* 5. Shop by Category */}
        <ShopByCategory />

        {/* 6. All Products */}
        <AllProducts />

        {/* 7. Special Offers / Combo Deals */}
        <SpecialOffers />

        {/* 8. Why Choose TapNova */}
        <WhyChooseUs />

        {/* Verified Gamer Reviews */}
        <VerifiedReviews />

        {/* 9. Frequently Asked Questions */}
        <FAQ />

        {/* 10. Contact and WhatsApp ordering */}
        <ContactWhatsApp />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Android Mobile Navigation & Install Prompt */}
      <AndroidBottomNav />
      <AndroidInstallPrompt />

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
      <ImageLightbox />
      <OrderConfirmationModal />
      <AdminModal />
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

