import { connectDB } from "@/lib/connectDB";
import { Product, User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "@/lib/cookies";
import { User as UserType } from "@/lib/typeDefinitions";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as UserType; // temporary fix, change the type when the cookie system changes
    const userId = userFromCookie._id;

    const user = await User.findById(userId).populate("cart.productId").lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(user.cart);

    // Transform cart data
    const cartItems = user.cart.map((item: any) => {
    const product = item.productId;

    const selectedVariety = product.variety.find(
      (v: any) => v.id === item.colorId
    );

    const selectedSize = selectedVariety?.sizes.find(
      (s: any) => s.id === item.sizeId
    );

    return {
      productId: product._id,
      brand: product.brandName,
      title: product.productName,
      thumbnail: product.thumbnail,
      color: selectedVariety?.color,
      size: selectedSize?.size,
      mrp: selectedSize?.mrp,
      sellingPrice: selectedSize?.sellingPrice,
      stock: selectedSize?.stock,
      quantity: 1, // Add quantity in cart schema later
    };
  });

    return NextResponse.json(
      { data: cartItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();
    const { userId, prodId, colorId, sizeId } = await req.json();

    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json({ msg: "User doesn't found" }, { status: 404 });

    const oldCart = user.cart;
    const newCart = [
      ...oldCart,
      { productId: prodId, colorId: colorId, sizeId: sizeId },
    ];
    const res = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: newCart } },
      { new: true },
    );

    const user_token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        cart: newCart,
      },
      JWT_SECRET,
    );

    await setCookie("user_token", user_token);

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
