import { connectDB } from "@/lib/connectDB";
import { Order, User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { IUser } from "@/lib/typeDefinitions";

export const GET = async(req: NextRequest) => {
  try {
    
    await connectDB();

    const user_token = req.cookies.get("user_token")?.value;
    if(!user_token) {
      const res = NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
      res.cookies.delete("user_token");
      return res;
    }
    const userFromCookie = jwt.decode(user_token) as IUser;
    const userId = userFromCookie?._id;
    const user = await User.findById(userId);

    if(!user) {
      const res = NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
      res.cookies.delete("user_token");
      return res;
    }

    const orders = await Order.find({ userId: user._id }).populate('items.productId').sort({ createdAt: -1 });

    // console.log

    return NextResponse.json(orders);

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}