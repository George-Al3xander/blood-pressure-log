"use server"
import { getIronSession } from "iron-session"
import { SessionData, defaultSession, sessionOptions } from "./session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import {  UserRegisterSchema } from "./zodSchemas"
import jwt from "jsonwebtoken"
export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session
}




export const sessionLogin = async (loginData: SessionData) => {
    const session = await getSession()
    const {email, name,id} = loginData
    // e.g. session.email = "your_email"
    if(!email || !name) return {success: false};
    session.email = email;
    session.name = name;
    session.id = id;
    session.isLoggedIn = true
    await session.save();
    return {success: true};
}

const updateSessionProperty = async ({key,value}:{key: keyof SessionData,value: string}) => {

    const session = await getSession();
    if(!session ) return;
    session[key as 'id'] = value;
    await session.save();
}



export const getRegisterSchema = async () => {
    const t = await getTranslations("zod")

    return UserRegisterSchema(t)
}

export const  getAccessToken = async () : Promise<{success: boolean,stored: boolean, token?:string}> => {
    const session = await getSession();
    if(!session || !session.isLoggedIn) return {success:false, stored: false};

     
        try {
            if(!session.apiToken) throw new Error("no token")
            jwt.verify(session.apiToken, process.env.JWT_SECRET_KEY!);
            return {success: true, stored: true, token: session.apiToken}
          } catch(err) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                userId: session.id,
                email: session.email
            }, process.env.JWT_SECRET_KEY!);
            //await  updateSessionProperty({key:"apiToken",value: token})        
            return {success: true,stored:false, token};
        }
}   
