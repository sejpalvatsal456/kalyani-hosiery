import { Category } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const { name, slug } = await req.json();

  const updated = await Category.findByIdAndUpdate(
    params.id,
    { name, slug },
    { new: true }
  );

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}