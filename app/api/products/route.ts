import { connectDB } from "@/lib/connectDB";
import { Category, Product, Subcategory } from "@/lib/models";
import { ProductDataType } from "@/lib/typeDefinitions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
  try {
    
    await connectDB();
    const { brandName, productName, categoryId, subcategoryId, thumbnail, variety, desc } = await req.json() as Omit<ProductDataType, "_id">;

    const oldCat = await Category.findOne({ _id: categoryId });
    if (!oldCat)
      return NextResponse.json(
        { msg: "Category doesn't existed", data: oldCat },
        { status: 404 },
      );

    const oldSubCat = await Subcategory.findOne({ _id: subcategoryId });
    if (!oldSubCat)
      return NextResponse.json(
        { msg: "Sub Category doesn't existed", data: oldCat },
        { status: 404 },
      );

    const newProd = await Product.create({ 
      brandName: brandName,
      productName: productName,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      thumbnail: thumbnail,
      variety: variety,
      desc: desc
     });
    
    if (!newProd) return NextResponse.json(
      { msg: "Error in creating new Product" },
      { status: 500 }
    );

    return NextResponse.json(
      { data: newProd },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal server error", error: error },
      { status: 500 }
    );
  }
}