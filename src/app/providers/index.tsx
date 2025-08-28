import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "./with-clerk";
import { MuiProvider } from "./with-mui";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider>
        <ClerkProvider>
            <MuiProvider>{children}</MuiProvider>
        </ClerkProvider>
    </NextIntlClientProvider>
);
