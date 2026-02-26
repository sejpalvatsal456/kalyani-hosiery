import { Order } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import { User as UserType } from "@/lib/typeDefinitions"; 

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export const POST = async (req: NextRequest) => {
  try {
    const { amount, items } = await req.json();

    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as UserType; // temporary fix, change the type when the cookie system changes
    const userId = userFromCookie._id;

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    const order = await Order.create({
      userId: userId,
      items: items,
      totalAmount: amount,
      razorpayOrderId: razorpayOrder.id,
      status: "created"
    });

    if(!order) return NextResponse.json(
      { msg: "Error in creation of order" },
      { status: 500 }
    );

    return NextResponse.json({ razorpayOrder: razorpayOrder, orderId: order._id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
};
