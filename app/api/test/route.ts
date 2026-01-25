import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest) => {
    try {
        await connectDB();
        return NextResponse.json({ msg: "OK" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: error }, { status: 500 });
    }
}