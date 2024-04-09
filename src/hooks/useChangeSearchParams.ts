"use client"

import { useRouter, useSearchParams } from "next/navigation"
type Param = { path: string; value?: string }
const useHandleParams = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleChange = (args: Param | Param[]) => {
    const params = new URLSearchParams(searchParams)
    if (Array.isArray(args)) {
      for (const { path, value } of args) {
        if (value) {
          params.set(path, value)
        } else {
          params.delete(path)
        }
      }
    } else {
      const { path, value } = args
      if (value) {
        params.set(path, value)
      } else {
        params.delete(path)
      }
    }

    router.push(`?${params.toString()}`)
  }

  return { searchParams, handleChange }
}

export default useHandleParams
