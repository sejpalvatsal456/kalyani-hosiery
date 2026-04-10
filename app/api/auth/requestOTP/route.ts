import { NextRequest, NextResponse } from "next/server";

const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY as string;

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const number = searchParams.get('number');
        if(!number) {
            return NextResponse.json(
                { msg: "Phone number is required." },
                { status: 400 }
            );
        }
        // Generate OTP
        console.log(`https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/+91${number}/AUTOGEN1/OTP1`);
        const otpRes = await fetch(`https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/+91${number}/AUTOGEN2/OTP1`);

        const otpData = await otpRes.json();
        console.log(otpData);

        if (otpData.Status !== "Success") {
            return NextResponse.json(
                { msg: "Failed to generate OTP." },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { msg: "OTP sent successfully.", data: otpData },
            { status: 200 }
        );


    } catch (error) {
        return NextResponse.json(
            { msg: "Internal server error." },
            { status: 500 }
        );
    }
}
