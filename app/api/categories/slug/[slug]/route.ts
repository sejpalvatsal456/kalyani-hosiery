import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models";

// GET CATEGORY BY SLUG
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Slug is required" },
      { status: 400 }
    );
  }

  const category = await Category.findOne({ slug });

  if (!category) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}