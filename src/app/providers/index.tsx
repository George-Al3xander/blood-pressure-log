import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";
import { ClerkProvider } from "./with-clerk";
import { MuiProvider } from "./with-mui";
import { TRPCProvider } from "./with-trpc";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider>
        <ClerkProvider>
            <TRPCProvider>
                <MuiProvider>{children}</MuiProvider>
            </TRPCProvider>
        </ClerkProvider>
    </NextIntlClientProvider>
);
