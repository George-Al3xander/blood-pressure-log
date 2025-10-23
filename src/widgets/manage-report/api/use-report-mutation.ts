import { clientTrpc } from "@/shared/api";
import { TReport, useModalReport } from "@/shared/model";
import { TRPCError } from "@trpc/server";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ZodError } from "zod";

export const useReportMutation = () => {
    const report = useModalReport() ?? undefined;
    const mutationType = report ? "update" : "create";

    const mutation = clientTrpc.report[mutationType].useMutation();
    const t = useTranslations(`manageReport.${mutationType}`);

    const onSubmitAction = async (r: TReport) => await mutation.mutateAsync(r);
    const onSuccessAction = () => {
        toast.success(t("action.success"));
    };
    const onErrorAction = (e: unknown) => {
        let message: string = t("action.fail");
        if (e instanceof ZodError || e instanceof TRPCError) {
            message = e.message;
        }

        toast.error(message);
    };

    return {
        t,
        report,
        onSubmitAction,
        onSuccessAction,
        onErrorAction,
    };
};
