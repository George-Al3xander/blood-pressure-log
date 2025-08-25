import { ClerkProvider } from "@clerk/nextjs";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
    <ClerkProvider>{children}</ClerkProvider>
);
