import { getCookie } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const GET = async(req:NextRequest) => {
    try {
        const user_token = await getCookie("user_token");
        if(!user_token)
            return NextResponse.json(
                { login: false },
                { status: 200 }
            );
        const user = jwt.decode(user_token);
        return NextResponse.json(
            { login: true, data: user },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { msg: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}