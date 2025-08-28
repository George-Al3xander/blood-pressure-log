import { metadata } from "@/app/config";
import { LayoutProps } from "@/app/model";
import { Providers } from "@/app/providers";
import { geistMono, geistSans } from "@/app/ui";
import "@/app/ui/main.css";
import { routing } from "@/shared/i18n";
import { Layout } from "@/shared/ui";
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
                <Providers>
                    <Layout
                        header={
                            <h1
                                style={{ fontSize: "1.25rem", fontWeight: 700 }}
                            >
                                {metadata.title?.toString()}
                            </h1>
                        }
                    >
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
