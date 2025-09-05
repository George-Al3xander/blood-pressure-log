import { reportModel } from "@/shared/model";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
    getUserReports: baseProcedure.input(z.string()).query(async (opts) => {
        const reports = await reportModel.find({ userId: opts.input });

        return {
            reports,
        };
    }),
});

export type AppRouter = typeof appRouter;
