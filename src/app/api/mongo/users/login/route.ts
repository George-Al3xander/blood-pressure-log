import { sessionLogin } from "@/lib/auth/actions";
import { TUserLoginData } from "@/lib/auth/zodSchemas";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/lib/mongo/schemas/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password }: TUserLoginData = await req.json();
    console.log("password check");
    try {
        if (!email || !password) throw new Error("No credentials");
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid email or password");
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const res = await sessionLogin({
                email,
                name: user.name,
                id: user._id,
            });
            if (!res.success) throw new Error("Error");
        }

        return NextResponse.json({ status: 200, isMatch });
    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}
