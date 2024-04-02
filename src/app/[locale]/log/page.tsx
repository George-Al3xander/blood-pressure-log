import PrintWrapper from "@/components/print-test"
import ReportsTable from "@/components/reports/reports-table"
import { LogReport, TableVariantParam } from "@/types/types"
import React from "react"
import { getAccessToken } from "../../../../lib/auth/actions"
import { headers } from "next/headers"
import { fetchMongoData } from "../../../../lib/mongo/actions"
import DataGridTable from "@/components/reports/data grid/data-grid"
import TestPaginationWrapper from "@/components/reports/test-pagination-wrapper"
import DateRangePicker from "@/components/date range picker/date-range-picker"

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
  return (
    <DateRangePicker
      from="2024-03-04T05:37:27.142+00:00"
      to="2024-03-14T00:00:00.000+00:00"
    />
  )

  const { count } = await fetchMongoData<{
    success: boolean
    count: number
  }>(`/api/mongo/reports`)

  return (
    <>
      <PrintWrapper>
        <h1>Test</h1>
      </PrintWrapper>
      <TestPaginationWrapper locale={locale || "en"} count={count} />
    </>
  )
}

export default LogPage
