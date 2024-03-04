import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../lib/auth/actions";
import { redirect } from "next/navigation";



export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const session = await getSession();
    const response =  NextResponse;

    if (pathname.startsWith("/_next")) return response.next();        

    if(!session.isLoggedIn && !pathname.startsWith('/auth') && !pathname.startsWith("/api")) return response.redirect(new URL('/auth/login', request.url))
    
    if (pathname.startsWith('/auth')) {
        if(session.isLoggedIn) return response.redirect(new URL('/', request.url));  
    }  
   
}