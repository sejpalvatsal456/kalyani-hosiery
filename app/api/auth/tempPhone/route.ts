import { setCookie } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const { number } = await req.json();
        await setCookie('tempPhone', number);
        return NextResponse.json(
            { data: number },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
};