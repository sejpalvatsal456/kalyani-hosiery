import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { setCookie } from "@/lib/cookies";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async(req: NextRequest) => {
    try {
        await connectDB();

        const { phone, password } = await req.json();

        const user = await User.findOne({ phone: phone });
        if (!user)
            return NextResponse.json(
                { msg: "User with this phone number doesn't exist." },
                { status: 409 }
            );
        
        const hashedPasswordFromDB = user.hashedPassword;

        if (!(await bcrypt.compare(password, hashedPasswordFromDB))) {
            return NextResponse.json(
                { msg: "Incorrect Password" },
                { status: 401 }
            );
        } 

        // FIXME: rewrite the code using user_token such that it only contains _id and role.

        const user_token = jwt.sign({
            _id: user._id,
            name: user.name,
            role: user.role,
            phone: user.phone,
            address: user.address,
            cart: user.cart
        }, JWT_SECRET);

        await setCookie('user_token', user_token);

        return NextResponse.json(
            { msg: "Login Success" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { msg: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}