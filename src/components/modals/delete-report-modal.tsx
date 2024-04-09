import React from "react"
import ModalWrapper from "./modal-wrapper"

import {
  ButtonProps,
  IconButton,
  Modal,
  Box,
  Stack,
  Typography,
  Button as MuiButton,
} from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { LogReport, TOptAction } from "@/types/types"
import { useTranslations } from "next-intl"
import dayjs from "dayjs"
import useDeleteReport from "@/hooks/useDeleteReport"

const Button = () => (
  <IconButton color="error" aria-label="delete-report">
    <DeleteForeverIcon />
  </IconButton>
)
const properties: (keyof LogReport)[] = [
  "date",
  "sys",
  "dia",
  "pulse",
  "rating",
  "notes",
]
const DeleteReportModal = ({
  report,
  onOptimistic,
}: {
  report: LogReport
  onOptimistic: (data: TOptAction) => void
}) => {
  const t = useTranslations("table")
  const { isLoading, handleDelete, isSuccess } = useDeleteReport({
    report,
    onOptimistic,
  })

  return (
    <ModalWrapper trigger={<Button />}>
      <Stack gap={1}>
        {isSuccess ? (
          <>
            <Typography fontWeight={700} textAlign={"center"}>
              {t("deleteModal.message.success")}
            </Typography>
          </>
        ) : (
          <>
            <Typography fontWeight={700} textAlign={"center"}>
              {t("deleteModal.message.header")}
            </Typography>
            <Stack gap={1}>
              {properties.map((prop) => (
                <Typography variant="subtitle2" key={report._id + prop}>
                  {t(prop)}:{" "}
                  {prop == "date"
                    ? dayjs(report[prop]).format("DD/MM/YYYY - H:mm")
                    : report[prop]}
                </Typography>
              ))}
            </Stack>
            <Typography
              fontStyle={"italic"}
              variant="caption"
              fontWeight={700}
              textAlign={"center"}
            >
              {t("deleteModal.message.additional")}
            </Typography>

            <MuiButton
              onClick={handleDelete}
              disabled={isLoading}
              startIcon={<DeleteForeverIcon />}
              color="error"
              variant="contained"
            >
              {t("deleteModal.btn")}
            </MuiButton>
          </>
        )}
      </Stack>
    </ModalWrapper>
  )
}

export default DeleteReportModal
