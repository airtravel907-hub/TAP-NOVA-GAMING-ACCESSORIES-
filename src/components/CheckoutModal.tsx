import React, { useState } from 'react';
import { X, MessageSquare, Truck, ShieldCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotals,
    settings,
    placeOrder
  } = useStore();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customer.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (customer.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!customer.city.trim()) newErrors.city = 'City is required.';
    if (!customer.address.trim()) newErrors.address = 'Complete delivery address is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = placeOrder(customer);
    if (result && result.whatsappUrl) {
      // Open WhatsApp in a new tab/app window
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#0A0D1F] border border-[#1E2648] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2648] mb-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#08D9FF] block">
                Cash on Delivery Dispatch
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Complete Your Order
              </h3>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#151B38] hover:bg-[#1E2648] border border-[#27325F] text-xs font-semibold transition-all active:scale-95"
              aria-label="Exit checkout"
            >
              <X className="w-4 h-4" />
              <span>Exit</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Delivery Information Inputs */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Delivery Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="e.g. 0300 1234567"
                    className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="e.g. Lahore, Karachi, Islamabad..."
                  className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                />
                {errors.city && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.city}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={2}
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House / Apartment #, Street, Sector / Area, Landmark..."
                  className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500"
                />
                {errors.address && (
                  <span className="text-[11px] text-rose-400 mt-1 block">{errors.address}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Order Notes (Optional)
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Special instructions for the courier..."
                  className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Order Items Review */}
            <div className="p-4 rounded-xl bg-[#080B1C] border border-[#182042] space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Order Summary ({cartTotals.itemCount} items)
              </h4>

              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-slate-300">
                    <span className="truncate max-w-[65%]">
                      {item.name} <span className="text-slate-500">x{item.quantity}</span>
                    </span>
                    <span className="font-mono text-white">
                      {settings.currency} {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#182042] space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">
                    {settings.currency} {cartTotals.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Charges:</span>
                  <span className="font-mono">
                    {cartTotals.deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE DELIVERY</span>
                    ) : (
                      <span className="text-white">
                        {settings.currency} {cartTotals.deliveryFee.toLocaleString()}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-[#1E2648]">
                  <span>Total Payable:</span>
                  <span className="font-mono text-[#08D9FF]">
                    {settings.currency} {cartTotals.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Note */}
            <div className="p-3.5 rounded-xl bg-[#0D1127] border border-[#1E2648] flex items-start gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Payment Method: Cash on Delivery (COD)</strong>
                <span>Pay in cash directly to the courier upon inspection and safe parcel delivery. No upfront online card transaction required.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#1E2648]">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#1E2648] text-slate-300 hover:text-white text-xs font-semibold"
              >
                Back to Cart
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Send on WhatsApp</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
