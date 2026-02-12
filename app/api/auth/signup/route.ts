import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setCookie } from "@/lib/cookies";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const POST = async(req: NextRequest) => {
    try {
        await connectDB();
        const { name, role, phone, password, address } = await req.json();

        const oldUser = await User.findOne({ phone: phone });
        if(oldUser) return NextResponse.json(
            { msg: "User with this phone number already exist." },
            { status: 409 }
        );

        const hashedPassword = await bcyrpt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            role: role,
            phone: phone,
            hashedPassword: hashedPassword,
            address: address,
            cart: []
        });

        if(!newUser) return NextResponse.json(
            { msg: "Error in creating new user" },
            { status: 500 }
        );

        const user_token = jwt.sign({
            _id: newUser._id,
            name: newUser.name,
            role: newUser.role,
            phone: newUser.phone,
            address: newUser.address,
            cart: []
        }, JWT_SECRET);

        // TODO: add logic to create the cookie for user_token

        await setCookie('user_token', user_token);

        return NextResponse.json(
            { token: user_token },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { msg: "Internal Server Error", err: error },
            { status: 500 }
        )
    }
}