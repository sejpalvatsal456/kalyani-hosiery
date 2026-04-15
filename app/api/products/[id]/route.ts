import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";

// GET ONE
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  const product = await Product.findById(id)
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("brandId");

  return NextResponse.json(product);
}

// UPDATE PRODUCT
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

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

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  );

  return NextResponse.json(updatedProduct);
}

// DELETE PRODUCT
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" });
}