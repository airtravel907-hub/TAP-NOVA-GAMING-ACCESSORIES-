import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const { settings } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs: FAQItem[] = [
    {
      question: 'Do TapNova gaming accessories work on all Android phones?',
      answer:
        'Yes, 100%! All our hardware is engineered for universal Android compatibility. The Phone Cooler Fan features an adjustable clamp (65mm to 88mm) that securely fits Samsung Galaxy, Xiaomi, POCO, Infinix, Tecno, Realme, Vivo, and OnePlus devices (even with cases). The 90-degree Type-C cable supports Android fast-charging protocols, and our silver conductive fiber thumb sleeves are tuned for 60Hz, 90Hz, 120Hz, and 144Hz Android touchscreens.'
    },
    {
      question: 'How does WhatsApp ordering work?',
      answer:
        'You can either click "Order on WhatsApp" directly on any individual product or combo deal, or add multiple items to your cart and proceed through checkout. We automatically format your item list, quantities, address, and order reference into a WhatsApp message. Once you click Send in WhatsApp, our team confirms your order and starts packing!'
    },
    {
      question: 'What are the delivery charges and delivery times?',
      answer: `Our standard courier delivery is ${settings.currency} ${settings.standardDeliveryFee} across all major cities and towns. However, if you purchase Deal 5 (Ultimate Gaming Combo) during the active promotion, delivery is 100% FREE! Orders typically arrive within 2 to 4 working days.`
    },
    {
      question: 'Do you offer Cash on Delivery (COD)?',
      answer:
        'Yes! Cash on Delivery (COD) is available nationwide. You only pay when your parcel is physically handed over to you by our delivery courier. We also support direct bank transfer if you prefer paying beforehand.'
    },
    {
      question: 'What is your return & exchange policy?',
      answer:
        settings.returnPolicy ||
        'We offer a 7-day replacement policy on all items with verified manufacturing faults or transit damage. Simply contact us on WhatsApp with a short video of the defect, and we will arrange a fast replacement.'
    },
    {
      question: 'Are product stocks accurate and updated?',
      answer:
        'Yes. All product stock numbers displayed on TapNova represent actual physical warehouse inventory. When an item is sold out, it is immediately marked as "Out of Stock" and cannot be ordered.'
    },
    {
      question: 'Can I purchase combo deals and individual items in the same cart?',
      answer:
        'Absolutely! You can mix and match any combo deals and individual accessories in your shopping cart. All combo discounts and free delivery terms (when applicable) will calculate automatically before checkout.'
    }
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#070A18] border-b border-[#1E2648]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B38] border border-[#27325F] text-[#08D9FF] text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Clear, honest answers about our ordering, shipping, and replacement policies.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0D1127] border border-[#1E2648] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#08D9FF] transition-colors gap-4"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#08D9FF]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#182042]/70 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
