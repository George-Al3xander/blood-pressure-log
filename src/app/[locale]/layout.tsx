import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });
import { Container } from '@mui/material';

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
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <Container component={"div"}>
        {children}
        </Container>
        <Toaster />
      </AppRouterCacheProvider>
        </body>
    </html>
  );
}
