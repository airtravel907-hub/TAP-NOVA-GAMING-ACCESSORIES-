import { Product, ComboDeal, StoreSettings } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Mobile Finger Sleeves (Pack of 10)',
    category: 'Mobile Gaming',
    sellingPrice: 599,
    stock: 5,
    image: '/src/assets/images/finger_sleeves_pack_1793595759921.jpg',
    description: 'High-sensitivity silver fiber gaming thumb sleeves designed for sweat-proof friction reduction, ultra-responsive touch feedback, and zero-latency aiming in competitive mobile battle royale games.',
    features: [
      '10 pieces included per pack',
      'Ultra-thin silver conductive microfiber',
      'Zero touch latency and sweat resistant',
      'Universal stretch fit for all thumb sizes',
      'Seamless knitted construction'
    ]
  },
  {
    id: 'prod-2',
    name: 'Mobile Phone Stand',
    category: 'Mobile Gaming',
    sellingPrice: 999,
    stock: 8,
    image: '/src/assets/images/mobile_phone_stand_1793595777650.jpg',
    description: 'Precision dual-hinge alloy phone stand engineered for long gaming sessions and streaming. Features anti-slip silicone pads and cable pass-through slots for simultaneous charging.',
    features: [
      'Dual-axis 270° angle and height adjustment',
      'Heavy weighted anti-slip aluminum base',
      'Reserved charging cable pass-through port',
      'Foldable flat design for easy carrying',
      'Supports devices from 4 to 12.9 inches'
    ]
  },
  {
    id: 'prod-3',
    name: 'Wired Gaming Earphones',
    category: 'Audio Gear',
    sellingPrice: 699,
    stock: 10,
    image: '/src/assets/images/wired_gaming_earphones_1793595778601.jpg',
    description: 'Esports in-ear gaming earphones equipped with a detachable noise-cancelling boom mic and in-line volume wheel. Tuned for crisp spatial audio and pinpoint footstep direction.',
    features: [
      'Dual mic setup: Detachable boom mic + in-line mic',
      'Deep bass chamber with crisp mid/high frequencies',
      'Tangle-resistant reinforced braided cable',
      'Gold-plated 3.5mm low-latency connector',
      'Ergonomic angled silicone ear tips'
    ]
  },
  {
    id: 'prod-4',
    name: 'Cat Gaming Headset',
    category: 'Audio Gear',
    sellingPrice: 2499,
    stock: 10,
    image: '/src/assets/images/cat_gaming_headset_1793595759998.jpg',
    description: 'Aesthetic gaming headset featuring vibrant RGB glowing cat ears, 50mm neodymium audio drivers, and ultra-comfortable plush memory foam earcups for immersive soundscapes.',
    features: [
      'Dynamic RGB glowing cat ears and earcup rings',
      '50mm high-fidelity neodymium dynamic drivers',
      'Flexible omnidirectional noise-reducing microphone',
      'Thick memory foam breathable cushion pads',
      'Universal compatibility: PC, Mobile, and Consoles'
    ]
  },
  {
    id: 'prod-5',
    name: 'Mouse Pad',
    category: 'Desk Setup',
    sellingPrice: 649,
    stock: 5,
    image: '/src/assets/images/gaming_mouse_pad_1793595779664.jpg',
    description: 'Extended gaming desk mat crafted with high-density micro-weave fabric for effortless mouse gliding, reinforced stitched edges, and steady non-slip natural rubber grip base.',
    features: [
      'Micro-woven low-friction cloth surface',
      'Non-slip textured rubber underside',
      'Anti-fray durable perimeter stitching',
      'Water-repellent spill-proof coating',
      'Optimized for optical and laser sensors'
    ]
  },
  {
    id: 'prod-6',
    name: 'Type-C Charging Cable',
    category: 'Power & Cables',
    sellingPrice: 799,
    stock: 10,
    image: '/src/assets/images/typec_charging_cable_1793595780362.jpg',
    description: 'Heavy-duty 90-degree right-angle Type-C fast-charging cord specifically designed so mobile gamers can comfortably hold and grip their device horizontally without cable bend obstruction.',
    features: [
      '90-degree elbow connector for comfortable hand grip',
      'Fast-charge support with smart current regulator',
      'High-density braided nylon protective outer jacket',
      'Subtle glowing cyan LED connection indicator',
      'Reinforced strain relief joint rated for 15,000+ bends'
    ]
  },
  {
    id: 'prod-7',
    name: 'RGB Desk Light',
    category: 'Desk Setup',
    sellingPrice: 2199,
    stock: 10,
    isNewStock: true,
    image: '/src/assets/images/rgb_desk_light_1793595761019.jpg',
    description: 'Atmospheric smart RGB LED desktop light bar with music sync, custom cyber color gradients (neon purple and cyan presets), and multiple dynamic flow modes to elevate your battlestation.',
    features: [
      'Vibrant RGB spectrum with 16+ million colors',
      'TapNova signature purple & cyan neon modes',
      'Built-in sound sensor for dynamic music rhythm sync',
      'Sturdy vertical weighted desk stand',
      'USB-powered with intuitive touch control pad'
    ]
  },
  {
    id: 'prod-8',
    name: 'Phone Cooler Fan',
    category: 'Mobile Gaming',
    sellingPrice: 4699,
    stock: 5,
    image: '/src/assets/images/phone_cooler_fan_1793595761951.jpg',
    description: 'Active semiconductor cooling fan engineered to eliminate phone thermal throttling and frame drops during intense gaming. Features real-time digital temperature screen and magnetic clip attachment.',
    features: [
      'Peltier semiconductor thermoelectric cooling engine',
      'Instant temperature drop to protect battery & FPS',
      'Digital LED real-time temperature readout',
      'RGB luminous cooling fan blades',
      'Whisper-quiet acoustic fan operation'
    ]
  },
  {
    id: 'prod-9',
    name: 'Wireless Earphones',
    category: 'Audio Gear',
    sellingPrice: 1299,
    stock: 5,
    image: '/src/assets/images/wireless_gaming_earbuds_1793595780447.jpg',
    description: 'Ultra-low latency True Wireless gaming earbuds with custom game mode audio tuning, glowing cyberpunk charging case, and ENC dual microphones for crystal-clear squad calls.',
    features: [
      'Ultra-low 45ms gaming audio latency mode',
      'Cyberpunk magnetic case with glowing LED lights',
      'ENC environmental noise cancellation for team voice',
      'Up to 24 hours total battery with charging case',
      'Touch controls for music, calls, and game mode'
    ]
  }
];

export const INITIAL_COMBOS: ComboDeal[] = [
  {
    id: 'combo-1',
    dealNumber: 1,
    name: 'Mobile Gamer Combo',
    tagline: 'The essential competitive pack for high-FPS mobile shooters',
    productIds: ['prod-1', 'prod-3'], // Finger Sleeves + Wired Gaming Earphones
    normalPrice: 1298,
    comboPrice: 1099,
    savings: 199,
    freeDelivery: false,
    enabled: true,
    expiryDate: 'Limited Daily Stock',
    image: '/src/assets/images/finger_sleeves_pack_1793595759921.jpg'
  },
  {
    id: 'combo-2',
    dealNumber: 2,
    name: 'Mobile Gamer Stand Combo',
    tagline: 'Sweat-free control paired with ergonomic desktop positioning',
    productIds: ['prod-1', 'prod-2'], // Finger Sleeves + Mobile Phone Stand
    normalPrice: 1598,
    comboPrice: 1399,
    savings: 199,
    freeDelivery: false,
    enabled: true,
    expiryDate: 'Limited Daily Stock',
    image: '/src/assets/images/mobile_phone_stand_1793595777650.jpg'
  },
  {
    id: 'combo-3',
    dealNumber: 3,
    name: 'Music & Charge Combo',
    tagline: 'Wireless gaming audio combined with angled charging power',
    productIds: ['prod-9', 'prod-6'], // Wireless Earphones + Type-C Cable
    normalPrice: 2098,
    comboPrice: 1899,
    savings: 199,
    freeDelivery: false,
    enabled: true,
    expiryDate: 'Limited Daily Stock',
    image: '/src/assets/images/wireless_gaming_earbuds_1793595780447.jpg'
  },
  {
    id: 'combo-4',
    dealNumber: 4,
    name: 'Gaming Setup Deal',
    tagline: 'Elevate your desk with smooth mouse gliding and ambient neon',
    productIds: ['prod-5', 'prod-7'], // Mouse Pad + RGB Desk Light
    normalPrice: 2848,
    comboPrice: 2599,
    savings: 249,
    freeDelivery: false,
    enabled: true,
    expiryDate: 'Limited Daily Stock',
    image: '/src/assets/images/rgb_desk_light_1793595761019.jpg'
  },
  {
    id: 'combo-5',
    dealNumber: 5,
    name: 'Ultimate Gaming Combo',
    tagline: 'Sub-zero phone cooling paired with immersive cat ear audio',
    productIds: ['prod-8', 'prod-4'], // Phone Cooler Fan + Cat Gaming Headset
    normalPrice: 7198,
    comboPrice: 6499,
    savings: 699,
    freeDelivery: true,
    freeDeliveryBadge: 'FREE DELIVERY — TODAY ONLY',
    enabled: true,
    expiryDate: 'Today Only Promo',
    image: '/src/assets/images/phone_cooler_fan_1793595761951.jpg'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '923001234567',
  whatsappDisplayNumber: '+92 300 1234567',
  currency: 'Rs.',
  standardDeliveryFee: 199,
  deal5FreeDeliveryActive: true,
  promoExpiryDate: 'Today Only',
  paymentMethods: ['Cash on Delivery (COD)', 'Direct Bank Transfer (WhatsApp Confirmation)'],
  returnPolicy: '7-Day Hassle-Free Replacement Policy for any transit-damaged or defective hardware. Please retain original packaging and invoice.',
  adminPasswordHash: 'V7#qN9!tR4@zK8$w'
};
