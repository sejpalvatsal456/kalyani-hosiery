import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) => {
    try {
        await connectDB();
        console.log(process.env.MONGODB_URI);
        console.log(process.env.MONGODB_NAME);
        return NextResponse.json({ msg: "OK" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ err: error }, { status: 500 });
    }
}