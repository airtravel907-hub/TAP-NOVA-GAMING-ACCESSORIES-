export type ProductCategory = 'Mobile Gaming' | 'Audio Gear' | 'Desk Setup' | 'Power & Cables';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sellingPrice: number;
  stock: number;
  image: string;
  description: string;
  features: string[];
  isNewStock?: boolean;
}

export interface ComboDeal {
  id: string;
  dealNumber: number;
  name: string;
  tagline: string;
  productIds: string[];
  normalPrice: number;
  comboPrice: number;
  savings: number;
  freeDelivery: boolean;
  freeDeliveryBadge?: string;
  enabled: boolean;
  expiryDate?: string;
  image?: string;
}

export type CartItemType = 'product' | 'combo';

export interface CartItem {
  id: string; // unique cart entry key
  type: CartItemType;
  productId?: string;
  comboId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  freeDelivery?: boolean;
  includedProductIds: string[];
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string; // e.g. "TN-48201"
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  inventoryDeducted: boolean;
}

export interface StoreSettings {
  whatsappNumber: string; // international digits without + or spaces, e.g. "923001234567"
  whatsappDisplayNumber: string; // e.g. "+92 300 1234567"
  currency: string; // "Rs."
  standardDeliveryFee: number; // e.g. 199
  deal5FreeDeliveryActive: boolean;
  promoExpiryDate: string; // e.g. "Today Only" or specific date
  paymentMethods: string[];
  returnPolicy: string;
  adminPasswordHash: string; // demo security key
}
