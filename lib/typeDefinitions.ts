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
  pincode: string;
}

export interface IOrderItem {
  product: string;
  sku: string;
  quantity: number;
}

export interface ICart {
  productId: string;
  colorId: string;
  sizeId: string;
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
  _id?: string;
  brandName: string;
  brandLogo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  theme: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubcategory {
  _id?: string;
  name: string;
  category: string;
  slug: string;
  logoLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  hashedPassword: string;
  cart: ICart[];
  orders: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  _id?: string;
  productName: string;
  slug: string;
  category: string;
  subcategory: string;
  brandId: string;
  thumbnail: string;
  tags: string[];
  varients: IVariety[];
  desc: IProductDescription[];
  loc: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDisplayProduct extends Omit<IProduct, 'category' | 'subcategory' | 'brandId' | 'loc'> {
  category : {
    _id?: string;
    name: string;
    slug: string;
  };
  subcategory: {
    _id?: string;
    name: string;
    categoryId: string;
    slug: string;
  };
  brandId: {
    brandName: string,
    brandLogo: string
  }
};

// export interface IProductOverview extends Omit<IProduct, 'category'|'subcategory'|'brandId'>

export interface IOrder {
  _id?: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SectionType =
  | "manage_profile"
  | "cart"
  | "previous_purchase"
  | "change_password"
  | "change_number";