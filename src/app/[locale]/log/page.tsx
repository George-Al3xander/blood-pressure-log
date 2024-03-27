import PrintWrapper from "@/components/print-test"
import ReportsTable from "@/components/reports/reports-table"
import { LogReport, TableVariantParam } from "@/types/types"
import React from "react"
import { getAccessToken } from "../../../../lib/auth/actions"
import { headers } from "next/headers"
import { fetchMongoData } from "../../../../lib/mongo/actions"
import DataGridTable from "@/components/reports/data grid/data-grid"
import TestPaginationWrapper from "@/components/reports/test-pagination-wrapper"

export type LogPageSearchParams = Partial<{
  tableVariant: TableVariantParam
  pageSize: string
  page: string
}>

const LogPage = async ({
  params: { locale },
 // searchParams,
}: {
  params: { locale?: string }
  //searchParams: LogPageSearchParams
}) => {
 // const { tableVariant, page, pageSize } = searchParams
 // const variant = tableVariant ?? "plain"

  const {  count } = await fetchMongoData<{
    success: boolean 
    count: number
  }>(`/api/mongo/reports/count`)

  // if (variant == "complex") {
  //   return "COMPLEX"
  // }
  return(<div><TestPaginationWrapper count={count} /></div>)
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
