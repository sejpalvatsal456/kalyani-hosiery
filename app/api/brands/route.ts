import { Brand } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// CREATE
export async function POST(req: Request) {
  await connectDB();

  const { brandName, brandLogo } = await req.json();

  if (!brandName || !brandLogo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const brand = await Brand.create({ brandName, brandLogo });
  return NextResponse.json(brand);
}

// GET ALL
export async function GET() {
  await connectDB();

  const brands = await Brand.find();
  return NextResponse.json(brands);
}