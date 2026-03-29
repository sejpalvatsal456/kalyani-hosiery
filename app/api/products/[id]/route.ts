import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";

// GET ONE
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const product = await Product.findById(params.id)
    .populate("categoryId")
    .populate("subcategoryId")
    .populate("brandId");

  return NextResponse.json(product);
}

// UPDATE PRODUCT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

  const updatedProduct = await Product.findByIdAndUpdate(
    params.id,
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
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Product deleted" });
}