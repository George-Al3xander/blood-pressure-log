import { getQueryClient } from "@/shared/api";
import { createCallerFactory, createTRPCContext } from "@/shared/backend/init";
import { type AppRouter, appRouter } from "@/shared/backend/routers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import "server-only";

const getQueryClientCached = cache(getQueryClient);

const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc: serverTrpc, HydrateClient } =
    createHydrationHelpers<AppRouter>(caller, getQueryClientCached);
