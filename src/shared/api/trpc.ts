"use client";

import { AppRouter } from "@/shared/backend";
import { createTRPCReact } from "@trpc/react-query";

export const clientTrpc = createTRPCReact<AppRouter>();
