"use client";

import { clientTrpc, queryClient } from "@/shared/api";
import { env } from "@/shared/config";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { FC, PropsWithChildren, useState } from "react";

export const TRPCProvider: FC<PropsWithChildren> = ({ children }) => {
    const [trpcClient] = useState(() =>
        clientTrpc.createClient({
            links: [
                httpBatchLink({
                    url: env.NEXT_PUBLIC_BASE_URL,
                }),
            ],
        }),
    );

    return (
        <clientTrpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </clientTrpc.Provider>
    );
};
