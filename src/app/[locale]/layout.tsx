import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });
import { Container } from '@mui/material';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import Header from '@/components/header';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/en-gb';
import "../../globals.css"
export const metadata: Metadata = {
  title: "Blood Pressure Log",
  description: "Watch your pressure",
};

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  params: {locale: string};
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  dayjs.locale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <AppRouterCacheProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header locale={locale}/>
                <Container sx={{mt:"5rem"}} component={"div"}>
                        {children}
                </Container>
              <Toaster />
            </NextIntlClientProvider>
      </AppRouterCacheProvider>
        </body>
    </html>
  );
}
