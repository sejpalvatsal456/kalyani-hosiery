import { Order } from "@/lib/models";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// UPDATE ORDER
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const {
    items,
    shippingAddress,
    paymentStatus,
    orderStatus
  } = await req.json();

  const updated = await Order.findByIdAndUpdate(
    params.id,
    {
      items,
      shippingAddress,
      paymentStatus,
      orderStatus
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

// DELETE ORDER
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Order deleted" });
}