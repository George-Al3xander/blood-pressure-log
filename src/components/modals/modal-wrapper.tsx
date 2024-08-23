"use client";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useTranslations } from "next-intl";
import * as React from "react";
export const modalContainerStyle: SxProps = {
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: "50%" }, // Adjust the width as needed
    // height: {xs:"90vh",md: "initial"}, // Use viewport height to make sure it fits within the screen
    bgcolor: "background.paper",
    boxShadow: 24,
    p: { xs: 2, md: 4 },
    borderRadius: 2,
};

export default function ModalWrapper({
    children,
    trigger,
}: {
    children: React.ReactNode;
    trigger: React.ReactElement;
}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const t = useTranslations("table");
    return (
        <div>
            <span onClick={handleOpen}>{trigger}</span>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalContainerStyle}>
                    {children}
                    <Button
                        onClick={handleClose}
                        sx={{ mt: 1 }}
                        fullWidth
                        startIcon={<CloseIcon />}
                        variant="outlined"
                    >
                        {t("btn_cancel")}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
