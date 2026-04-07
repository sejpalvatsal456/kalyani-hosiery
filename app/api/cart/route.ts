import { connectDB } from "@/lib/connectDB";
import { Product, User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "@/lib/cookies";
import { IUser } from "@/lib/typeDefinitions";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as IUser; // temporary fix, change the type when the cookie system changes
    const userId = userFromCookie._id;

    const user = await User.findById(userId).populate("cart.productId");
    const newUser = await user.populate("cart.productId.brandId");
    // console.log("User data from /api/cart: ");
    // console.log(newUser);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // console.log(user.cart[0].productId);

    // Transform cart data
    const cartItems = user.cart.map((item: any) => {
      const product = item.productId;

      const selectedVarient = product.varients.find(
        (v: any) => v.colorID === item.colorId,
      );

      const selectedSize = selectedVarient?.sizes.find(
        (s: any) => s.sizeID === item.sizeId,
      );

      return {
        productId: product._id,
        brand: product.brandId.name,
        title: product.productName,
        thumbnail: product.thumbnail,
        color: selectedVarient?.colorCode,
        colorId: selectedVarient?.colorID,
        size: selectedSize?.sizeName,
        sizeId: selectedSize?.sizeID,
        mrp: selectedSize?.mrp,
        sellingPrice: selectedSize?.sellingPrice,
        sku: selectedSize?.sku,
        stock: selectedSize?.stock,
        quantity: item.quantity, // Add quantity in cart schema later
      };
    });

    return NextResponse.json({ data: cartItems }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();

    const { userId, prodId, colorId, sizeId, sku } = await req.json();

    // 🔍 Validate input
    if (!userId || !prodId || !colorId || !sizeId || !sku) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔍 Check if user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json(
        { msg: "User not found" },
        { status: 404 }
      );
    }

    /**
     * 🔥 STEP 1: Try to update existing cart item (ATOMIC)
     *
     * If item already exists → increment quantity
     * This avoids duplicates AND prevents race conditions
     */
    const updateExisting = await User.updateOne(
      {
        _id: userId,
        "cart.productId": prodId,
        "cart.colorId": colorId,
        "cart.sizeId": sizeId,
      },
      {
        $inc: { "cart.$.quantity": 1 }, // ✅ atomic increment
      }
    );

    /**
     * 🔍 If no existing item found → add new item
     */
    if (updateExisting.modifiedCount === 0) {
      await User.updateOne(
        { _id: userId },
        {
          $push: {
            cart: {
              productId: prodId,
              colorId,
              sizeId,
              sku,
              quantity: 1, // ✅ default quantity
            },
          },
        }
      );
    }

    /**
     * ✅ Fetch updated cart (clean response)
     */
    const updatedUser = await User.findById(userId).select("cart");

    return NextResponse.json(
      {
        msg: "Cart updated successfully",
        newCart: updatedUser?.cart || [],
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Cart Update Error:", error);

    return NextResponse.json(
      {
        msg: "Internal Server Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDB();

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { msg: "Product ID is required" },
        { status: 400 },
      );
    }

    // Get token
    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as IUser; // temporary fix, change the type when the cookie system changes
    const userId = userFromCookie._id;

    // Remove from cart using $pull
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cart: {
            productId
          },
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Item removed successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
};