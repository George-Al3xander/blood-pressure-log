import { LayoutProps } from "@/app/model";
import { geistMono, geistSans } from "@/app/ui";
import "@/app/ui/main.css";
import { Providers } from "@/shared/api";
import { routing } from "@/shared/i18n";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export { metadata } from "@/app/config";

export default async function RootLayout({ children }: LayoutProps) {
    const locale = await getLocale();

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html
            lang={locale}
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="font-geist-mono">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
