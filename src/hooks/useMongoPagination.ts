"use client"

import { LogPageSearchParams } from "@/app/[locale]/log/page"
import { useEffect, useState } from "react"
import { fetchMongoData } from "../../lib/mongo/actions"
import { LogReport, TableVariantParam } from "@/types/types"
import { useSearchParams } from "next/navigation"

const useMongoPagination = () =>
  
  {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [reports, setReports] = useState<LogReport[]>([])
    const searchParams = useSearchParams()
    const page = searchParams.get("page") || "0"
    const pageSize = searchParams.get("pageSize") || "21"

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

    return { isLoading, isError, reports }
  }

export default useMongoPagination
