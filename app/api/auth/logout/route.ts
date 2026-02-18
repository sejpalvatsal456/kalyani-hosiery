import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
  try {
    
    const res = NextResponse.json(
      { msg: "Logout successful" },
      { status: 200 }
    );

    // TODO: Implement this cookie logic in other api endpoints too
    res.cookies.delete("user_token");

    return res;

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}