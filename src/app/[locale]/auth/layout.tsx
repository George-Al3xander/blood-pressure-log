import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import { json } from "stream/consumers";



export default function AuthLayout ({children, params: locale}:{children: ReactNode, params: {locale: string};}) {
    const messages = useMessages();
    

    return(<NextIntlClientProvider locale={locale.locale} messages={messages}>
    
        {children}
    </NextIntlClientProvider>)
}