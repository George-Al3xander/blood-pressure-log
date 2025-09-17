import { reportModel, reportSchema, TReport } from "@/shared/model";
import { getTranslations } from "next-intl/server";
import { baseProcedure, createTRPCRouter } from "../init";

export const reportRouter = createTRPCRouter({
    list: baseProcedure.query(async ({ ctx: { auth } }) => {
        const reports = await reportModel.find({ userId: auth.userId });

        return {
            reports,
        };
    }),
    create: baseProcedure
        .input(async (data): Promise<TReport> => {
            const t = await getTranslations("validation");
            reportSchema(t).parse(data);
            return data as TReport;
        })
        .mutation(async ({ input, ctx: { auth } }) => {
            const reportData = { ...input, userId: auth.userId };
            await new reportModel(reportData).save();
        }),
});
