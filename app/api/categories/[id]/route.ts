import { Category } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  const { name, slug } = await req.json();

  const updated = await Category.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}