import { Order } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// CREATE ORDER
export async function POST(req: Request) {
  await connectDB();

  const {
    userId,
    items,
    shippingAddress,
    paymentMethod
  } = await req.json();

  if (!userId || !items || !shippingAddress || !paymentMethod) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const order = await Order.create({
    userId,
    items,
    shippingAddress,
    paymentMethod
  });

  return NextResponse.json(order);
}

// GET ALL
export async function GET() {
  await connectDB();

  const orders = await Order.find()
    .populate("userId")
    .populate("items.productId");

  return NextResponse.json(orders);
}