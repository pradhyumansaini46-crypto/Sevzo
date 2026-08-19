export type AppRole = 'consumer' | 'merchant' | 'rider' | 'admin';

export type Language = 'en' | 'hi';

export type ProductCategory = 
  | 'All'
  | 'Grocery & Kitchen'
  | '10-Min Pharmacy'
  | 'Japanese & Expat Pantry'
  | 'Fresh Fruits & Veggies'
  | 'Electronics & Cables'
  | 'Industrial & Safety Supplies'
  | 'Snacks & Beverages';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  unit: string;
  image: string;
  rating: number;
  reviewsCount: number;
  deliveryTimeMin: number;
  merchantId: string;
  merchantName: string;
  isVeg?: boolean;
  isRxRequired?: boolean;
  fssaiLicense?: string;
  drugLicense?: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  tags: string[];
  isExpressEligible?: boolean;
  isB2BBulk?: boolean;
  gstin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Zone {
  id: string;
  name: string;
  hindiName: string;
  type: 'Industrial' | 'Japanese Zone' | 'Residential' | 'University Campus' | 'Heritage Market';
  estimatedDeliveryMin: number;
  landmark: string;
  activeRidersCount: number;
  demandSurgeMultiplier: number;
}

export interface HomeService {
  id: string;
  title: string;
  hindiTitle?: string;
  hindiName?: string;
  category: 'Electrician' | 'AC & Cooling' | 'Deep Cleaning' | 'Plumbing' | 'Appliance Repair' | 'Industrial Maintenance';
  priceStartingINR: number;
  rating: number;
  reviewsCount: number;
  estimatedArrivalMin: number;
  icon: string;
  description: string;
  verifiedBadges: string[];
  servicePartner: {
    name: string;
    avatar: string;
    jobsDone: number;
    policeVerified: boolean;
    aadhaarVerified: boolean;
    rating: number;
  };
}

export type OrderStatus = 'placed' | 'confirmed' | 'packing' | 'rider_assigned' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  deliveryFee: number;
  handlingFee: number;
  discount: number;
  tip: number;
  isExpress: boolean;
  status: OrderStatus;
  placedAt: string;
  estimatedDeliveryTime: string;
  deliveryAddress: {
    zone: string;
    fullAddress: string;
    contactName: string;
    contactPhone: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'SevaZo Wallet' | 'B2B Invoice';
  paymentStatus: 'Paid' | 'Pending' | 'COD Authorized';
  deliveryOtp: string;
  rider?: {
    id: string;
    name: string;
    phone: string;
    photo: string;
    rating: number;
    deliveriesCount: number;
    vehicleType: string;
    vehicleNumber: string;
    lat: number;
    lng: number;
  };
  timeline: {
    status: OrderStatus;
    title: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  ordersCount: number;
  zone: string;
  fssaiNumber?: string;
  drugLicenseNumber?: string;
  gstin?: string;
  isOpen: boolean;
  avgPrepTimeMin: number;
  subscriptionPlan: 'Basic' | 'Growth' | 'Priority Dark-Store';
  payoutPendingINR: number;
  todayRevenueINR: number;
  todayOrdersCount: number;
}

export interface AIDemandForecast {
  zone: string;
  predictedSurgeMultiplier: number;
  expectedOrderVolume30Min: number;
  topDemandCategories: string[];
  recommendedRiderPrepositioning: number;
  darkStoreBottleneckRisk: 'Low' | 'Moderate' | 'High';
  aiOpsInsight: string;
  timestamp: string;
}
