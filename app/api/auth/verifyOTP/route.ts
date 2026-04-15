import { NextRequest, NextResponse } from "next/server";

const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY as string;

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const number = searchParams.get('number');
        const otp = searchParams.get('otp');

        const verifyRes = await fetch(`https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY3/${number}/${otp}`);
        const verifyData = await verifyRes.json();
        console.log(verifyData);
        if (verifyData.Details !== "OTP Matched") {
            return NextResponse.json(
                { msg: verifyData.Details || "Failed to verify OTP." },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { msg: "OTP verified successfully.", data: verifyData },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { msg: "Internal server error." },
            { status: 500 }
        );
    }
}