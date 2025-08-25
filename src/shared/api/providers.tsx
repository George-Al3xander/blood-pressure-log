import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider>
        <ClerkProvider>{children}</ClerkProvider>
    </NextIntlClientProvider>
);
