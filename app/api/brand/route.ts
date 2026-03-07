import { connectDB } from "@/lib/connectDB";
import { Brand } from "@/lib/models";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
  try {
    
    await connectDB();
    const { name, logo } = await req.json();

    const oldBrand = await Brand.findOne({ name: name });
    if(oldBrand) return NextResponse.json(
      { msg: "Brand with this name already exist." },
      { status: 409 }
    );

    const brand = await Brand.create({ name: name, logo: logo });
    if(!brand) return NextResponse.json(
      { msg: "Error in Brand creation" },
      { status: 500 }
    );

    return NextResponse.json(
      { data: brand },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export const GET = async(req: NextRequest) => {
  try {
    
    await connectDB();

    const brands = await Brand.find();
    return NextResponse.json(
      { data: brands },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}