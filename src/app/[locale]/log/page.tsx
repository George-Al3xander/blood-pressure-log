import PrintWrapper from "@/components/print-test"
import ReportsTable from "@/components/reports/reports-table"
import { LogReport, TableVariantParam } from "@/types/types"
import React from "react"
import { getAccessToken } from "../../../../lib/auth/actions"
import { headers } from "next/headers"
import { fetchMongoData } from "../../../../lib/mongo/actions"
import DataGridTable from "@/components/reports/data grid/data-grid"

export type LogPageSearchParams = Partial<{
  tableVariant: TableVariantParam
  pageSize: string
  page: string
}>

const LogPage = async ({
  params: { locale },
  searchParams,
}: {
  params: { locale?: string }
  searchParams: LogPageSearchParams
}) => {
  const { tableVariant, page, pageSize } = searchParams
  const variant = tableVariant ?? "plain"

  const { reports, count } = await fetchMongoData<{
    success: boolean
    reports: LogReport[]
    count: number
  }>(`/api/mongo/reports?page=${page}&pageSize=${pageSize}`)

  if (variant == "complex") {
    return "COMPLEX"
  }

  return (
    <div>
      {reports.length > 0 ? (
        <DataGridTable
          searchParams={searchParams}
          rowCount={count}
          locale={locale || "en"}
          items={reports}
        />
      ) : (
        "No reports"
      )}
    </div>
  )
}

export default LogPage
