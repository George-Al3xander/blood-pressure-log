import { metadata } from "@/app/config";
import { LayoutProps } from "@/app/model";
import { Providers } from "@/app/providers";
import { geistMono, geistSans } from "@/app/ui";
import "@/app/ui/main.css";
import { routing } from "@/shared/i18n";
import { AddBoxIcon, IconButton, Layout, Stack, Typography } from "@/shared/ui";
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
                                    <IconButton>
                                        <AddBoxIcon
                                            sx={{
                                                color: "primary.contrastText",
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    </IconButton>
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
