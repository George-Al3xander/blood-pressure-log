import { NextRequest, NextResponse } from "next/server";

import { getTranslations } from "next-intl/server";
import { BodyReq, schemas } from "../../../../lib/mongo/schemas/schemas";




export async function POST(request: NextRequest) {
 
   const locale = request.cookies.get("NEXT_LOCALE")?.value || "en"
   const t = await getTranslations({locale, namespace: 'zod'});
   
   const body: BodyReq  = await request.json();
   const schema  = schemas[body.type](t);   
    let zodErrs = {};
    const res = schema.safeParse(body.data);
   
    if(!res.success) {
    
        res.error.issues.forEach((issue: {path: (string | number)[], message: string}) => {
            zodErrs = {...zodErrs, [issue.path[0]]: issue.message}
        });     
        return  NextResponse.json({errors: zodErrs})  
    }
   
    return  NextResponse.json({success: true}) ;
}