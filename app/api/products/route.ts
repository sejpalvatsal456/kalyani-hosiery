import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";

// CREATE PRODUCT
export async function POST(req: Request) {
  await connectDB();

  const {
    productName,
    slug,
    categoryId,
    subcategoryId,
    brandId,
    thumbnail,
    tags,
    varients,
    desc,
    loc
  } = await req.json();

  if (!productName || !slug || !categoryId || !subcategoryId || !brandId || !thumbnail || !loc) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingProduct = await Product.findOne({ slug });
  if(existingProduct) {
    return NextResponse.json(
      { msg: "Product with this slug already exist." },
      { status: 409 }
    );
  }

  const product = await Product.create({
    productName,
    slug,
    categoryId,
    subcategoryId,
    brandId,
    thumbnail,
    tags,
    varients,
    desc,
    loc
  });

  return NextResponse.json(product);
}

// GET ALL PRODUCTS
export async function GET() {
  await connectDB();

  const products = await Product.find()
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("brandId");

  return NextResponse.json(products);
}