import { NextRequest, NextResponse } from "next/server"
import { TReportData } from "../../../../../../lib/auth/zodSchemas"

import Report from "../../../../../../lib/mongo/schemas/report"

import jwt from "jsonwebtoken"
import User from "../../../../../../lib/mongo/schemas/user"
import { getSession } from "../../../../../../lib/auth/actions"
import { headers } from "next/headers"
import { connectToDatabase } from "../../../../../../lib/mongo"

export async function GET(req: NextRequest) {
  const headersList = headers()
  const authToken = (headersList.get("authorization") || "")
    .split("Bearer ")
    .at(1)
  //const id  = req.nextUrl.searchParams.get("id");
  console.log("count fetched")

  try {
    if (!authToken) throw new Error("Invalid token")

    const { email, userId } = jwt.verify(
      authToken!,
      process.env.JWT_SECRET_KEY!
    ) as { userId?: string; email?: string }

    if (!email) throw new Error("Invalid user info")

    await connectToDatabase()
    const user = await User.findOne({ email })
    if (!user) throw new Error("Invalid user info")

    const count = await Report.countDocuments({ userId })

    return NextResponse.json({ status: 200, success: true, count })
  } catch (error) {
    const message =
      typeof error == "string"
        ? error
        : typeof error == "object"
        ? "message" in error!
          ? error!.message
          : "Something went wrong"
        : "Something went wrong"
    return NextResponse.json({ status: 500, message })
  }
}
