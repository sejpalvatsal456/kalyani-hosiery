import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";

// CREATE USER

export async function POST(req: Request) {
  await connectDB();

  const {
    name,
    phone,
    email,
    address,
    hashedPassword
  } = await req.json();

  if (!name || !phone || !hashedPassword) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = await User.create({
    name,
    phone,
    email,
    address,
    hashedPassword
  });

  return NextResponse.json(user);
}

// GET ALL USERS
export async function GET() {
  await connectDB();

  const users = await User.find().populate("orders");
  return NextResponse.json(users);
}