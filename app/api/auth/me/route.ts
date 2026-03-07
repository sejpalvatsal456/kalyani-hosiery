import { getCookie } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models";
import { User as UserType } from "@/lib/typeDefinitions";

export const GET = async (req: NextRequest) => {
  try {
    const user_token = await getCookie("user_token");
    if (!user_token)
      return NextResponse.json({ login: false }, { status: 200 });
    const user = jwt.decode(user_token) as UserType;
    if (!user) {
      return NextResponse.json({ login: false }, { status: 500 });
    }
    const userData = await User.findOne({ _id: user._id });
    return NextResponse.json(
        { login: true, data: userData },
        { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
};
