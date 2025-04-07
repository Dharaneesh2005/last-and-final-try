import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  otpSecret: z.string().optional(),
  otpEnabled: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

// Product schema
export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  price: z.number().min(0),
  comparePrice: z.number().min(0).optional(),
  badge: z.string().optional(),
  category: z.string().min(1),
  imageUrl: z.string().min(1),
  imageGallery: z.array(z.string()).optional(),
  inStock: z.boolean().default(true),
  stockQuantity: z.number().default(0),
  featured: z.boolean().default(false),
  nutritionFacts: z.string().optional(),
  cookingInstructions: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().default(0),
  weightOptions: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof productSchema>;

// Cart item schema
export const cartItemSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  sessionId: z.string().optional(),
  productId: z.number(),
  quantity: z.number().min(1).default(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Contact schema
export const contactSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.date().optional(),
});

export type Contact = z.infer<typeof contactSchema>;

// Product review schema
export const productReviewSchema = z.object({
  id: z.string(),
  productId: z.number(),
  userId: z.number().optional(),
  name: z.string(),
  avatar: z.string().optional(),
  date: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  helpfulCount: z.number().default(0),
});

export type ProductReview = z.infer<typeof productReviewSchema>;

// Order schema
export const orderSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  sessionId: z.string().optional(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
  total: z.number().min(0),
  shippingAddress: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    phone: z.string(),
  }),
  paymentMethod: z.string(),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Order = z.infer<typeof orderSchema>;

// Order item schema
export const orderItemSchema = z.object({
  id: z.number().optional(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  createdAt: z.date().optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>; 