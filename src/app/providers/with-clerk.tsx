import { enUS, ukUA } from "@clerk/localizations";
import { ClerkProvider as NextClerkProvider } from "@clerk/nextjs";
import { getLocale } from "next-intl/server";
import { FC, PropsWithChildren } from "react";

export const ClerkProvider: FC<PropsWithChildren> = async ({ children }) => {
    const locale = await getLocale();
    const localization = locale === "uk" ? ukUA : enUS;

    return (
        <NextClerkProvider localization={localization}>
            {children}
        </NextClerkProvider>
    );
};
