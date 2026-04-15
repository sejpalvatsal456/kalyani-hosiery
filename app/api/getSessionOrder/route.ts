import { connectDB } from "@/lib/connectDB";
import { CheckoutSession } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
  try {
    
    await connectDB();

    const order_token_stringified = req.cookies.get("orderId")?.value;
    if(!order_token_stringified)
      return NextResponse.json(
        { msg: "No order id found" },
        { status: 404 }
      );

      const order_token = JSON.parse(order_token_stringified) as { orderId: string };
      const orderId = order_token.orderId;

      const session = await CheckoutSession.findById(orderId);
      if(!session) 
        return NextResponse.json(
            { msg: "Session with this id expired or didn't exist." },
            { status: 404 }
          );
      
      return NextResponse.json(session);

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}