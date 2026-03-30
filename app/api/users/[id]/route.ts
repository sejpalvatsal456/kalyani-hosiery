import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";

// GET ONE
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  const user = await User.findById(id).populate("orders");
  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  const {
    name,
    phone,
    email,
    address,
    cart
  } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, phone, email, address, cart },
    { new: true }
  );

  return NextResponse.json(updatedUser);
}

// DELETE USER
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const {id} = await params;

  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" });
}