import { getSession } from "@/lib/auth/actions";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "uk"] as const;
export const defaultLocale = "en" as const;

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const session = await getSession();
    const handleI18nRouting = createIntlMiddleware({
        locales,
        defaultLocale:
            (request.headers.get("x-default-locale") as "uk") || defaultLocale,
    });

    const homeUrl = new URL("/", request.url);
    const authUrl = new URL("/auth/login", request.url);

    const response = handleI18nRouting(request);
    response.headers.set(
        "x-default-locale",
        (request.headers.get("x-default-locale") as "uk") || defaultLocale,
    );

    if (pathname.includes("/_next")) return response;

    // if(!session.isLoggedIn && !pathname.includes('/auth') && !pathname.includes("/api")) {
    //   console.log("Redirect to auth")
    //   response.headers.set('x-middleware-rewrite', authUrl.toString());
    // }

    // if (pathname.includes('/auth')) {
    //     console.log("Redirect to home")  ;
    //     if(session.isLoggedIn) {
    //       console.log("We logged in");
    //       response.headers.set('x-middleware-rewrite', homeUrl.toString());
    //     }
    // }
    if (
        !session.isLoggedIn &&
        !pathname.includes("/auth") &&
        !pathname.includes("/api")
    ) {
        return NextResponse.redirect(authUrl, { status: 302 });
    }

    if (pathname.includes("/auth")) {
        if (session.isLoggedIn) {
            return NextResponse.redirect(homeUrl, { status: 302 });
        }
    }

    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
        // However, match all pathnames within `/users`, optionally with a locale prefix
        "/([\\w-]+)?/users/(.+)",
    ],
};
