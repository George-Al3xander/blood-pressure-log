"use client";

import {
    useReportModalActions,
    useReportModalOpenStatus,
} from "@/shared/model";
import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@/shared/ui";
import { useReportMutation } from "../api/use-report-mutation";
import { ManageReportForm } from "./manage-report-form";

export const ManageReportModal = () => {
    const { t, ...formProps } = useReportMutation();
    const isDialogOpen = useReportModalOpenStatus();
    const { closeModal, clearReport } = useReportModalActions();

    const onSuccessAction = () => {
        formProps.onSuccessAction();
        if (formProps.report) {
            clearReport();
            closeModal();
        }
    };

    return (
        <Dialog open={isDialogOpen} onClose={closeModal}>
            <DialogTitle>{t("title")}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <ManageReportForm
                    {...formProps}
                    onSuccessAction={onSuccessAction}
                    resetOnSuccess
                    submitButtonChildren={t("button.default")}
                    submitButtonChildrenOnLoading={t("button.process")}
                />
            </DialogContent>
        </Dialog>
    );
};
