import { LayoutProps } from "@/app/model";
import { geistMono, geistSans } from "@/app/ui";
import "@/app/ui/main.css";

export { metadata } from "@/app/config";

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="font-geist-mono">{children}</body>
        </html>
    );
}
