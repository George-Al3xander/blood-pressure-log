"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BodyReq, Schemas, schemas } from "@/app/api/zod/route"
import toast from "react-hot-toast"
import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"

import { AdditionalCheckItem } from "@/types/types"

const useZodValidate = ({
  onValidationSuccess,
  type,
  additionalCheck,
  defaultValues,
}: {
  onValidationSuccess: Function
  type: Schemas
  additionalCheck?: AdditionalCheckItem[]
  defaultValues?: any
}) => {
  const [extraCheck, setExtraCheck] = useState(false)

  const schema = schemas[type]
  const t = useTranslations("zod")

  const formReturn = useForm({
    resolver: zodResolver(schema(t)),
    defaultValues,
  })

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { isLoading },
  } = formReturn

  const onSubmit = async (data: unknown) => {
    setExtraCheck(true)

    const body: BodyReq = { data, type }
    const res = await fetch("/api/zod", {
      method: "POST",
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      toast.error(t("submit.fail"))
      return
    }

    const resData = await res.json()
    if (resData.errors) {
      const { errors } = resData
      const schemaKeys = Object.keys(schema)
      schemaKeys.forEach((key) => {
        if (errors[key]) {
          setError(key, {
            type: "server",
            message: errors[key],
          })
        }
      })
      return
    }

    if (additionalCheck) {
      let errCount = 0
      try {
        for (const { func, path, messagePath } of additionalCheck) {
          if (typeof path == "string") {
            const val = getValues(path)
            const res = await func(val)
            if (!res) {
              errCount = errCount + 1
              setError(path, {
                type: "server",
                message: t(`${path}.${messagePath}`),
              })
            }
          } else {
            const val = getValues(path)
            const pathMap = path.map((p, index) => [
              p,
              val[index],
            ]) as readonly (readonly [unknown, unknown])[]
            const entries = new Map(pathMap)
            const obj = Object.fromEntries(entries)

            const res = await func(obj)

            if (!res) {
              errCount = errCount + 1
              for (const pathItem of path) {
                setError(pathItem, {
                  type: "server",
                  message: t(messagePath),
                })
              }
            }
          }
        }
      } finally {
      }
      if (errCount > 0) return
    }
    await onValidationSuccess(data)
    setExtraCheck(false)
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) =>
    handleSubmit(onSubmit)(e)

  const isBusy = [isLoading, extraCheck].includes(true)

  return { ...formReturn, extraCheck, isBusy, submitForm }
}

export type UseZodValidateResult = ReturnType<typeof useZodValidate>

export default useZodValidate
