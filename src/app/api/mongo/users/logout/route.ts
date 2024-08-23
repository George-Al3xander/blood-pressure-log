import { getSession } from "@/lib/auth/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getSession();
    session.destroy();
    const homeUrl = new URL("/", request.url);

    return NextResponse.redirect(homeUrl);
}
