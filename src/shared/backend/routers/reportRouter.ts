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
            const reportData: Omit<TReport, "_id"> &
                Partial<Pick<TReport, "_id">> = {
                ...input,
                userId: auth.userId,
            };

            delete reportData._id;

            await new reportModel(reportData).save();
        }),
});
