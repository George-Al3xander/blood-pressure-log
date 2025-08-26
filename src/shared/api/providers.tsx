import { enUS, ukUA } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    locale: string;
}>;

export const Providers: FC<Props> = ({ children, locale }) => (
    <NextIntlClientProvider>
        <ClerkProvider localization={locale === "uk" ? ukUA : enUS}>
            {children}
        </ClerkProvider>
    </NextIntlClientProvider>
);
