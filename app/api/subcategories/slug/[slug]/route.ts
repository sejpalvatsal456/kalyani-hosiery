import { Subcategory } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// GET BY SLUG
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB();

  const { slug } = params;

  if (!slug) {
    return NextResponse.json(
      { error: "Slug is required" },
      { status: 400 }
    );
  }

  const subcategory = await Subcategory.findOne({ slug })
    .populate("categoryId");

  if (!subcategory) {
    return NextResponse.json(
      { error: "Subcategory not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(subcategory);
}