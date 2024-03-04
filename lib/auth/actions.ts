"use server"
import { getIronSession } from "iron-session"
import { SessionData, defaultSession, sessionOptions } from "./session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { UserRegisterSchema } from "./zodSchemas"

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    
    return session
}
export const login = async () => {
    const session = await getSession()

    // e.g. session.email = "your_email"

    session.save()
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