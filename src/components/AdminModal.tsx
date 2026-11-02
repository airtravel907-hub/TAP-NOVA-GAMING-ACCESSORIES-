import React, { useState } from 'react';
import {
  X,
  Shield,
  Package,
  Flame,
  ClipboardList,
  Settings,
  BarChart3,
  Check,
  AlertTriangle,
  RotateCcw,
  Edit2,
  Lock,
  Eye,
  LogOut
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ComboDeal, OrderStatus } from '../types/store';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    combos,
    orders,
    settings,
    updateProduct,
    updateCombo,
    updateOrderStatus,
    updateSettings,
    resetToDefaults,
    getComboMaxAvailable
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'combos' | 'orders' | 'reports' | 'settings'>('inventory');

  // Editing product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPasswordHash || 'V7#qN9!tR4@zK8$w')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please check your admin credentials.');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  // Basic sales statistics
  const confirmedOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalRevenue = confirmedOrders.reduce((acc, o) => acc + o.total, 0);
  const totalItemsSold = confirmedOrders.reduce(
    (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  const lowStockProducts = products.filter((p) => p.stock <= 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAdminOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#090C1E] border border-[#1E2648] text-left shadow-2xl transition-all my-8 w-full max-w-4xl p-5 sm:p-8 flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2648] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#742CFF]/20 border border-[#742CFF] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#08D9FF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  TapNova Store Management Portal
                </h3>
                <span className="text-[11px] text-slate-400">
                  Inventory control, combo pricing, WhatsApp routing, and order fulfillment
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#151B38] hover:bg-[#1E2648] border border-[#27325F] text-xs font-semibold transition-colors"
                  title="Lock admin session"
                >
                  <LogOut className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Lock Session</span>
                </button>
              )}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all shadow-[0_0_10px_rgba(244,63,94,0.15)] active:scale-95"
                aria-label="Exit admin portal"
              >
                <X className="w-4 h-4" />
                <span>Exit Portal</span>
              </button>
            </div>
          </div>

          {/* Authentication Screen if not logged in */}
          {!isAuthenticated ? (
            <div className="py-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#151B38] border border-[#27325F] flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-[#742CFF]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Admin Passcode Required</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Enter your administrative key to manage stock quantities, adjust combo offers, and process customer orders.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 text-center"
                    autoFocus
                  />
                  {authError && (
                    <span className="text-[11px] text-rose-400 mt-1.5 block">{authError}</span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#742CFF] to-[#08D9FF] hover:from-[#6524e6] hover:to-[#07c2e6] text-white font-bold text-xs shadow-[0_0_15px_rgba(116,44,255,0.4)] active:scale-95 transition-all"
                  >
                    Authenticate & Enter
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-[#151B38] hover:bg-[#1E2648] text-slate-300 hover:text-white font-semibold text-xs border border-[#27325F] flex items-center justify-center gap-1.5 active:scale-95 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Exit</span>
                  </button>
                </div>
              </form>

              {/* Honest Security Disclaimer */}
              <div className="mt-8 p-3.5 rounded-xl bg-[#080B1C] border border-[#182042] text-left text-[11px] text-slate-400 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300 block mb-0.5">Architecture & Security Note:</strong>
                  <span>
                    This instance currently uses persistent browser LocalStorage. For enterprise multi-admin teams, a secure backend with server-authoritative Firebase Authentication or Cloud SQL should be provisioned to safeguard operational workflows.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden pt-4">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 overflow-x-auto pb-3 border-b border-[#1E2648] shrink-0 text-xs">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'inventory'
                      ? 'bg-[#742CFF] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Products & Stock ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('combos')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'combos'
                      ? 'bg-[#742CFF] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Combos & Deals ({combos.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'bg-[#742CFF] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Orders Log ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'reports'
                      ? 'bg-[#742CFF] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Sales & Health</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-[#742CFF] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-[#151B38]'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Store Settings</span>
                </button>
              </div>

              {/* Tab Contents with Scroll */}
              <div className="flex-1 overflow-y-auto py-4">
                
                {/* 1. Inventory Management */}
                {activeTab === 'inventory' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Click stock buttons to adjust or edit product details:</span>
                      <span className="font-mono text-emerald-400">
                        {products.reduce((acc, p) => acc + p.stock, 0)} Total Units
                      </span>
                    </div>

                    <div className="divide-y divide-[#1E2648] rounded-xl border border-[#1E2648] bg-[#0D1127] overflow-hidden">
                      {products.map((p) => (
                        <div
                          key={p.id}
                          className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#121633] transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {p.image && p.image.trim() !== '' ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover bg-[#070A18] shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-[#070A18] border border-[#1E2648] flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                                Gear
                              </div>
                            )}
                            <div className="min-w-0">
                              <h5 className="font-bold text-white truncate">{p.name}</h5>
                              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                                <span>{p.category}</span>
                                <span>•</span>
                                <span className="font-mono text-[#08D9FF]">
                                  {settings.currency} {p.sellingPrice.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            {/* Stock adjuster */}
                            <div className="flex items-center gap-1.5 bg-[#080B1C] border border-[#1E2648] rounded-lg p-1">
                              <button
                                onClick={() =>
                                  updateProduct({ ...p, stock: Math.max(0, p.stock - 1) })
                                }
                                className="w-6 h-6 rounded bg-[#151B38] text-slate-300 hover:text-white flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span
                                className={`min-w-[28px] text-center font-mono font-bold ${
                                  p.stock <= 0
                                    ? 'text-rose-400'
                                    : p.stock <= 3
                                    ? 'text-amber-400'
                                    : 'text-emerald-400'
                                }`}
                              >
                                {p.stock}
                              </span>
                              <button
                                onClick={() => updateProduct({ ...p, stock: p.stock + 1 })}
                                className="w-6 h-6 rounded bg-[#151B38] text-slate-300 hover:text-white flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>

                            {/* Mark out of stock / in stock */}
                            <button
                              onClick={() =>
                                updateProduct({ ...p, stock: p.stock === 0 ? 5 : 0 })
                              }
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                                p.stock === 0
                                  ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                                  : 'bg-[#151B38] text-slate-400 hover:text-rose-400'
                              }`}
                            >
                              {p.stock === 0 ? 'Out of Stock' : 'Mark OOS'}
                            </button>

                            {/* Edit modal */}
                            <button
                              onClick={() => setEditingProduct({ ...p })}
                              className="p-1.5 rounded-lg bg-[#151B38] text-slate-300 hover:text-white hover:bg-[#742CFF] transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Combos & Deals Management */}
                {activeTab === 'combos' && (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-[#080B1C] border border-[#182042] text-xs text-slate-300 flex items-center justify-between">
                      <span>Deal 5 Free Delivery Promo:</span>
                      <button
                        onClick={() =>
                          updateSettings({
                            ...settings,
                            deal5FreeDeliveryActive: !settings.deal5FreeDeliveryActive
                          })
                        }
                        className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors ${
                          settings.deal5FreeDeliveryActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {settings.deal5FreeDeliveryActive ? 'Active (FREE)' : 'Disabled'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {combos.map((c) => {
                        const available = getComboMaxAvailable(c);
                        return (
                          <div
                            key={c.id}
                            className="p-4 rounded-xl border border-[#1E2648] bg-[#0D1127] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono font-bold text-[#08D9FF]">
                                  DEAL {c.dealNumber}
                                </span>
                                <h5 className="font-bold text-white">{c.name}</h5>
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                Normal: {settings.currency} {c.normalPrice.toLocaleString()} •
                                Combo: {settings.currency} {c.comboPrice.toLocaleString()} •
                                Saves: {settings.currency} {c.savings.toLocaleString()}
                              </div>
                              <div className="text-[11px] font-mono mt-1 text-emerald-400">
                                Component Stock Limit: {available} packs available
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Price change input */}
                              <div className="flex items-center gap-1 text-slate-400">
                                <span>Price:</span>
                                <input
                                  type="number"
                                  value={c.comboPrice}
                                  onChange={(e) => {
                                    const newPrice = Number(e.target.value);
                                    updateCombo({
                                      ...c,
                                      comboPrice: newPrice,
                                      savings: Math.max(0, c.normalPrice - newPrice)
                                    });
                                  }}
                                  className="w-20 bg-[#080B1C] border border-[#1E2648] rounded px-2 py-1 text-white font-mono text-xs"
                                />
                              </div>

                              {/* Toggle enable */}
                              <button
                                onClick={() => updateCombo({ ...c, enabled: !c.enabled })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                  c.enabled
                                    ? 'bg-[#742CFF] text-white'
                                    : 'bg-slate-800 text-slate-500'
                                }`}
                              >
                                {c.enabled ? 'Enabled' : 'Disabled'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Orders Log */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 rounded-xl bg-[#0D1127] border border-[#1E2648]">
                        <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No customer orders recorded yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orders.map((o) => (
                          <div
                            key={o.id}
                            className="p-4 rounded-xl border border-[#1E2648] bg-[#0D1127] space-y-3 text-xs"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#182042] pb-2">
                              <div>
                                <span className="font-mono font-bold text-[#08D9FF] text-sm mr-2">
                                  {o.id}
                                </span>
                                <span className="text-slate-400 text-[11px]">
                                  {new Date(o.createdAt).toLocaleString()}
                                </span>
                              </div>

                              {/* Status Dropdown */}
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400">Status:</span>
                                <select
                                  value={o.status}
                                  onChange={(e) =>
                                    updateOrderStatus(o.id, e.target.value as OrderStatus)
                                  }
                                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                                    o.status === 'Confirmed'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : o.status === 'Dispatched'
                                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                      : o.status === 'Delivered'
                                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                      : o.status === 'Cancelled'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed (Deducts Stock)</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled (Restores Stock)</option>
                                </select>
                              </div>
                            </div>

                            {/* Customer details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                              <div>
                                <strong className="text-white">Customer:</strong> {o.customer.fullName} ({o.customer.phone})
                              </div>
                              <div>
                                <strong className="text-white">Destination:</strong> {o.customer.city}
                              </div>
                              <div className="sm:col-span-2 text-slate-400 text-[11px]">
                                Address: {o.customer.address}
                              </div>
                            </div>

                            {/* Ordered items */}
                            <div className="p-2.5 rounded-lg bg-[#080B1C] border border-[#182042] space-y-1">
                              {o.items.map((i, idx) => (
                                <div key={idx} className="flex justify-between text-slate-300 text-[11px]">
                                  <span>{i.name} x{i.quantity}</span>
                                  <span className="font-mono">{settings.currency} {(i.price * i.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                              <div className="pt-2 border-t border-[#182042] flex justify-between font-bold text-white text-xs">
                                <span>Total Payable (COD):</span>
                                <span className="text-[#08D9FF] font-mono">
                                  {settings.currency} {o.total.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Sales & Inventory Reports */}
                {activeTab === 'reports' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#0D1127] border border-[#1E2648]">
                        <span className="text-slate-400 text-xs block mb-1">Total Confirmed Orders</span>
                        <span className="text-2xl font-black text-white font-mono">
                          {confirmedOrders.length}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1127] border border-[#1E2648]">
                        <span className="text-slate-400 text-xs block mb-1">Total Sales Revenue</span>
                        <span className="text-2xl font-black text-emerald-400 font-mono">
                          {settings.currency} {totalRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0D1127] border border-[#1E2648]">
                        <span className="text-slate-400 text-xs block mb-1">Total Items Ordered</span>
                        <span className="text-2xl font-black text-[#08D9FF] font-mono">
                          {totalItemsSold}
                        </span>
                      </div>
                    </div>

                    {/* Low stock alerts */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Inventory Restock Watchlist (Stock &le; 3)</span>
                      </h4>

                      {lowStockProducts.length === 0 ? (
                        <div className="p-4 rounded-xl bg-[#0D1127] border border-[#1E2648] text-xs text-emerald-400">
                          ✓ All products have healthy warehouse inventory levels.
                        </div>
                      ) : (
                        <div className="divide-y divide-[#1E2648] rounded-xl border border-[#1E2648] bg-[#0D1127] overflow-hidden">
                          {lowStockProducts.map((p) => (
                            <div key={p.id} className="p-3 flex items-center justify-between text-xs">
                              <span className="font-bold text-white">{p.name}</span>
                              <span className="font-mono text-amber-400 font-bold">
                                {p.stock} units remaining
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. Store Settings */}
                {activeTab === 'settings' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          WhatsApp Business Number (digits only, e.g. 923001234567)
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={(e) =>
                            updateSettings({ ...settings, whatsappNumber: e.target.value })
                          }
                          className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          WhatsApp Display Text (e.g. +92 300 1234567)
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappDisplayNumber}
                          onChange={(e) =>
                            updateSettings({
                              ...settings,
                              whatsappDisplayNumber: e.target.value
                            })
                          }
                          className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Standard Delivery Fee ({settings.currency})
                        </label>
                        <input
                          type="number"
                          value={settings.standardDeliveryFee}
                          onChange={(e) =>
                            updateSettings({
                              ...settings,
                              standardDeliveryFee: Number(e.target.value)
                            })
                          }
                          className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Today's Deal Expiry Text (e.g. "Today Only")
                        </label>
                        <input
                          type="text"
                          value={settings.promoExpiryDate}
                          onChange={(e) =>
                            updateSettings({
                              ...settings,
                              promoExpiryDate: e.target.value
                            })
                          }
                          className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Return & Replacement Policy Statement
                      </label>
                      <textarea
                        rows={3}
                        value={settings.returnPolicy}
                        onChange={(e) =>
                          updateSettings({ ...settings, returnPolicy: e.target.value })
                        }
                        className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Admin Security Passcode
                      </label>
                      <input
                        type="text"
                        value={settings.adminPasswordHash || ''}
                        onChange={(e) =>
                          updateSettings({ ...settings, adminPasswordHash: e.target.value })
                        }
                        placeholder="Admin Passcode"
                        className="w-full bg-[#0D1127] border border-[#1E2648] focus:border-[#08D9FF] rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Authentication passcode used to access this Store Management Portal.
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[#1E2648] flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Reset catalog back to verified initial stock numbers:
                      </span>
                      <button
                        onClick={resetToDefaults}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Initial Catalog</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Quick Action Bar */}
              <div className="pt-3 mt-2 border-t border-[#1E2648] flex items-center justify-between shrink-0 text-xs text-slate-400">
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  TapNova Store Management Portal &bull; Active Admin Session
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#151B38] hover:bg-[#1E2648] border border-[#27325F] text-xs font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lock Session</span>
                  </button>
                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all active:scale-95 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Exit Portal</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Edit Product Sub-Modal */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#0A0D1F] border border-[#1E2648] rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1E2648]">
                  <h4 className="text-sm font-bold text-white">Edit Product Details</h4>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      className="w-full bg-[#0D1127] border border-[#1E2648] rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Selling Price (Rs.)</label>
                      <input
                        type="number"
                        value={editingProduct.sellingPrice}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            sellingPrice: Number(e.target.value)
                          })
                        }
                        className="w-full bg-[#0D1127] border border-[#1E2648] rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Available Stock</label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: Number(e.target.value)
                          })
                        }
                        className="w-full bg-[#0D1127] border border-[#1E2648] rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
                      }
                      className="w-full bg-[#0D1127] border border-[#1E2648] rounded-lg p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value
                        })
                      }
                      className="w-full bg-[#0D1127] border border-[#1E2648] rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#1E2648] flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-3 py-1.5 rounded-lg border border-[#1E2648] text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#742CFF] text-white font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
