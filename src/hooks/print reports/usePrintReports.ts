"use client"
import React, { useEffect, useState } from "react"
import { TDateRangeData } from "../../../lib/auth/zodSchemas"
import dayjs from "dayjs"
import { LogReport } from "@/types/types"
import { fetchMongoData } from "../../../lib/mongo/actions"

export type TPrintHook = ReturnType<typeof usePrintReports>

const defaultStep = "select"
const defaultIsError = false
const defaultReports: LogReport[] = []
const defaultDateRange = {
  from: dayjs().subtract(1, "year").toDate(),
  to: dayjs().toDate(),
}
const usePrintReports = () => {
  const [step, setStep] = React.useState<"select" | "fetch" | "print">(
    defaultStep
  )
  const [isError, setIsError] = useState(defaultIsError)
  const [reports, setReports] = useState<LogReport[]>(defaultReports)
  const [dateRange, setDateRange] =
    React.useState<TDateRangeData>(defaultDateRange)

  const onValidationSuccess = async (data: TDateRangeData) => {
    setDateRange(data)
    setStep("fetch")
    try {
      const { from, to } = data
      const { reports } = await fetchMongoData<{ reports: LogReport[] }>(
        `/api/mongo/reports?gte=${from.toISOString()}&lte=${to.toISOString()}`
      )
      setReports(reports)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setStep("print")
    }
  }

  const reset = () => {
    setStep(defaultStep)
    setReports(defaultReports)
    setDateRange(defaultDateRange)
    setIsError(defaultIsError)
  }

  return { step, dateRange, onValidationSuccess, reports, isError, reset }
}

export default usePrintReports
