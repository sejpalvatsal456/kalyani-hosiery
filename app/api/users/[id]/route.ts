import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";

// GET ONE
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const user = await User.findById(params.id).populate("orders");
  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const {
    name,
    phone,
    email,
    address,
    cart
  } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { name, phone, email, address, cart },
    { new: true }
  );

  return NextResponse.json(updatedUser);
}

// DELETE USER
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}