import Header from "@/components/header";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import "dayjs/locale/uk";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../../globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Blood Pressure Log",
    description: "Watch your pressure",
};

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    params: { locale: string };
    children: React.ReactNode;
}>) {
    const messages = useMessages();
    dayjs.locale(locale);
    return (
        <html lang={locale}>
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <Header locale={locale} />
                        <Container sx={{ mt: "5rem" }} component={"div"}>
                            {children}
                        </Container>
                        <Toaster />
                    </NextIntlClientProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
