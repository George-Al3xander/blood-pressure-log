"use client"

import { LogPageSearchParams } from "@/app/[locale]/log/page"
import { useEffect, useState } from "react"
import { fetchMongoData } from "../../lib/mongo/actions"
import { LogReport } from "@/types/types"
import useLogSearchParams from "./useLogSearchParams"
import useHandleParams from "./useChangeSearchParams"

const useMongoPagination = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [reports, setReports] = useState<LogReport[]>([])
  const { pageSize, page, tableVariant } = useLogSearchParams()
  const { handleChange } = useHandleParams()

  const paginationModel = {
    pageSize: Number(pageSize),
    page: Number(page),
  }

  const onChange = ({
    page: newPage,
    pageSize: newPageSize,
  }: LogPageSearchParams) =>
    handleChange([
      { path: "page", value: newPage },
      { path: "pageSize", value: newPageSize },
    ])

  useEffect(() => {
    const abortController = new AbortController()
    setIsLoading(true)
    const fetchData = () => {
      fetchMongoData<{
        success: boolean
        reports: LogReport[]
      }>(`/api/mongo/reports?page=${page}&pageSize=${pageSize}`, {
        signal: abortController.signal,
      })
        .then(({ reports: reportsDb }) => {
          setReports(reportsDb)
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
    }
    fetchData()
    return () => abortController.abort()
  }, [page, pageSize])

  return {
    isLoading,
    isError,
    reports,
    onChange,
    paginationModel,
    tableVariant,
  }
}
export type UseMongoPaginationResult = ReturnType<typeof useMongoPagination>
export default useMongoPagination
