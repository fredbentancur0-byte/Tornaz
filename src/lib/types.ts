export type ProductType = "physical" | "digital";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type PaymentMode = "full" | "pay_small_small";
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "delivered"
  | "cancelled";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  categoryName: string;
  price: number; // in naira
  fromPrice?: boolean; // true renders "From ₦x"
  originalPrice?: number; // strike-through reference price
  description: string; // short blurb
  longDescription: string;
  productType: ProductType;
  paySmallSmall: boolean;
  stock: StockStatus;
  seller: string;
  sellerVerified: boolean;
  image: string;
  featured: boolean;
  isNew: boolean;
  createdAt: string; // ISO date, used for "newest" sorting
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  productType: ProductType;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentScheduleEntry {
  label: string;
  dueInDays: number;
  amount: number;
}

export interface Order {
  id: string;
  email?: string | null;
  user_id?: string | null;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_mode: PaymentMode;
  schedule: PaymentScheduleEntry[];
  status: OrderStatus;
  created_at: string;
}
