"use client"

import useMongoPagination from "@/hooks/useMongoPagination"
import React from "react"
import DataGridTable from "./data grid/data-grid"
import PlainTable from "./plain-table"
import useManageReports from "@/hooks/useManageReports"
import NoReports from "./no-reports-component"
import ManageReportModal from "../modals/manage report modal/manage-report-modal"

const TestPaginationWrapper = ({
  count,
  locale,
}: {
  count: number
  locale: string
}) => {
  const { tableVariant, ...props } = useManageReports()
  if (count == 0) return <NoReports />

  return (
    <>
      <ManageReportModal type="POST" onOptimistic={props.onOptimistic} />
      {tableVariant == "plain" ? (
        <PlainTable pagination reportCount={count} {...props} />
      ) : (
        <DataGridTable locale={locale} reportCount={count} {...props} />
      )}
    </>
  )
}

export default TestPaginationWrapper
