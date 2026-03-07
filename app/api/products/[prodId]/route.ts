import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest, { params }: { params: Promise<{ prodId: string }> }) => {
  try {
    
    await connectDB();
    const { prodId } = await params;

    const prod = await Product.findOne({ _id: prodId }).populate('brandId').populate('categoryId').populate('subcategoryId');
    if (!prod) return NextResponse.json(
      { msg: "Product doesn't exist" },
      { status: 404 }
    );

    return NextResponse.json(
      { data: prod },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    )
  }
}