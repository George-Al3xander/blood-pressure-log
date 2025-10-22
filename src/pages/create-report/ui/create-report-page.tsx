"use client";

import { clientTrpc } from "@/shared/api";
import { TReport } from "@/shared/model";
import { ManageReportForm } from "@/widgets/manage-report-form";
import { TRPCError } from "@trpc/server";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export const CreateReportPage = () => {
    const mutation = clientTrpc.report.create.useMutation();
    const t = useTranslations("createReport");

    const onSubmitAction = async (r: TReport) => await mutation.mutateAsync(r);
    const onSuccessAction = () => {
        toast.success(t("action.success"));
    };
    const onErrorAction = (e: unknown) => {
        let message: string = t("action.success");
        if (e instanceof ZodError || e instanceof TRPCError) {
            message = e.message;
        }

        toast.error(message);
    };

    return (
        <ManageReportForm
            resetOnSuccess
            onSubmitAction={onSubmitAction}
            onSuccessAction={onSuccessAction}
            onErrorAction={onErrorAction}
            submitButtonChildren={t("button.default")}
            submitButtonChildrenOnLoading={t("button.process")}
        />
    );
};
