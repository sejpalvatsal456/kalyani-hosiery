import { connectDB } from "@/lib/connectDB";
import { Category, Product, Subcategory } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: { params: Promise<{ categoryName: string; subcategoryName: string }> },
) => {
  try {
    await connectDB();

    const { categoryName, subcategoryName } = await params;

    const cat = await Category.findOne({ name: categoryName });
    if (!cat)
      return NextResponse.json(
        { msg: "Category doesn't exist" },
        { status: 404 },
      );
    
    const subCat = await Subcategory.findOne({ categoryId: cat._id, name: subcategoryName });
    if (!subCat)
      return NextResponse.json(
        { msg: "SubCategory doesn't exist" },
        { status: 404 },
      );
    
    const products = await Product.find({ subcategoryId: subCat._id }).populate(['brandId', 'categoryId', 'subcategoryId']);

    return NextResponse.json(
      { products: products },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Sever Error" }, { status: 500 });
  }
};
