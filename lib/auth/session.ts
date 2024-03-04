

import {SessionOptions} from "iron-session"

export interface SessionData {
    name?: {first:string,last:string},
    email?: string,
    isLoggedIn?: boolean
}

export const sessionOptions: SessionOptions ={
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: "bpl-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"
    }
}

export const defaultSession:SessionData = {
    isLoggedIn:false
  }