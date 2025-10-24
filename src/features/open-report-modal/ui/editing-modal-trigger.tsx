"use client";

import { TReport, useReportModalActions } from "@/shared/model";
import { EditIcon, IconButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
    report: TReport;
};

export const EditingModalTrigger: FC<Props> = ({ report }) => {
    const t = useTranslations("manageReport.update");
    const { openModal, setReport } = useReportModalActions();

    const handleClick = () => {
        setReport(report as TReport);
        openModal();
    };

    return (
        <IconButton aria-label={t("button.default")} onClick={handleClick}>
            <EditIcon
                sx={{
                    color: "primary.main",
                    width: 20,
                    height: 20,
                }}
            />
        </IconButton>
    );
};
