import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ComboDeal,
  CartItem,
  Order,
  StoreSettings,
  CustomerInfo,
  OrderStatus,
  CartItemType
} from '../types/store';
import {
  INITIAL_PRODUCTS,
  INITIAL_COMBOS,
  INITIAL_SETTINGS
} from '../data/initialData';

interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isFreeDelivery: boolean;
  totalSavings: number;
  itemCount: number;
}

interface StoreContextType {
  products: Product[];
  combos: ComboDeal[];
  cart: CartItem[];
  orders: Order[];
  settings: StoreSettings;
  activeProductModal: Product | null;
  activeImageModal: string | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isAdminOpen: boolean;
  lastOrder: Order | null;
  searchTerm: string;
  selectedCategory: string;
  notification: string | null;

  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (cat: string) => void;
  setActiveProductModal: (product: Product | null) => void;
  setActiveImageModal: (url: string | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setLastOrder: (order: Order | null) => void;
  showNotification: (msg: string) => void;

  // Product & Combo Helpers
  getProduct: (id: string) => Product | undefined;
  getProductStock: (id: string) => number;
  getComboMaxAvailable: (combo: ComboDeal) => number;

  // Cart Operations
  addToCart: (type: CartItemType, id: string, quantity?: number) => boolean;
  updateCartQuantity: (cartItemId: string, newQty: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotals: CartTotals;

  // Ordering
  placeOrder: (customer: CustomerInfo) => { order: Order; whatsappUrl: string } | null;
  generateDirectWhatsAppUrl: (type: CartItemType, id: string, qty?: number) => string | null;

  // Admin & Inventory Operations
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateProduct: (product: Product) => void;
  updateCombo: (combo: ComboDeal) => void;
  updateSettings: (newSettings: StoreSettings) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'tapnova_products_v1',
  COMBOS: 'tapnova_combos_v1',
  CART: 'tapnova_cart_v1',
  ORDERS: 'tapnova_orders_v1',
  SETTINGS: 'tapnova_settings_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from LocalStorage or fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [combos, setCombos] = useState<ComboDeal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMBOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading combos from storage', e);
    }
    return INITIAL_COMBOS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading cart from storage', e);
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed reading orders from storage', e);
    }
    return [];
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.adminPasswordHash === 'tapnova2026' || !parsed.adminPasswordHash) {
          parsed.adminPasswordHash = 'V7#qN9!tR4@zK8$w';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading settings from storage', e);
    }
    return INITIAL_SETTINGS;
  });

  // UI state
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
  }, [combos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const getProductStock = (id: string): number => {
    const prod = getProduct(id);
    return prod ? prod.stock : 0;
  };

  // Calculate maximum available combos linked dynamically to individual inventory
  const getComboMaxAvailable = (combo: ComboDeal): number => {
    if (!combo.enabled) return 0;
    if (combo.productIds.length === 0) return 0;
    const stocks = combo.productIds.map((pid) => getProductStock(pid));
    return Math.max(0, Math.min(...stocks));
  };

  // Add item to cart with strict stock boundary validation
  const addToCart = (type: CartItemType, id: string, quantity: number = 1): boolean => {
    if (quantity <= 0) return false;

    if (type === 'product') {
      const prod = getProduct(id);
      if (!prod) {
        showNotification('Product not found');
        return false;
      }
      const existingInCart = cart.find((i) => i.type === 'product' && i.productId === id);
      const currentCartQty = existingInCart ? existingInCart.quantity : 0;

      if (currentCartQty + quantity > prod.stock) {
        showNotification(`Cannot add more than ${prod.stock} units (available stock).`);
        return false;
      }

      if (existingInCart) {
        setCart(
          cart.map((i) =>
            i.id === existingInCart.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        );
      } else {
        const newItem: CartItem = {
          id: `cart-prod-${prod.id}-${Date.now()}`,
          type: 'product',
          productId: prod.id,
          name: prod.name,
          price: prod.sellingPrice,
          quantity: quantity,
          image: prod.image,
          category: prod.category,
          freeDelivery: false,
          includedProductIds: [prod.id]
        };
        setCart([...cart, newItem]);
      }
      showNotification(`Added ${prod.name} to cart.`);
      return true;
    }

    if (type === 'combo') {
      const combo = combos.find((c) => c.id === id);
      if (!combo || !combo.enabled) {
        showNotification('Deal is currently unavailable.');
        return false;
      }
      const maxComboStock = getComboMaxAvailable(combo);
      const existingInCart = cart.find((i) => i.type === 'combo' && i.comboId === id);
      const currentCartQty = existingInCart ? existingInCart.quantity : 0;

      if (currentCartQty + quantity > maxComboStock) {
        showNotification(`Only ${maxComboStock} combo packages available based on component stock.`);
        return false;
      }

      if (existingInCart) {
        setCart(
          cart.map((i) =>
            i.id === existingInCart.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        );
      } else {
        const isFreeDel = combo.id === 'combo-5' && settings.deal5FreeDeliveryActive;
        const newItem: CartItem = {
          id: `cart-combo-${combo.id}-${Date.now()}`,
          type: 'combo',
          comboId: combo.id,
          name: combo.name,
          price: combo.comboPrice,
          quantity: quantity,
          image: combo.image || '/src/assets/images/hero_tapnova_gaming_1793595759147.jpg',
          freeDelivery: isFreeDel,
          includedProductIds: [...combo.productIds]
        };
        setCart([...cart, newItem]);
      }
      showNotification(`Added ${combo.name} to cart.`);
      return true;
    }

    return false;
  };

  // Update quantity in cart with stock validation
  const updateCartQuantity = (cartItemId: string, newQty: number): boolean => {
    const item = cart.find((i) => i.id === cartItemId);
    if (!item) return false;

    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return true;
    }

    if (item.type === 'product' && item.productId) {
      const prod = getProduct(item.productId);
      if (!prod) return false;
      if (newQty > prod.stock) {
        showNotification(`Maximum available stock is ${prod.stock}.`);
        return false;
      }
    } else if (item.type === 'combo' && item.comboId) {
      const combo = combos.find((c) => c.id === item.comboId);
      if (!combo) return false;
      const maxComboStock = getComboMaxAvailable(combo);
      if (newQty > maxComboStock) {
        showNotification(`Maximum available combo stock is ${maxComboStock}.`);
        return false;
      }
    }

    setCart(cart.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i)));
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter((i) => i.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate totals
  const cartTotals: CartTotals = React.useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Free delivery applies strictly if Deal 5 is in the cart and active
    const hasDeal5 = cart.some(
      (item) => item.type === 'combo' && item.comboId === 'combo-5' && settings.deal5FreeDeliveryActive
    );

    const isFreeDelivery = cart.length > 0 && hasDeal5;
    const deliveryFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : settings.standardDeliveryFee;
    const total = subtotal + deliveryFee;

    // Calculate total savings customer receives
    let totalSavings = 0;
    cart.forEach((item) => {
      if (item.type === 'combo' && item.comboId) {
        const combo = combos.find((c) => c.id === item.comboId);
        if (combo) {
          totalSavings += combo.savings * item.quantity;
        }
      }
    });
    if (isFreeDelivery) {
      totalSavings += settings.standardDeliveryFee;
    }

    return {
      subtotal,
      deliveryFee,
      total,
      isFreeDelivery,
      totalSavings,
      itemCount
    };
  }, [cart, combos, settings]);

  // Generate direct WhatsApp link for single item or combo order
  const generateDirectWhatsAppUrl = (
    type: CartItemType,
    id: string,
    qty: number = 1
  ): string | null => {
    const cleanNumber = settings.whatsappNumber.replace(/\D/g, '');
    if (!cleanNumber) return null;

    let itemName = '';
    let itemPrice = 0;
    let savingsText = '';
    let freeDelNote = '';

    if (type === 'product') {
      const prod = getProduct(id);
      if (!prod) return null;
      itemName = prod.name;
      itemPrice = prod.sellingPrice * qty;
    } else {
      const combo = combos.find((c) => c.id === id);
      if (!combo) return null;
      itemName = `${combo.name} (Combo Deal #${combo.dealNumber})`;
      itemPrice = combo.comboPrice * qty;
      savingsText = `\n🎁 *Bundle Savings:* ${settings.currency} ${(combo.savings * qty).toLocaleString()}`;
      if (combo.id === 'combo-5' && settings.deal5FreeDeliveryActive) {
        freeDelNote = '\n🚚 *Special Promo:* FREE DELIVERY Included!';
      }
    }

    const delivery =
      type === 'combo' && id === 'combo-5' && settings.deal5FreeDeliveryActive
        ? 0
        : settings.standardDeliveryFee;
    const finalTotal = itemPrice + delivery;

    const message = `⚡ *TAPNOVA GAMING STORE — DIRECT ORDER* ⚡\n\n` +
      `Hey TapNova! I would like to order this item immediately:\n\n` +
      `📦 *Item:* ${itemName}\n` +
      `🔢 *Quantity:* ${qty}\n` +
      `💵 *Price:* ${settings.currency} ${itemPrice.toLocaleString()}` +
      savingsText +
      `\n🚚 *Delivery:* ${delivery === 0 ? 'FREE DELIVERY' : `${settings.currency} ${delivery}`}` +
      freeDelNote +
      `\n\n💰 *Total Amount:* ${settings.currency} ${finalTotal.toLocaleString()}\n` +
      `💳 *Payment Method:* Cash on Delivery (COD)\n\n` +
      `Please provide your delivery details below to finalize:\n` +
      `• *Full Name:*\n` +
      `• *Phone Number:*\n` +
      `• *City:*\n` +
      `• *Complete Delivery Address:*\n\n` +
      `Looking forward to your confirmation!`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  // Place order from cart & produce WhatsApp URL
  const placeOrder = (
    customer: CustomerInfo
  ): { order: Order; whatsappUrl: string } | null => {
    if (cart.length === 0) {
      showNotification('Your cart is empty.');
      return null;
    }

    const cleanNumber = settings.whatsappNumber.replace(/\D/g, '');
    if (!cleanNumber) {
      showNotification('WhatsApp number is not configured in Store Settings.');
      return null;
    }

    // Generate unique order reference TN-XXXXX
    const orderId = `TN-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal: cartTotals.subtotal,
      discount: cartTotals.totalSavings,
      deliveryFee: cartTotals.deliveryFee,
      total: cartTotals.total,
      status: 'Pending',
      inventoryDeducted: false
    };

    // Format item lines for WhatsApp message
    const itemLines = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${settings.currency} ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const promoNote = cartTotals.isFreeDelivery
      ? '\n🎉 *FREE DELIVERY APPLIED (Ultimate Gaming Combo Promo)*'
      : '';

    const message =
      `🎮 *NEW TAPNOVA ORDER — Ref: ${orderId}*\n` +
      `Play • Gear • Win\n\n` +
      `👤 *CUSTOMER DETAILS:*\n` +
      `• *Name:* ${customer.fullName.trim()}\n` +
      `• *Phone:* ${customer.phone.trim()}\n` +
      `• *City:* ${customer.city.trim()}\n` +
      `• *Delivery Address:* ${customer.address.trim()}\n` +
      (customer.notes?.trim() ? `• *Order Notes:* ${customer.notes.trim()}\n` : '') +
      `\n📦 *ORDERED ITEMS:*\n${itemLines}\n\n` +
      `📊 *ORDER SUMMARY:*\n` +
      `• Subtotal: ${settings.currency} ${cartTotals.subtotal.toLocaleString()}\n` +
      `• Delivery Fee: ${
        cartTotals.deliveryFee === 0
          ? 'FREE'
          : `${settings.currency} ${cartTotals.deliveryFee}`
      }` +
      promoNote +
      `\n• *FINAL TOTAL: ${settings.currency} ${cartTotals.total.toLocaleString()}*\n` +
      `• Payment Mode: Cash on Delivery (COD)\n\n` +
      `⚡ *Note:* Please review and confirm this order to initiate fast packing and dispatch!`;

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Add to orders log
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);

    return { order: newOrder, whatsappUrl };
  };

  // Inventory sync on status update:
  // - Pending -> Confirmed: deduct individual components
  // - Confirmed -> Cancelled: restore components
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) => {
      const order = prevOrders.find((o) => o.id === orderId);
      if (!order) return prevOrders;

      const oldStatus = order.status;
      if (oldStatus === newStatus) return prevOrders;

      let newInventoryDeducted = order.inventoryDeducted;

      // Check if we need to deduct stock
      if (newStatus === 'Confirmed' && !order.inventoryDeducted) {
        // Deduct inventory
        setProducts((prevProducts) => {
          const updated = [...prevProducts];
          order.items.forEach((item) => {
            item.includedProductIds.forEach((pid) => {
              const idx = updated.findIndex((p) => p.id === pid);
              if (idx !== -1) {
                updated[idx] = {
                  ...updated[idx],
                  stock: Math.max(0, updated[idx].stock - item.quantity)
                };
              }
            });
          });
          return updated;
        });
        newInventoryDeducted = true;
      }

      // Check if order was cancelled after being confirmed
      if (newStatus === 'Cancelled' && order.inventoryDeducted) {
        // Restore inventory safely
        setProducts((prevProducts) => {
          const updated = [...prevProducts];
          order.items.forEach((item) => {
            item.includedProductIds.forEach((pid) => {
              const idx = updated.findIndex((p) => p.id === pid);
              if (idx !== -1) {
                updated[idx] = {
                  ...updated[idx],
                  stock: updated[idx].stock + item.quantity
                };
              }
            });
          });
          return updated;
        });
        newInventoryDeducted = false;
      }

      return prevOrders.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, inventoryDeducted: newInventoryDeducted }
          : o
      );
    });

    showNotification(`Order ${orderId} updated to ${newStatus}.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showNotification(`Updated ${updated.name}.`);
  };

  const updateCombo = (updated: ComboDeal) => {
    setCombos((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showNotification(`Updated ${updated.name}.`);
  };

  const updateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    showNotification('Store configuration saved successfully.');
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCombos(INITIAL_COMBOS);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.COMBOS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    showNotification('Restored TapNova defaults and verified stock quantities.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        combos,
        cart,
        orders,
        settings,
        activeProductModal,
        activeImageModal,
        isCartOpen,
        isCheckoutOpen,
        isAdminOpen,
        lastOrder,
        searchTerm,
        selectedCategory,
        notification,

        setSearchTerm,
        setSelectedCategory,
        setActiveProductModal,
        setActiveImageModal,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAdminOpen,
        setLastOrder,
        showNotification,

        getProduct,
        getProductStock,
        getComboMaxAvailable,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotals,

        placeOrder,
        generateDirectWhatsAppUrl,

        updateOrderStatus,
        updateProduct,
        updateCombo,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
