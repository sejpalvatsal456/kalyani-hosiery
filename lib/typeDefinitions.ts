export type navLinksDataType = {
  name: string;
  tag: string;
};


export type Category = {
  _id: string;
  name: string; // Like Men, Women, Kids
};

export type SubCategory = {
  _id: string;
  categoryId: string;
  name: string; // Like Shirt, Tshirt, etc
};

export type ProductDataType = {
  _id: string;
  brandName: string;
  productName: string;
  categoryId: string;
  subcategoryId: string;
  thumbnail: string;
  variety: {
    id: string;
    color: string;
    imgLinks: string[];
    sizes: { id: string, size: string; stock: number; mrp: number; sellingPrice: number; }[];
  }[];
  desc: { key: string; value: string }[];
  createdAt: string;
  updatedAt: string;
};

export type DisplayProductType = Omit<ProductDataType, "categoryId"|"subcategoryId"> & { categoryId: Category, subcategoryId: SubCategory };
export type ProductOverviewType = Omit<ProductDataType, "categoryId"|"subcategoryId"|"thumbnail"|"createdAt"|"updatedAt"> & { category: Category, subcategory: SubCategory };

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone: number;
  hashedPassword: string;
  address?: string;
  cart: { productId: string, colorId: string, sizeId: string }[];
};

export type SectionType = "manage_profile" | "cart" | "previous_purchase";