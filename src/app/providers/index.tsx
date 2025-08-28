import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "./with-clerk";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider>
        <ClerkProvider>{children}</ClerkProvider>
    </NextIntlClientProvider>
);
