import { connectDB } from "@/lib/connectDB";
import { getCookie } from "@/lib/cookies";
import { User } from "@/lib/models";
import { User as UserType } from "@/lib/typeDefinitions";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const PUT = async (req: NextRequest) => {
  try {
    await connectDB();

    const { name, email, address, phone, oldPassword, newPassword } = await req.json();

    const user_token = req.cookies.get("user_token");
    if (!user_token) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }
    const userFromCookie = jwt.decode(user_token.value) as UserType; // temporary fix, change the type when the cookie system changes
    const userId = userFromCookie._id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 500 });
    }

    console.log(user);

    let hashedPassword: string| null = null;

    if (oldPassword) {
      if(await bcrypt.compare(oldPassword, user.hashedPassword)) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      } else {
        return NextResponse.json(
          { msg: "Old password doesn't matched." },
          { status: 401 }
        );
      }
    }

    if(phone) {
      const userWithPhone = await User.findOne({ phone: phone });
      if(userWithPhone) return NextResponse.json(
        { msg: "User with this Phone already exist" },
        { status: 409 }
      );
    }

    const newUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { 
        name: name ? name : user.name,
        email: email ? email : user.email,
        address: address ? address : user.address,
        phone: phone ? phone : user.phone,
        hashedPassword: hashedPassword ? hashedPassword : user.hashedPassword
      } },
      { new: true },
    );

    return NextResponse.json({ newUser: newUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
};
