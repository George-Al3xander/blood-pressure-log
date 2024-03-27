"use client"
import { LogPageSearchParams } from "@/app/[locale]/log/page"
import useMongoPagination from "@/hooks/useMongoPagination"
import React from "react"
import DataGridTable from "./data grid/data-grid"
import { useRouter, useSearchParams } from "next/navigation"
import { TableVariantParam } from "@/types/types"

import useLogSearchParams from "@/hooks/useLogSearchParams"
import { handleLogPageParams } from "../../../lib/utils"

const TestPaginationWrapper = (props: { count: number }) => {
  const { reports, isLoading } = useMongoPagination()
  const router = useRouter()
  const { pageSize, page, tableVariant } = useLogSearchParams()

  const paginationModel = {
    pageSize: Number(pageSize || 30),
    page: Number(page || 0),
  }

  const onChange = ({
    page: newPage,
    pageSize: newPageSize,
  }: LogPageSearchParams) =>
    router.push(
      handleLogPageParams({
        tableVariant,
        page: newPage!.toString(),
        pageSize: newPageSize!.toString(),
      })
    )

  if (props.count == 0) return <div>Empty</div>

  return (
    <div>
      <DataGridTable
        locale="en"
        rowCount={props.count}
        items={reports}
        onChange={onChange}
        paginationModel={paginationModel}
        isLoading={isLoading}
      />
    </div>
  )
}

export default TestPaginationWrapper
