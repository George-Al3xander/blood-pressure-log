import { getSession } from "@/lib/auth/actions";
import { TReportData } from "@/lib/auth/zodSchemas";

import { connectToDatabase, Report, User } from "@/lib/mongo";

import { NextRequest, NextResponse } from "next/server";

import { LogReport } from "@/types/types";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
    console.log("reports fetched");
    const headersList = headers();
    const authToken = (headersList.get("authorization") || "")
        .split("Bearer ")
        .at(1);
    try {
        if (!authToken) throw new Error("Invalid token");

        const { email, userId } = jwt.verify(
            authToken!,
            process.env.JWT_SECRET_KEY!,
        ) as { userId?: string; email?: string };

        if (!email) throw new Error("Invalid user info");

        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid user info");
        const page = Number(req.nextUrl.searchParams.get("page") || "0");
        const pageSize = Number(
            req.nextUrl.searchParams.get("pageSize") || "30",
        );
        const gte = req.nextUrl.searchParams.get("gte");
        const lte = req.nextUrl.searchParams.get("lte");
        const skip = page * pageSize;

        const searchModel: { userId?: string; date?: any } = {
            userId,
            date: {
                $gte: dayjs(gte).startOf("day").toDate(),
                $lte: dayjs(lte).endOf("day").toDate(),
            },
        };

        if (!lte || !gte) {
            delete searchModel.date;
        }
        //@ts-ignore
        const reports = await Report.find(searchModel)
            .sort({ date: "desc" })
            .limit(pageSize)
            .skip(skip);

        const count = await Report.countDocuments({ userId });
        return NextResponse.json({
            status: 200,
            success: true,
            reports,
            count,
        });
    } catch (error) {
        const message =
            typeof error == "string"
                ? error
                : typeof error == "object"
                  ? "message" in error!
                      ? error!.message
                      : "Something went wrong"
                  : "Something went wrong";
        return NextResponse.json({ status: 500, message });
    }
}

export async function PUT(req: NextRequest) {
    const { date, sys, dia, pulse, rating, notes, _id }: LogReport =
        await req.json();
    const headersList = headers();

    const authToken = (headersList.get("authorization") || "")
        .split("Bearer ")
        .at(1);
    try {
        if (!authToken) throw new Error("Invalid token");
        const { email, userId } = jwt.verify(
            authToken!,
            process.env.JWT_SECRET_KEY!,
        ) as { userId?: string; email?: string };

        if (!email) throw new Error("Invalid user info");
        await connectToDatabase();
        if (!_id) throw new Error();
        //@ts-ignore
        const item = await Report.findByIdAndUpdate(
            _id,
            {
                $set: {
                    date,
                    sys,
                    dia,
                    pulse,
                    rating,
                    notes,
                },
            },
            { new: true },
        );

        return NextResponse.json(
            { status: 200, success: true, report: item },
            { status: 200 },
        );
    } catch (error) {
        /// console.log(error)
        console.log(error);
        return NextResponse.json(
            { status: 500, message: error },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest) {
    const { _id }: LogReport = await req.json();
    const headersList = headers();

    const authToken = (headersList.get("authorization") || "")
        .split("Bearer ")
        .at(1);
    try {
        if (!authToken) throw new Error("Invalid token");
        if (!_id) throw new Error("No id provided");
        const { email, userId } = jwt.verify(
            authToken!,
            process.env.JWT_SECRET_KEY!,
        ) as { userId?: string; email?: string };

        if (!email) throw new Error("Invalid user info");
        await connectToDatabase();
        if (!_id) throw new Error();
        //@ts-ignore
        await Report.findByIdAndDelete(_id);

        return NextResponse.json(
            { status: 200, success: true },
            { status: 200 },
        );
    } catch (error) {
        /// console.log(error)
        console.log(error);
        return NextResponse.json(
            { status: 500, message: error },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    const { date, sys, dia, pulse, rating, notes }: TReportData =
        await req.json();
    const { id } = await getSession();
    try {
        await connectToDatabase();
        const newReport = new Report({
            date,
            sys,
            dia,
            pulse,
            rating,
            notes,
            userId: id,
        });
        const item = await newReport.save();

        return NextResponse.json(
            { status: 200, success: true, report: item },
            { status: 200 },
        );
    } catch (error) {
        /// console.log(error)
        return NextResponse.json(
            { status: 500, message: error },
            { status: 500 },
        );
    }
}
