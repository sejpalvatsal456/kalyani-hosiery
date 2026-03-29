import { Subcategory } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// GET BY SLUG
export async function GET(
  _: Request,
  { params }: { params: { categoryId: string } }
) {
  await connectDB();

  const { categoryId } = await params;

  if (!categoryId) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const subcategory = await Subcategory.find({ categoryId })
    .populate("categoryId");

  if (!subcategory) {
    return NextResponse.json(
      { error: "Subcategory not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(subcategory);
}