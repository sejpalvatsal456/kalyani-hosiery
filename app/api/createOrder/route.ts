import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID
});

export const POST = async(req: NextRequest) => {
  try {
    const { amount } = await req.json();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR"
    });

    return NextResponse.json(
      { order: order },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}