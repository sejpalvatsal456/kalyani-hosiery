import { connectDB } from "@/lib/connectDB";
import { getCookie } from "@/lib/cookies";
import { User } from "@/lib/models";
import { User as UserType } from "@/lib/typeDefinitions";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const PUT = async(req:NextRequest) => {
  try {
    
    await connectDB();

    const { name, email, address } = await req.json();

    const user_token = req.cookies.get("user_token");
    if(!user_token) {
      return NextResponse.json(
        { msg: "Invalid Credentials" },
        { status: 500 }
      );
    }
    const user = jwt.decode(user_token.value) as UserType;
    if(!user) {
      return NextResponse.json(
        { msg: "Invalid Credentials" },
        { status: 500 }
      );
    }

    const newUser = await User.findOneAndUpdate({ _id: user._id }, { $set: { name: name, email: email, address: address } }, { new: true });

    return NextResponse.json(
      { newUser: newUser },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 }
    )
  }
}