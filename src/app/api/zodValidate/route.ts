import { NextResponse } from "next/server";
import { UserLoginSchema, UserRegisterSchema } from "../../../../lib/auth/zodSchemas";

export type Schemas = "login" | "register" | "report"
export type BodyReq = {data: unknown, type: Schemas}

const schemas = {
    login: UserLoginSchema,
    register:UserRegisterSchema,
    report:  UserLoginSchema
    //report: ReportSchema
}


export async function POST(request: Request) {
    
    const body: BodyReq  = await request.json();
    let zodErrs = {}   
    const res = schemas[body.type].safeParse(body.data);
    if(!res.success) {
        res.error.issues.forEach((issue) => {
            zodErrs = {...zodErrs, [issue.path[0]]: issue.message}
        });     
        return  NextResponse.json({errors: zodErrs})  
    }
   
    return  NextResponse.json({success: true}) ;
}