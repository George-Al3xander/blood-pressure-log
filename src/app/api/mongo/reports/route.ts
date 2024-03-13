import { NextRequest, NextResponse } from "next/server";
import { TReportData } from "../../../../../lib/auth/zodSchemas";
import { connectToDatabase } from "../../../../../lib/mongo";
import Report from "../../../../../lib/mongo/schemas/report"




export async function POST(req: NextRequest){
    const {date,sys,dia,pulse,rating,notes}: TReportData = await req.json();

    try {
       
        await connectToDatabase(); 
        const newReport = new Report({date,sys,dia,pulse,rating,notes});
        await newReport.save();
    
        return NextResponse.json({status: 200,success: true})        

    } catch (error) {
       /// console.log(error)
       return NextResponse.json({status: 500,message: error})        
    } 
}