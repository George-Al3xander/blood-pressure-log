import { NextRequest, NextResponse } from "next/server";
import { DateRangeSchema, ReportSchema, UserLoginSchema, UserRegisterSchema } from "../../../../lib/auth/zodSchemas";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export type Schemas = "login" | "register" | "report" | "dateRange"
export type BodyReq = {data: unknown, type: Schemas}

export const schemas = {
    login: UserLoginSchema,
    register:UserRegisterSchema,
    report:  ReportSchema,
    dateRange: DateRangeSchema   
}


export async function POST(request: NextRequest) {
 
   const locale = request.cookies.get("NEXT_LOCALE")?.value || "en"
   const t = await getTranslations({locale, namespace: 'zod'});
   
   const body: BodyReq  = await request.json();
   const schema  = schemas[body.type](t);   
    let zodErrs = {};
    const res = schema.safeParse(body.data);
   
    if(!res.success) {
        res.error.issues.forEach((issue: {path: string[], message: string}) => {
            zodErrs = {...zodErrs, [issue.path[0]]: issue.message}
        });     
        return  NextResponse.json({errors: zodErrs})  
    }
   
    return  NextResponse.json({success: true}) ;
}