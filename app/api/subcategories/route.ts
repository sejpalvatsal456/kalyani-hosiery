import { Subcategory } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// CREATE SUBCATEGORY
export async function POST(req: Request) {
  await connectDB();

  const {
    name,
    categoryId,
    slug,
    logoLink
  } = await req.json();

  // ✅ Validate required fields
  if (!name || !categoryId || !slug || !logoLink) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // ✅ Early duplicate check
  const existing = await Subcategory.findOne({ slug });

  if (existing) {
    return NextResponse.json(
      { error: "Subcategory with this slug already exists" },
      { status: 409 }
    );
  }

  try {
    const subcategory = await Subcategory.create({
      name,
      categoryId,
      slug,
      logoLink
    });

    return NextResponse.json(subcategory, { status: 201 });

  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}

// GET ALL SUBCATEGORIES
export async function GET() {
  await connectDB();

  const subcategories = await Subcategory.find()
    .populate("categoryId");

  return NextResponse.json(subcategories);
}