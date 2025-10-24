import { reportModel } from "@/shared/api";
import { parseAsReport, TReport } from "@/shared/model";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

const PAGE_NUMBER = 1;
const PER_PAGE = 20;

const paginationModel = z
    .object({
        page: z.number().optional().default(PAGE_NUMBER),
        perPage: z.number().optional().default(PER_PAGE),
    })
    .default({
        page: PAGE_NUMBER,
        perPage: PER_PAGE,
    });

export const reportRouter = createTRPCRouter({
    list: baseProcedure.input(paginationModel).query(
        async ({
            input: { page, perPage },
            ctx: {
                auth: { userId },
            },
        }) => {
            const skip = (page - 1) * perPage;

            const reports = (await reportModel
                .find({ userId })
                .sort({ date: "desc" })
                .limit(perPage)
                .skip(skip)) as unknown as Report[];

            return {
                reports,
            };
        },
    ),
    count: baseProcedure.input(paginationModel).query(
        async ({
            input: { perPage },
            ctx: {
                auth: { userId },
            },
        }) => {
            const count = await reportModel.countDocuments({ userId });

            const pages = Math.ceil(count / perPage);

            return { count, pages };
        },
    ),
    create: baseProcedure
        .input(async (data): Promise<TReport> => {
            const t = await getTranslations("validation");
            parseAsReport(t).parse(data);
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
    update: baseProcedure
        .input(async (data): Promise<TReport> => {
            const t = await getTranslations("validation");
            parseAsReport(t).parse(data);
            return data as TReport;
        })
        .mutation(async ({ input }) => {
            const { _id, ...update } = input;
            const updated = await reportModel.findOneAndUpdate(
                { _id },
                update,
                {
                    new: true,
                },
            );

            if (!updated) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Report not found.",
                });
            }

            return updated;
        }),
});
