"use client"

import React, { useEffect } from "react"
import {
  TUserLoginData,

} from "../../../lib/auth/zodSchemas"
import { ZodFormField, ZodValidationArgs } from "@/types/types"

import { checkIfUserExists, comparePassword } from "../../../lib/mongo/utils"

import { useRouter } from "next/navigation"
import ZodUserForm from "./zod-user-form"

const fields: ZodFormField<TUserLoginData>[] = [
  {
    name: "email",
    xs: 12,
  },
  {
    name: "password",
    type: "password",
    xs: 12,
  },
]

const LoginForm = () => {
  const router = useRouter()
  const props: ZodValidationArgs = {
    onValidationSuccess: () => {
      router.push("/")
      router.refresh()
    },
    type: "login",
    additionalCheck: [
      {
        path: ["email", "password"],
        messagePath: "invalidCredentials",
        func: checkIfUserExists,
      },
      {
        path: ["email", "password"],
        messagePath: "invalidCredentials",
        func: comparePassword,
      },
    ],
  }

  useEffect(() => {
    router.refresh()
  }, [])

  return <ZodUserForm fields={fields} {...props} />
}

export default LoginForm
