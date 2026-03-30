import { Subcategory } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// GET ONE
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const {id} = await params;

  const subcategory = await Subcategory.findById(id)
    .populate("categoryId");

  if (!subcategory) {
    return NextResponse.json(
      { error: "Subcategory not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(subcategory);
}

// UPDATE SUBCATEGORY
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const {id} = await params;

  const {
    name,
    categoryId,
    slug,
    logoLink
  } = await req.json();

  try {
    const updated = await Subcategory.findByIdAndUpdate(
      id,
      {
        name,
        categoryId,
        slug,
        logoLink
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);

  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

// DELETE SUBCATEGORY
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const {id} = await params;

  const deleted = await Subcategory.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Subcategory not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Subcategory deleted" });
}