import { connectDB } from "@/lib/connectDB";
import { Brand, Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(
  req: NextRequest,
  { params }: { params: Promise<{ brandName: string }> }
) => {
  try {
    
    await connectDB();
    const { brandName } = await params;

    const brand = await Brand.findOne({ name: brandName });
    if(!brand) return NextResponse.json(
      { msg: "Brand with this name doesn't exist." },
      { status: 404 }
    );

    const products = await Product.find({ brandId: brand._id }).populate([ 'brandId', 'categoryId', 'subcategoryId' ]);

    return NextResponse.json(
      { products: products },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    )
  }
}