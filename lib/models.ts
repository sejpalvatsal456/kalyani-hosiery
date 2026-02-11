import { model, models, Schema, Types } from "mongoose";

const SizeSchema = new Schema(
  {
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
