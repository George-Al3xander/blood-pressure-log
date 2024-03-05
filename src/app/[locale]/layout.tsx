import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });
import { Container } from '@mui/material';
import { NextIntlClientProvider, useMessages } from 'next-intl';

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
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <Container component={"div"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        </NextIntlClientProvider>
        </Container>
        <Toaster />
      </AppRouterCacheProvider>
        </body>
    </html>
  );
}
