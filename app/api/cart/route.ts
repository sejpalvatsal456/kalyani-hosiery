import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { setCookie } from "@/lib/cookies";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const PUT = async(req: NextRequest) => {
    try {
        await connectDB();
        const { userId, prodId, colorId, sizeId } = await req.json();

        const user = await User.findOne({ _id: userId });
        if(!user) return NextResponse.json(
            { msg: "User doesn't found" },
            { status: 404 }
        );

        const oldCart = user.cart;
        const newCart = [ ...oldCart, { productId: prodId, colorId: colorId, sizeId: sizeId } ];
        await User.updateOne({ _id: userId }, { $set: { cart: newCart } });

        const user_token = jwt.sign({
            _id: user._id,
            name: user.name,
            role: user.role,
            phone: user.phone,
            address: user.address,
            cart: newCart   
        }, JWT_SECRET);

        await setCookie('user_token', user_token);

        return NextResponse.json(
            { msg: "Successfully updated",  },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { msg: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}