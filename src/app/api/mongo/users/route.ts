import { NextRequest, NextResponse } from "next/server"
import {  connectToDatabase, disconnectFromDatabase } from "../../../../../lib/mongo";
import User from "../../../../../lib/mongo/schemas/user";
import { TUserRegisterData } from "../../../../../lib/auth/zodSchemas";
import bcrypt from "bcryptjs"


// get user api endpoint
export async function GET(req: NextRequest){
    const email  = req.nextUrl.searchParams.get("email");
    if(!email) return NextResponse.json({status: 400})
    await connectToDatabase();
    const user =  await User.findOne({email})  
  
    return NextResponse.json({status: 200,user});  
}

// register user api endpoint
export async function POST(req: NextRequest) {  
    const {email,name_first,name_last,password}: TUserRegisterData = await req.json();
    
    try {
        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);
        await connectToDatabase();  
        const newUserData = {email: email.trim(), name: {first: name_first.trim(), last: name_last.trim()}, password: hashedPassword};
        const newUser = new User(newUserData);
        await newUser.save();
    
        return NextResponse.redirect(new URL('/auth/login?registerStatus=success', req.url))
    } catch (error) {
       /// console.log(error)
       return NextResponse.json({status: 500,message: error})        
    } 
}

