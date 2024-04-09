"use client"

import useMongoPagination from "@/hooks/useMongoPagination"
import React from "react"
import DataGridTable from "./data grid/data-grid"
import PlainTable from "./plain-table"

const TestPaginationWrapper = ({
  count,
  locale,
}: {
  count: number
  locale: string
}) => {
  const props = useMongoPagination()
  const { tableVariant } = props
  if (count == 0) return <div>Empty</div>

  if (tableVariant == "plain") {
    return <PlainTable pagination reportCount={count} {...props} />
  }

  return <DataGridTable locale={locale} reportCount={count} {...props} />
}

export default TestPaginationWrapper
