"use client"

import useMongoPagination from "@/hooks/useMongoPagination"
import React from "react"
import DataGridTable from "./data grid/data-grid"
import PlainTable from "./plain-table"
import useManageReports from "@/hooks/useManageReports"

const TestPaginationWrapper = ({
  count,
  locale,
}: {
  count: number
  locale: string
}) => {
  const {tableVariant,...props} = useManageReports()

  if (tableVariant == "plain") {
    return (
      <PlainTable
        pagination
        reportCount={count}
        {...props}        
      />
    )
  }

  return (
    <DataGridTable
      locale={locale}
      reportCount={count}
      {...props}      
    />
  )
}

export default TestPaginationWrapper
