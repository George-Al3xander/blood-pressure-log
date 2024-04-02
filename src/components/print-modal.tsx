"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import PrintIcon from "@mui/icons-material/Print"
import { useTranslations } from "next-intl"
import PrintBtn from "./print-btn"
import PrintReports from "./print reports/print-reports-menu"
import { SxProps } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
const style: SxProps = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "0",
  right: "0",
  mx: "auto",
  height: { sx: "100vh", md: "initial" },
  width: { sx: "80vw", md: "40vw" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export default function PrintModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const t = useTranslations("table")
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<PrintIcon />}
        size="large"
        variant="contained"
        fullWidth
      >
        {t("btn_print.default")}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PrintReports />
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
  )
}
