import { connectDB } from "@/lib/connectDB";
import { getCookie, setCookie } from "@/lib/cookies";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    
    await connectDB();

    const { number } = await req.json();

    const oldUser = await User.findOne({ phone: number });
    if(oldUser) 
      return NextResponse.json(
          { msg: "User with this phone number already exist." },
          { status: 409 }
        );
    
    await setCookie("tempPhone", number);
    return NextResponse.json({ msg: "Verified" });

  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

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