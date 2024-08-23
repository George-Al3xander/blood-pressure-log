import {
    CreateReportModalProps,
    LogReport,
    TOptAction,
    UpdateReportModalProps,
} from "@/types/types";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Button, ButtonProps, IconButton, Modal } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { TReportData } from "../../../../lib/auth/zodSchemas";
import { manageReport } from "../../../../lib/mongo/utils";
import ManageLogForm from "../../log/manage-report-form";
import { modalContainerStyle } from "../modal-wrapper";

const TriggerButton = ({
    reqType,
    ...props
}: { reqType: string } & ButtonProps) => {
    const t = useTranslations("table");

    return reqType == "PUT" ? (
        <IconButton aria-label="edit" {...props}>
            <EditIcon />
        </IconButton>
    ) : (
        <Button
            startIcon={<PostAddIcon />}
            size="large"
            variant="contained"
            color="warning"
            fullWidth
            {...props}
        >
            {t("btn_create.default")}
        </Button>
    );
};

export default function ManageReportModal(
    props: UpdateReportModalProps & { type: "PUT" | "POST" },
): JSX.Element;
export default function ManageReportModal(
    props: CreateReportModalProps & { type: "PUT" | "POST" },
): JSX.Element;

export default function ManageReportModal({
    defaultValue,
    type,
    onOptimistic: withCallback,
}: (UpdateReportModalProps | CreateReportModalProps) & {
    type: "PUT" | "POST";
}) {
    const manageFunc = (data: LogReport | TReportData) =>
        manageReport(type, data);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onOptimistic = (args: TOptAction) => {
        return withCallback(args, handleClose);
    };
    return (
        <div>
            <TriggerButton onClick={handleOpen} reqType={type} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="log-manage-modal-title"
                aria-describedby="log-manage-modal-description"
            >
                <Box sx={modalContainerStyle}>
                    <ManageLogForm
                        defaultValue={defaultValue}
                        onValidationSuccess={manageFunc}
                        onOptimistic={onOptimistic}
                        type={type}
                    />
                </Box>
            </Modal>
        </div>
    );
}
