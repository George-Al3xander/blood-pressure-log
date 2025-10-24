"use client";

import { useReportModalActions } from "@/shared/model";
import { AddBoxIcon, IconButton } from "@/shared/ui";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export const CreationModalTrigger = () => {
    const { isSignedIn, isLoaded } = useUser();
    const t = useTranslations("manageReport.create");
    const { openModal } = useReportModalActions();

    if (!isLoaded || !isSignedIn) return null;

    return (
        <IconButton aria-label={t("title")} onClick={openModal}>
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
