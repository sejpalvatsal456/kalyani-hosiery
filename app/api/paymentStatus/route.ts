import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/connectDB";
import { Transaction, User } from "@/lib/models";

const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID as string;
const PHONEPE_SALTKEY = process.env.PHONEPE_SALTKEY as string;
const PHONEPE_SALTINDEX = process.env.PHONEPE_SALTINDEX;
const PHONEPE_HOSTURL = process.env.PHONEPE_HOSTURL as string;

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const transactionId = req.nextUrl.searchParams.get("id");

    if (!transactionId) {
      return NextResponse.json({ msg: "Transaction ID missing" }, { status: 400 });
    }

    // ✅ 1. Check if transaction exists
    const transaction = await Transaction.findOne({ transactionId });

    if (!transaction) {
      return NextResponse.json(
        { msg: "Transaction not found" },
        { status: 404 }
      );
    }

    // ✅ 2. Ensure it's still PENDING
    if (transaction.status !== "PENDING") {
      return NextResponse.json(
        { msg: `Transaction already ${transaction.status}` },
        { status: 400 }
      );
    }

    // ✅ 3. Call PhonePe status API
    const string =
      `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}` +
      PHONEPE_SALTKEY;

    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + PHONEPE_SALTINDEX;

    const res = await fetch(
      `${PHONEPE_HOSTURL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": PHONEPE_MERCHANT_ID,
        },
      }
    );

    const data = await res.json();

    // ✅ 4. Update DB based on response
    if (data.success) {
      transaction.status = "COMPLETED";
      transaction.completedAt = new Date();
      await transaction.save();

      // 🧹 REMOVE ITEMS FROM USER CART
      const user = await User.findById(transaction.userId);

      if (user) {
        user.cart = user.cart.filter((cartItem: any) => {
          // check if this cart item exists in transaction.items
          const existsInTransaction = transaction.items.some((tItem: any) => {
            return (
              tItem.productId.toString() === cartItem.productId.toString() &&
              tItem.colorId === cartItem.colorId &&
              tItem.sizeId === cartItem.sizeId &&
              tItem.sku === cartItem.sku
            );
          });

          // ❌ remove if exists in transaction
          return !existsInTransaction;
        });

        console.log(user.cart)

        await user.save();
      }

      const response = NextResponse.redirect(
        "http://localhost:3000/payment-result?status=success",
        { status: 302 }
      );

      response.cookies.delete("orderId");

      return response;
    } else {
      transaction.status = "FAILED";
      await transaction.save();

      return NextResponse.redirect(
        "http://localhost:3000/payment-result?status=failed",
        { status: 302 }
      );
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error", err: error },
      { status: 500 }
    );
  }
};