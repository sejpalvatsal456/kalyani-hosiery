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

      const selectedVariety = product.varients.find(
        (v: any) => v.colorID === item.colorId,
      );

      const selectedSize = selectedVariety?.sizes.find(
        (s: any) => s.sizeID === item.sizeId,
      );

      return {
        productId: product._id,
        brand: product.brandId.name,
        title: product.productName,
        thumbnail: product.thumbnail,
        color: selectedVariety?.colorCode,
        size: selectedSize?.sizeName,
        mrp: selectedSize?.mrp,
        sellingPrice: selectedSize?.sellingPrice,
        stock: selectedSize?.stock,
        quantity: 1, // Add quantity in cart schema later
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

    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json({ msg: "User doesn't found" }, { status: 404 });

    const oldCart = user.cart;
    const newCart = [
      ...oldCart,
      { productId: prodId, colorId: colorId, sizeId: sizeId, sku: sku },
    ];
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: newCart } },
      { new: true },
    );

    return NextResponse.json(
      { msg: "Successfully updated", newCart: res.cart },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
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