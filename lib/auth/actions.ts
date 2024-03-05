"use server"
import { getIronSession } from "iron-session"
import { SessionData, defaultSession, sessionOptions } from "./session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { TUserLoginData, UserRegisterSchema } from "./zodSchemas"

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    
    return session
}
export const sessionLogin = async (loginData: SessionData) => {
    const session = await getSession()
    const {email, name} = loginData
    // e.g. session.email = "your_email"
    if(!email || !name) return {success: false};
    session.email = email;
    session.name = name;
    session.isLoggedIn = true
    await session.save();
    return {success: true};
}

export const logout = async () => {
    const session = await getSession();
    session.destroy()
    redirect("/")
}

export const getRegisterSchema = async () => {
    const t = await getTranslations("zod")

    return UserRegisterSchema(t)
}