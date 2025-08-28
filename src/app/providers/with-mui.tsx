"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";

const theme = createTheme({
    typography: {
        fontFamily: "var(--font-geist-sans)",
    },
});

export const MuiProvider: FC<PropsWithChildren> = ({ children }) => (
    <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
);
