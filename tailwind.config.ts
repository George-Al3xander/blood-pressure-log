import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
    content: ["./src/**/ui/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "geist-sans": ["var(--font-geist-sans)", ...fontFamily.sans],
                "geist-mono": ["var(--font-geist-mono)", ...fontFamily.mono],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
