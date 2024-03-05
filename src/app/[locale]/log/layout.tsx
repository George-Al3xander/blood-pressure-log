import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import { json } from "stream/consumers";
import { getSession } from "../../../../lib/auth/actions";
import { redirect } from "next/navigation";



export default async function LogLayout ({children}:{children: ReactNode, params: {locale: string};}) {

    const session = await getSession();  
    if(!session.isLoggedIn) redirect("/auth/login");

    return(<>{children}</>)
}