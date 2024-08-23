import { LogReport, TOptAction } from "@/types/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteReport } from "../../lib/mongo/utils";

const useDeleteReport = ({
    report,
    onOptimistic,
}: {
    report: LogReport;
    onOptimistic: (data: TOptAction) => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const t = useTranslations("table");

    const handleDelete = async () => {
        setIsLoading(true);
        const res = await deleteReport(report);
        if (res.success) {
            onOptimistic({ action: "DELETE", newReport: report });
            toast.success(t("deleteModal.message.success"));
        } else {
            toast.error(t("deleteModal.message.fail"));
        }
        setIsSuccess(res.success);
        setIsLoading(false);
    };
    return { isLoading, handleDelete, isSuccess };
};
export default useDeleteReport;
