import { CheckoutSession, Order, User } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { IUser } from "@/lib/typeDefinitions";

// CREATE ORDER
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { items } = await req.json();

    const user_token = req.cookies.get("user_token")?.value;
    if (!user_token) return NextResponse.redirect("/auth/login");
    const userFromCookie = jwt.decode(user_token) as IUser;
    const userId = userFromCookie?._id;
    const user = await User.findById(userId);
    const shippingAddress = user.address;

    if (!items) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    const orderSession = await CheckoutSession.create({
      userId,
      items,
    });

    // create a session for this order
    const response = NextResponse.json(orderSession);
    response.cookies.set("orderId", JSON.stringify({ orderId: orderSession._id }), {
      httpOnly: true,
      secure: false, // use false only in local dev (http)
      sameSite: "strict",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

// GET ALL
export async function GET() {
  await connectDB();

  const orders = await Order.find()
    .populate("userId")
    .populate("items.productId");

  return NextResponse.json(orders);
}
