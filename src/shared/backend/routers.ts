import { reportModel } from "@/shared/model";
import { baseProcedure, createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
    getUserReports: baseProcedure.query(async ({ ctx: { auth } }) => {
        const reports = await reportModel.find({ userId: auth.userId });

        return {
            reports,
        };
    }),
});

export type AppRouter = typeof appRouter;
