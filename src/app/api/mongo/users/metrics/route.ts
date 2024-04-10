import dayjs from "dayjs"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "../../../../../../lib/mongo"
import User from "../../../../../../lib/mongo/schemas/user"
import jwt from "jsonwebtoken"
import Report from "../../../../../../lib/mongo/schemas/report"
import { MetricsResponce } from "@/types/types"

export async function GET(req: NextRequest) {
  console.log("metrics fetched")
  const headersList = headers()
  const authToken = (headersList.get("authorization") || "")
    .split("Bearer ")
    .at(1)

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
    const result = await Report.aggregate(
      [
        { $match: { userId } },
        {
          $group: {
            _id: null,
            sys_average: { $avg: "$sys" },
            dia_average: { $avg: "$dia" },
            pulse_average: { $avg: "$pulse" },
            rating_average: { $avg: "$rating" },
          },
        },
      ],
      { allowDiskUse: true }
    )
    const data = result[0] as MetricsResponce
    const { email: emailDb, name, createdAt, _id } = user
    return NextResponse.json({
      status: 200,
      success: true,
      metrics: {
        reports_count: count,
        ...data,
      },
      userInfo: {
        email: emailDb,
        name,
        createdAt,
        _id,
      },
    })
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
