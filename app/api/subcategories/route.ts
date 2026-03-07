import { connectDB } from "@/lib/connectDB";
import { Category, Subcategory } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    connectDB();
    const { name, categoryId } = await req.json();

    const cat = await Category.findOne({ _id: categoryId });
    if (!cat)
      return NextResponse.json(
        { msg: "Category doesn't exist" },
        { status: 404 },
      );

    const oldSubCat = await Subcategory.findOne({
      name: name,
      cateogoryId: categoryId,
    });
    if (oldSubCat)
      return NextResponse.json(
        { msg: "Sub Cateogry already exist" },
        { status: 409 },
      );

    const newSubCat = await Subcategory.create({
      name: name,
      categoryId: categoryId,
    });

    return NextResponse.json({ data: newSubCat }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error: error }, { status: 500 });
  }
};
