import * as React from "react"

import Button from "@mui/material/Button"

import PrintIcon from "@mui/icons-material/Print"
import { useTranslations } from "next-intl"

import PrintReports from "../print reports/print-reports-menu"

import ModalWrapper from "./modal-wrapper"

export default function PrintModal() {
  const t = useTranslations("table")

  return (
    <ModalWrapper
      trigger={
        <Button
          startIcon={<PrintIcon />}
          size="large"
          variant="contained"
          fullWidth
        >
          {t("btn_print.default")}
        </Button>
      }
    >
      <PrintReports />
    </ModalWrapper>
  )
}
