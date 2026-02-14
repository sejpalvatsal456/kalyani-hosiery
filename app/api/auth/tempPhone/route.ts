import { getCookie, setCookie } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const { number } = await req.json();
        // TODO: add validater to check if the number is in the database or not
        
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

export const GET = async(req: NextRequest) => {
    try {
        const number = await getCookie('tempPhone');
        return NextResponse.json(
            { number: number },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
};