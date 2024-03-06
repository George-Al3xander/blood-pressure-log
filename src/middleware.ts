import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../lib/auth/actions";
import createMiddleware from 'next-intl/middleware';


// export async function middleware(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;
//     const session = await getSession();
//     const response =  NextResponse;

//     if (pathname.startsWith("/_next")) return response.next();        

//     if(!session.isLoggedIn && !pathname.startsWith('/auth') && !pathname.startsWith("/api")) return response.redirect(new URL('/auth/login', request.url))
    
//     if (pathname.startsWith('/auth')) {
//         if(session.isLoggedIn) return response.redirect(new URL('/', request.url));  
//     }  
   
// }

export const locales = ['en', 'uk'] as const
export const defaultLocale = 'en' as const

export default createMiddleware({locales,defaultLocale});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    '/([\\w-]+)?/users/(.+)'
  ]
};