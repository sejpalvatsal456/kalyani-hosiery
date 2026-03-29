import { Brand } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";


// 🔹 GET BRAND BY ID
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const brand = await Brand.findById(params.id);

  if (!brand) {
    return NextResponse.json(
      { error: "Brand not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(brand);
}


// 🔹 UPDATE BRAND
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { brandName, brandLogo } = await req.json();

  // Optional validation
  if (!brandName && !brandLogo) {
    return NextResponse.json(
      { error: "At least one field is required to update" },
      { status: 400 }
    );
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    params.id,
    { brandName, brandLogo },
    { new: true }
  );

  if (!updatedBrand) {
    return NextResponse.json(
      { error: "Brand not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedBrand);
}


// 🔹 DELETE BRAND
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const deletedBrand = await Brand.findByIdAndDelete(params.id);

  if (!deletedBrand) {
    return NextResponse.json(
      { error: "Brand not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Brand deleted successfully"
  });
}