import PrintWrapper from "@/components/modals/print-modal"
import ReportsTable from "@/components/reports/reports-table"
import { LogReport, TableVariantParam } from "@/types/types"
import React from "react"
import { getAccessToken } from "../../../../lib/auth/actions"
import { headers } from "next/headers"
import { fetchMongoData } from "../../../../lib/mongo/actions"
import DataGridTable from "@/components/reports/data grid/data-grid"
import TestPaginationWrapper from "@/components/reports/test-pagination-wrapper"
import DateRangePicker from "@/components/date range picker/date-range-picker"
import PrintReports from "@/components/print reports/print-reports-menu"

export type LogPageSearchParams = Partial<{
  tableVariant: TableVariantParam
  pageSize: string
  page: string
}>

const LogPage = async ({
  params: { locale },
}: {
  params: { locale?: string }
}) => {
  const { count } = await fetchMongoData<{
    success: boolean
    count: number
  }>(`/api/mongo/reports`)

  return (
    <>
      <TestPaginationWrapper locale={locale || "en"} count={count} />
    </>
  )
}

export default LogPage
