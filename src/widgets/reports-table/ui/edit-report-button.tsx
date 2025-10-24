"use client";

import { TReport, useReportModalActions } from "@/shared/model";
import { EditIcon, IconButton, TableCell } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
    report: TReport;
};

export const EditReportButton: FC<Props> = ({ report }) => {
    const t = useTranslations("manageReport.update");
    const { openModal, setReport } = useReportModalActions();

    const handleClick = () => {
        setReport(report as TReport);
        openModal();
    };

    return (
        <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton aria-label={t("button.default")} onClick={handleClick}>
                <EditIcon
                    sx={{
                        color: "primary.main",
                        width: 20,
                        height: 20,
                    }}
                />
            </IconButton>
        </TableCell>
    );
};
