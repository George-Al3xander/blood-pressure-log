import { NextRequest, NextResponse } from "next/server"
import {  connectToDatabase, disconnectFromDatabase } from "../../../../../lib/mongo";
import User from "../../../../../lib/mongo/schemas/user";
import { TUserRegisterData } from "../../../../../lib/auth/zodSchemas";
import bcrypt from "bcryptjs"
import mongoose, { ConnectOptions } from "mongoose";
const uri = process.env.MONGO_URI!

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function GET(req: NextRequest){
    const email  = req.nextUrl.searchParams.get("email")
    if(!email) return NextResponse.json({status: 400})
    if(mongoose.connection.readyState == 0) {
        await mongoose.connect(uri, clientOptions)
    }
    const user =  await User.findOne({email})  
  
    return NextResponse.json({status: 200,user});  
}


export async function POST(req: NextRequest) {  
    if(mongoose.connection.readyState == 0) {
        await mongoose.connect(uri, clientOptions)
    }      
    const {email,name_first,name_last,password}: TUserRegisterData = await req.json();

    try {
        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);
        const newUserData = {email: email.trim(), name: {first: name_first.trim(), last: name_last.trim()}, password: hashedPassword};
        const newUser = new User(newUserData);
        await newUser.save();
    

        return NextResponse.redirect(new URL('/auth/login?registerStatus=success', req.url))
    } catch (error) {
       /// console.log(error)
       return NextResponse.json({status: 500,message: error})        
    } 
}