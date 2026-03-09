import { Types } from 'mongoose';

/**
 * --- Sub-Schema Interfaces ---
 */

export interface IAddress {
  house: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: number;
}

export interface IOrderItem {
  productId: Types.ObjectId;
  sku: string;
  quantity: number;
}

export interface ICart {
  productId: Types.ObjectId;
  sku: string;
  quantity: number;
}

export interface ISize {
  sizeID: string;
  sku: string;
  sizeName: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  stock: number;
}

export interface IVariety {
  colorID: string;
  colorName: string;
  colorCode: string; // Starts with #, max 7 chars
  imgLinks: string[];
  sizes: ISize[]; // Minimum 1 element
}

export interface IProductDescription {
  key: string;
  value: string;
}

/**
 * --- Enums and Literal Types ---
 */

export type PaymentMethod = 'cod' | 'online';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * --- Main Model Interfaces ---
 */

export interface IBrand {
  _id?: Types.ObjectId;
  brandName: string;
  brandLogo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubcategory {
  _id?: Types.ObjectId;
  name: string;
  categoryId: Types.ObjectId;
  slug: string;
  logoLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  address: IAddress | null;
  hashedPassword: string;
  cart: ICart[];
  orders: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: Types.ObjectId;
  productName: string;
  slug: string;
  categoryId: Types.ObjectId;
  subcategoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  thumbnail: string;
  tags: string[];
  varients: IVariety[];
  desc: IProductDescription[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}