"use client"

import { TableVariantParam } from "@/types/types"
import { useSearchParams } from "next/navigation"

const useLogSearchParams = () => {
  const searchParams = useSearchParams()

  const tableVariant = (searchParams.get("tableVariant") ||
    "plain") as TableVariantParam
  const page = searchParams.get("page") || undefined
  const pageSize = searchParams.get("pageSize") || undefined

  return { tableVariant, page, pageSize }
}

export default useLogSearchParams
