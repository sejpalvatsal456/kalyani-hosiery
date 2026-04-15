import { Category } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// CREATE
export async function POST(req: Request) {
  await connectDB();

  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingCategory = await Category.findOne({ slug });

  if (existingCategory) {
    return NextResponse.json(
      { error: "Category with this slug already exists" },
      { status: 409 }
    );
  }

  const category = await Category.create({ name, slug });
  return NextResponse.json(category);
}

// GET ALL
export async function GET() {
  await connectDB();

  const categories = await Category.find();
  return NextResponse.json(categories);
}