"use client";

import { useReportModalActions } from "@/shared/model";
import { AddBoxIcon, IconButton } from "@/shared/ui";
import { useTranslations } from "next-intl";

export const OpenReportModalButton = () => {
    const t = useTranslations("manageReport.dialog.button");
    const { openModal } = useReportModalActions();

    return (
        <IconButton onClick={openModal} aria-label={t("open")}>
            <AddBoxIcon
                sx={{
                    color: "primary.contrastText",
                    width: 30,
                    height: 30,
                }}
            />
        </IconButton>
    );
};
