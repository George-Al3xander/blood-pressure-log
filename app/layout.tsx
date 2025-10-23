import { metadata } from "@/app/config";
import { LayoutProps } from "@/app/model";
import { Providers } from "@/app/providers";
import { geistMono, geistSans } from "@/app/ui";
import "@/app/ui/main.css";
import { routing } from "@/shared/i18n";
import { Layout, Stack, Typography } from "@/shared/ui";
import { ManageReportModal } from "@/widgets/manage-report";
import { UserMenu } from "@/widgets/menu";
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
                    <ManageReportModal />
                    <Layout
                        header={
                            <>
                                <Typography
                                    component="h1"
                                    fontSize="1.25rem"
                                    fontWeight={700}
                                >
                                    {metadata.title?.toString()}
                                </Typography>
                                <Stack direction="row">
                                    <UserMenu />
                                </Stack>
                            </>
                        }
                    >
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
