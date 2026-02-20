import { model, models, Schema, Types } from "mongoose";

const SizeSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    mrp: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const VarietySchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    imgLinks: { type: [String], required: true },
    sizes: { type: [SizeSchema], required: true },
  },
  { _id: false },
);

const DescriptionSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

export const Category = models.Category || model("Category", CategorySchema);

const SubcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate subcategories under same category
SubcategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });

export const Subcategory =
  models.Subcategory || model("Subcategory", SubcategorySchema);

const ProductSchema = new Schema(
  {
    brandName: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Types.ObjectId, ref: "Subcategory", required: true },
    thumbnail: { type: String, required: true },
    variety: { type: [VarietySchema], required: true },
    desc: { type: [DescriptionSchema], required: true },
  },
  { timestamps: true },
);

export const Product = models.Product || model("Product", ProductSchema);

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  role: { type: String, enum: [ 'user', 'admin' ], required: true },
  phone: { type: Number, required: true },
  hashedPassword: { type: String, required: true },
  address: { type: String, trim: true },
  cart: { type: [{ productId: Types.ObjectId, sizeId: String, colorId: String }], required: true, ref: "Product" }
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
