import { connectDB } from "@/lib/connectDB";
import { jwtDecrypt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { IUser } from "@/lib/typeDefinitions";
import { Transaction, User } from "@/lib/models";
import crypto from 'crypto';


const JWT_SECRET = process.env.JWT_SECRET;
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID as string;
const PHONEPE_SALTKEY = process.env.PHONEPE_SALTKEY as string;
const PHONEPE_SALTINDEX = process.env.PHONEPE_SALTINDEX as string;
const PHONEPE_HOSTURL = process.env.PHONEPE_HOSTURL as string;
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const POST = async(req: NextRequest) => {
  try {
    
    await connectDB();

    const { amount, items } = await req.json();

    console.log("Items in API: ");
    console.log(items);

    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as IUser;
    const userId = userFromCookie?._id;

    if (!userId) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const user = await User.findById(userId).populate("cart.productId");

    const transactionId = "T" + Date.now();

    // Create the payload for phonepay create payment api
    const phonePayPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      name: user.name,
      mobileNumber: user.phone,
      amount: amount*100,
      redirectUrl: `${NEXT_PUBLIC_BASE_URL}/api/paymentStatus?id=${transactionId}`,
      callbackUrl: `${NEXT_PUBLIC_BASE_URL}/api/paymentStatus?id=${transactionId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Create check sum for verification of payments
    const payload = JSON.stringify(phonePayPayload);
    const payloadMain = Buffer.from(payload).toString("base64");
    const sha256 = crypto
      .createHash("sha256")
      .update(payloadMain + "/pg/v1/pay" + PHONEPE_SALTKEY)
      .digest("hex");
    const checksum = sha256 + "###" + PHONEPE_SALTINDEX;

    // Send API call to phonepe for payment
    const res = await fetch(`${PHONEPE_HOSTURL}/pg/v1/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-VERIFY": checksum },
      body: JSON.stringify({ request: payloadMain }),
    });
    const resData = await res.json();

    console.log(resData)

    // Create a transaction record in the db
    const currentDateTime = new Date();

    const transaction = await Transaction.create({
      userId: userId,
      transactionId: transactionId,
      merchantId: resData.data.merchantId,
      items: items,
      amount: amount,
      status: "PENDING",
      initiatedAt: currentDateTime
    });


    const response = NextResponse.json(resData);
    
    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}