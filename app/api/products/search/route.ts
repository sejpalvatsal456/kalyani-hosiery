import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Product, Category, Subcategory, Brand } from "@/lib/models";
import { Types } from "mongoose";

// 🔹 Define query type (no any)
type ProductQuery = {
  $or?: (
    | { productName: { $regex: string; $options: string } }
    | { tags: { $regex: string; $options: string } }
    | { brandId: Types.ObjectId }
  )[];
  categoryId?: Types.ObjectId;
  subcategoryId?: Types.ObjectId;
  brandId?: Types.ObjectId;
  "varients.sizes.sellingPrice"?: {
    $gte?: number;
    $lte?: number;
  };
};

// GET /api/products/search
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");
  const categorySlug = searchParams.get("category");
  const subcategorySlug = searchParams.get("subcategory");
  const brandName = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const query: ProductQuery = {};

  // 🔍 Search
  if (q) {
    const brand = await Brand.findOne({
      brandName: { $regex: q, $options: "i" }
    }).select("_id");
    query.$or = [
      { productName: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } }
    ];
    if(brand?._id) {
      query.$or.push({ brandId: brand._id })
    }
    console.log("Query: ");
    console.log(query);
    console.log(query.$or);
  }

  // 📂 Category filter
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug }).select("_id");
    if (category?._id) {
      query.categoryId = category._id;
    } else {
      return NextResponse.json({ products: [], total: 0 });
    }
  }

  // 📂 Subcategory filter
  if (subcategorySlug) {
    const subcategory = await Subcategory.findOne({ slug: subcategorySlug }).select("_id");
    if (subcategory?._id) {
      query.subcategoryId = subcategory._id;
    } else {
      return NextResponse.json({ products: [], total: 0 });
    }
  }

  // 🏷️ Brand filter
  if (brandName) {
    const brand = await Brand.findOne({
      brandName: { $regex: brandName, $options: "i" }
    }).select("_id");

    if (brand?._id) {
      query.brandId = brand._id;
    } else {
      return NextResponse.json({ products: [], total: 0 });
    }
  }

  // 💰 Price filter
  if (minPrice || maxPrice) {
    const priceFilter: { $gte?: number; $lte?: number } = {};

    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);

    query["varients.sizes.sellingPrice"] = priceFilter;
  }

  try {
    const products = await Product.find(query)
      .populate("categoryId")
      .populate("subcategoryId")
      .populate("brandId")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      total,
      page,
      limit,
      products
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}