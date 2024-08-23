import { NextRequest, NextResponse } from "next/server";

import { schemas } from "@/lib/mongo";
import { BodyReq } from "@/lib/mongo/schemas/schemas";
import { getTranslations } from "next-intl/server";

export async function POST(request: NextRequest) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
    const t = await getTranslations({ locale, namespace: "zod" });

    const body: BodyReq = await request.json();
    const schema = schemas[body.type](t);
    let zodErrs = {};
    const res = schema.safeParse(body.data);

    if (!res.success) {
        res.error.issues.forEach(
            (issue: { path: (string | number)[]; message: string }) => {
                zodErrs = { ...zodErrs, [issue.path[0]]: issue.message };
            },
        );
        return NextResponse.json({ errors: zodErrs });
    }

    return NextResponse.json({ success: true });
}
