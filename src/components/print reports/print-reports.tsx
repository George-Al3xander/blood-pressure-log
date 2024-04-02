"use client"
import React, { useState } from "react"
import DateRangePicker from "../date range picker/date-range-picker"
import { TDateRangeData } from "../../../lib/auth/zodSchemas"
import dayjs from "dayjs"
import usePrintReports from "@/hooks/print reports/usePrintReports"
import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import PrintBtn from "../print-btn"

const PrintReports = () => {
  const { onValidationSuccess, step, isError, reset, reports } =
    usePrintReports()
  if (isError)
    return (
      <Stack>
        <Typography>Error</Typography>
        <Button onClick={reset}>Try again</Button>
      </Stack>
    )
  return (
    <div>
      {step == "select" ? (
        <DateRangePicker onValidationSuccess={onValidationSuccess} />
      ) : step == "fetch" ? (
        <div>
          <CircularProgress role="status" />
        </div>
      ) : step == "print" ? (
        <div>
          <Typography>Ready to print</Typography>
          <PrintBtn reports={reports}/>
        </div>
      ) : (
        <div>Loose end</div>
      )}
    </div>
  )
}

export default PrintReports
