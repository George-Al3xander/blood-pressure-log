import { sessionLogin } from "@/lib/auth/actions";
import { TEditUserSchema, TUserRegisterData } from "@/lib/auth/zodSchemas";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/lib/mongo/schemas/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// get user api endpoint
export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ status: 400 });
    await connectToDatabase();
    const user = await User.findOne({ email });

    return NextResponse.json({ status: 200, user });
}

// register user api endpoint
export async function POST(req: NextRequest) {
    const { email, name_first, name_last, password }: TUserRegisterData =
        await req.json();

    try {
        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);
        await connectToDatabase();
        const newUserData = {
            email: email.trim(),
            name: { first: name_first.trim(), last: name_last.trim() },
            password: hashedPassword,
        };
        const newUser = new User(newUserData);
        await newUser.save();

        return NextResponse.redirect(
            new URL("/auth/login?registerStatus=success", req.url),
        );
    } catch (error) {
        /// console.log(error)
        return NextResponse.json({ status: 500, message: error });
    }
}

export async function PUT(req: NextRequest) {
    const {
        email,
        name_first,
        name_last,
        _id,
    }: TEditUserSchema & { _id?: string } = await req.json();
    console.log("user put req");
    try {
        if (!_id) throw new Error("No user ID provided");
        await connectToDatabase();
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    email,
                    name: {
                        first: name_first,
                        last: name_last,
                    },
                },
            },
            { new: true },
        );
        const { email: newEmail, name } = updatedUser;

        await sessionLogin({ name, email: newEmail, id: _id });
        revalidatePath("/log/profile");
        return NextResponse.json({ success: true }, { status: 200 });
        //return NextResponse.redirect(new URL("/log/profile?pageMode=view", req.url))
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: error });
    }
}
