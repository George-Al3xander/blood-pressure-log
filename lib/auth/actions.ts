"use server";
import { getIronSession } from "iron-session";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SessionData, defaultSession, sessionOptions } from "./session";
export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions,
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};

export const sessionLogin = async (loginData: SessionData) => {
    const session = await getSession();
    const { email, name, id } = loginData;
    // e.g. session.email = "your_email"
    if (!email || !name) return { success: false };
    session.email = email;
    session.name = name;
    session.id = id;
    session.isLoggedIn = true;
    await session.save();
    return { success: true };
};

export const getAccessToken = async (): Promise<{
    success: boolean;
    stored: boolean;
    token?: string;
}> => {
    const session = await getSession();
    if (!session || !session.isLoggedIn)
        return { success: false, stored: false };

    try {
        if (!session.apiToken) throw new Error("no token");
        jwt.verify(session.apiToken, process.env.JWT_SECRET_KEY!);
        return { success: true, stored: true, token: session.apiToken };
    } catch (err) {
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                userId: session.id,
                email: session.email,
            },
            process.env.JWT_SECRET_KEY!,
        );
        //await  updateSessionProperty({key:"apiToken",value: token})
        return { success: true, stored: false, token };
    }
};
