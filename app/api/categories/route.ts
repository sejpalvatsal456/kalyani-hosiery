import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { name } = await req.json();

    const oldCat = await Category.findOne({ name: name });
    if (oldCat)
      return NextResponse.json(
        { msg: "Category already existed", data: oldCat },
        { status: 409 },
      );

    const newCat = await Category.create({ name: name });

    return NextResponse.json({ data: newCat }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Sever Error" }, { status: 500 });
  }
};
