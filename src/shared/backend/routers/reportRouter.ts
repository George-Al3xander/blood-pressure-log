import { reportModel } from "@/shared/model";
import { baseProcedure, createTRPCRouter } from "../init";

export const reportRouter = createTRPCRouter({
    list: baseProcedure.query(async ({ ctx: { auth } }) => {
        const reports = await reportModel.find({ userId: auth.userId });

        return {
            reports,
        };
    }),
});
