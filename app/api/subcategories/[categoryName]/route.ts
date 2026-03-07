import { connectDB } from "@/lib/connectDB";
import { Category, Subcategory } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(
    req: NextRequest,
    { params } : { params: Promise<{ categoryName: string }> }
) => {
    try {
        await connectDB();
        const { categoryName } = await params;

        const cat = await Category.findOne({ name: categoryName });
        if(!cat)
            return NextResponse.json(
                { msg: "Category with this name doesn't exist." },
                { status: 404 }
            );
        
        const subCats = await Subcategory.find({ categoryId: cat._id });

        return NextResponse.json(
            { subCats: subCats },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { msg: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}