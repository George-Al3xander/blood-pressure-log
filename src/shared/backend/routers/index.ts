import { createTRPCRouter } from "../init";
import { reportRouter } from "./reportRouter";

export const appRouter = createTRPCRouter({
    report: reportRouter,
});

export type AppRouter = typeof appRouter;
