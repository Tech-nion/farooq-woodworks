export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Worker {
  id: string;
  user_id: string | null;
  name: string;
  specialty: string;
  bio: string | null;
  avatar_url: string | null;
  phone: string | null;
  email: string | null;
  experience_years: number;
  hourly_rate: number | null;
  is_available: boolean;
  rating: number;
  total_reviews: number;
  portfolio_images: string[];
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  worker_id: string | null;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  images: string[];
  in_stock: boolean;
  stock_quantity: number;
  dimensions: string | null;
  material: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  worker?: Worker;
  category?: Category;
}

export interface Service {
  id: string;
  worker_id: string | null;
  category_id: string | null;
  name: string;
  description: string | null;
  min_price: number;
  max_price: number | null;
  duration_days: number | null;
  is_available: boolean;
  created_at: string;
  worker?: Worker;
  category?: Category;
}

export interface Review {
  id: string;
  worker_id: string;
  user_id: string | null;
  user_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface WorkRequest {
  id: string;
  worker_id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  description: string;
  budget_range: string | null;
  timeline: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface WorkerAvailability {
  id: string;
  worker_id: string;
  date: string;
  is_available: boolean;
  notes: string | null;
}

export interface GalleryItem {
  id: string;
  worker_id: string | null;
  category_id: string | null;
  title: string;
  description: string | null;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  category?: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}
