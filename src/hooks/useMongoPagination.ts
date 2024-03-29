"use client"

import { LogPageSearchParams } from "@/app/[locale]/log/page"
import { useEffect, useState } from "react"
import { fetchMongoData } from "../../lib/mongo/actions"
import { LogReport, TableVariantParam } from "@/types/types"
import useLogSearchParams from "./useLogSearchParams"
import { useRouter } from "next/navigation"
import { handleLogPageParams } from "../../lib/utils"
import realData from "../../public/json/realData.json"
const useMongoPagination = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [reports, setReports] = useState<LogReport[]>([])
  const { pageSize, page, tableVariant } = useLogSearchParams()
  const router = useRouter()

  const paginationModel = {
    pageSize: Number(pageSize),
    page: Number(page),
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

export default useMongoPagination
