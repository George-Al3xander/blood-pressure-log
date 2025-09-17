import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "./with-clerk";
import { MuiProvider } from "./with-mui";
import { TRPCProvider } from "./with-trpc";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider>
        <ClerkProvider>
            <TRPCProvider>
                <MuiProvider>
                    <Toaster />
                    {children}
                </MuiProvider>
            </TRPCProvider>
        </ClerkProvider>
    </NextIntlClientProvider>
);
