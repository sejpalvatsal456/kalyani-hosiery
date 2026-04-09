import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";
import bcrypt from 'bcrypt';

// GET ONE
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const user = await User.findById(id).populate("orders");
  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const { name, phone, email, address, cart, oldPassword, newPassword } = await req.json();

  let hashedPassword: string| null = null;

  const user = await User.findById(id);
  console.log(user.hashedPassword)
  if (oldPassword) {
    if (await bcrypt.compare(oldPassword, user.hashedPassword)) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } else {
      return NextResponse.json(
        { msg: "Old password doesn't matched." },
        { status: 401 },
      );
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, phone, email, address, cart, hashedPassword: hashedPassword || user.hashedPassword },
    { new: true },
  );

  return NextResponse.json(updatedUser);
}

// DELETE USER
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" });
}
