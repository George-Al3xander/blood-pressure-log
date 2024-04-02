"use client"
import React, { useState } from "react"
import DateRangePicker from "../date range picker/date-range-picker"
import { TDateRangeData } from "../../../lib/auth/zodSchemas"
import dayjs from "dayjs"
import usePrintReports from "@/hooks/print reports/usePrintReports"
import { Button, CircularProgress, Stack, Typography, Box } from "@mui/material"
import PrintBtn from "../print-btn"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { useTranslations } from "next-intl"

const PrintReports = () => {
  const { onValidationSuccess, step, isError, reset, reports } =
    usePrintReports()
  const t = useTranslations("table")
  if (isError)
    return (
      <Stack textAlign={"center"}>
        <Typography fontWeight={600} variant="h4" color={"Red"}>
          500
        </Typography>
        <Typography mb={4} variant="subtitle2">
          {t("error_message")}
        </Typography>
        <Button
          startIcon={<AutorenewIcon />}
          variant="contained"
          size="large"
          color="error"
          onClick={reset}
        >
          {t("btn_retry")}
        </Button>
      </Stack>
    )

  return (
    <Stack
      justifyContent={"center"}
      alignContent={"center"}
      direction={"column"}
    >
      {step == "select" ? (
        <>
          <DateRangePicker onValidationSuccess={onValidationSuccess} />
        </>
      ) : (
        <PrintBtn isLoading={step != "print"} reports={reports} />
      )}
    </Stack>
  )
}

export default PrintReports
