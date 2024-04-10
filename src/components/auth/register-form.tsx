"use client"
import React from "react"
import { TUserRegisterData } from "../../../lib/auth/zodSchemas"
import { ZodFormField, ZodValidationArgs } from "@/types/types"

import { checkIfUserExists, registerUser } from "../../../lib/mongo/utils"

import ZodUserForm from "./zod-user-form"

const fields: ZodFormField<TUserRegisterData>[] = [
  {
    name: "name_first",
    xs: 12,
    md: 6,
  },
  {
    name: "name_last",
    xs: 12,
    md: 6,
  },
  {
    name: "email",
    xs: 12,
  },
  {
    name: "password",
    type: "password",
    xs: 12,
  },
  {
    name: "confirmPassword",
    type: "password",
    xs: 12,
  },
]

const props: ZodValidationArgs = {
  onValidationSuccess: registerUser,
  type: "register",
  additionalCheck: [
    {
      path: "email",
      messagePath: "email.existingUser",
      func: checkIfUserExists,
    },
  ],
}

const RegisterForm = () => <ZodUserForm fields={fields} {...props} />

export default RegisterForm
