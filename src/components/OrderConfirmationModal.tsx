import React from 'react';
import { CheckCircle2, MessageSquare, X, Package, ExternalLink, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastOrder, setLastOrder, settings } = useStore();

  if (!lastOrder) return null;

  const cleanNumber = settings.whatsappNumber.replace(/\D/g, '');
  const reopenWhatsApp = () => {
    // Re-create the message
    const itemLines = lastOrder.items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${settings.currency} ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message =
      `🎮 *NEW TAPNOVA ORDER — Ref: ${lastOrder.id}*\n` +
      `Play • Gear • Win\n\n` +
      `👤 *CUSTOMER DETAILS:*\n` +
      `• *Name:* ${lastOrder.customer.fullName}\n` +
      `• *Phone:* ${lastOrder.customer.phone}\n` +
      `• *City:* ${lastOrder.customer.city}\n` +
      `• *Delivery Address:* ${lastOrder.customer.address}\n\n` +
      `📦 *ORDERED ITEMS:*\n${itemLines}\n\n` +
      `📊 *FINAL TOTAL: ${settings.currency} ${lastOrder.total.toLocaleString()}*\n` +
      `• Payment Mode: Cash on Delivery (COD)\n\n` +
      `Please confirm my order and share dispatch details! ⚡`;

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setLastOrder(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#0A0D1F] border border-[#1E2648] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 sm:p-8">
          
          <button
            onClick={() => setLastOrder(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2648] transition-colors"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="text-center mb-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-xs font-mono font-bold text-[#08D9FF] bg-[#151B38] px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
              Ref #{lastOrder.id}
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Order Drafted for WhatsApp!
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              We opened WhatsApp with your complete order details.
              <strong className="text-emerald-400 block mt-1">
                Please make sure to tap "Send" in WhatsApp to notify our dispatch team!
              </strong>
            </p>
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-xl bg-[#080B1C] border border-[#182042] space-y-3 mb-6 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#182042]">
              <span className="text-slate-400">Recipient:</span>
              <span className="text-white font-semibold">{lastOrder.customer.fullName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#182042]">
              <span className="text-slate-400">Delivery To:</span>
              <span className="text-white font-semibold truncate max-w-[200px] text-right">
                {lastOrder.customer.city}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#182042]">
              <span className="text-slate-400">Total Payable (COD):</span>
              <span className="font-mono text-white font-bold">
                {settings.currency} {lastOrder.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-amber-400 font-mono font-bold">
                Awaiting WhatsApp Send
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={reopenWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Re-open WhatsApp Chat</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </button>

            <button
              onClick={() => setLastOrder(null)}
              className="w-full py-2.5 px-4 rounded-xl border border-[#1E2648] text-slate-300 hover:text-white text-xs font-semibold"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
