import { NextRequest, NextResponse } from "next/server";
import { TReportData } from "../../../../../lib/auth/zodSchemas";
import { connectToDatabase } from "../../../../../lib/mongo";
import Report from "../../../../../lib/mongo/schemas/report"
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken"
import User from "../../../../../lib/mongo/schemas/user";
import { getSession } from "../../../../../lib/auth/actions";
import mongoose from "mongoose";
import realData from "../../../../../public/json/realData.json"
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../../../../../lib/auth/session";

export async function GET(req: NextRequest) {    
    const headersList = headers();
    const authToken = (headersList.get("authorization") || '').split("Bearer ").at(1);
    //const id  = req.nextUrl.searchParams.get("id");
    try {   
      
        if(!authToken) throw new Error("Invalid token")

        const {email,userId} = jwt.verify(authToken!, process.env.JWT_SECRET_KEY!) as {userId?:string,email?:string};
               
        if(!email) throw new Error("Invalid user info");

        await connectToDatabase();
        const user =  await User.findOne({email}) ;
        if(!user) throw new Error("Invalid user info");

        const reports = await Report.find({userId})
        return NextResponse.json({status: 200,success: true,reports})        

    } catch (error) {      
       const message = 
       typeof error == "string" 
       ? error 
       : 
       (typeof error == "object")
       ? "message" in error!  
       ? error!.message 
       : "Something went wrong"
       : "Something went wrong"
       return NextResponse.json({status: 500,message})        
    }   
}

export async function PUT() {   
    // const headersList = headers();
    // const authToken = (headersList.get("authorization") || '').split("Bearer ").at(1);
  
    //     if(!authToken) throw new Error("Invalid token");
    //     const {email} = jwt.verify(authToken!, process.env.JWT_SECRET_KEY!) as {userId?:string,email?:string};
               
    //     if(!email) throw new Error("Invalid user info");
        
     
      
       
    //  await connectToDatabase();
    throw new Error("BRUH")
    return NextResponse.json({success: true})
    
}


export async function POST(req: NextRequest){
    const {date,sys,dia,pulse,rating,notes}: TReportData = await req.json();
    const {id} = await getSession();
    try {
      
        await connectToDatabase(); 
        const newReport = new Report({date,sys,dia,pulse,rating,notes,userId: id});
        await newReport.save();
        
        return NextResponse.json({status: 200,success: true})        

    } catch (error) {
       /// console.log(error)
       return NextResponse.json({status: 500,message: error})        
    } 
}