import { connectDB } from "@/lib/connectDB";
import { Category, Subcategory } from "@/lib/models";
import { ProductDataType } from "@/lib/typeDefinitions";
import { NextRequest, NextResponse } from "next/server";

// TODO: Complete the api

export const POST = async(req:NextRequest) => {
  try {
    
    await connectDB();
    const { title, subtitle, categoryId, subcategoryId, pricing, thumbnail, variety, desc } = await req.json() as Omit<ProductDataType, "_id">;

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

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal server error", error: error },
      { status: 500 }
    );
  }
}