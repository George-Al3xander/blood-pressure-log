import dayjs from "dayjs"
import { TranslationValues, useTranslations } from "next-intl"
import { z } from "zod"

export const UserRegisterSchema = (
  t: (arg: string, values?: TranslationValues) => string
) =>
  z
    .object({
      name_first: z
        .string()
        .min(3, t("name_first.min", { length: 3 }))
        .max(256, t("name_first.max", { length: 256 })),
      name_last: z
        .string()
        .min(3, t("name_last.min", { length: 3 }))
        .max(256, t("name_last.max", { length: 256 })),
      email: z
        .string()
        .email(t("email.email"))
        .min(3, t("email.min", { length: 3 })),
      password: z
        .string()
        .min(8, t("password.min", { length: 8 }))
        .max(15, t("password.max", { length: 15 }))
        .refine((password) => /[a-z]/.test(password), {
          message: t("password.lowercase"),
        })
        .refine((password) => /[A-Z]/.test(password), {
          message: t("password.uppercase"),
        })
        .refine((password) => /\d/.test(password), {
          message: t("password.numeric"),
        })
        .refine((password) => /[!@_#$%^&*(),.?":{}|<>]/.test(password), {
          message: t("password.specialCharacter"),
        }),
      confirmPassword: z
        .string()
        .min(8, t("confirmPassword.min", { length: 8 }))
        .max(15, t("confirmPassword.max", { length: 15 })),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirmPassword.equality"),
      path: ["confirmPassword"],
    })

export const UserLoginSchema = (
  t: (arg: string, values?: TranslationValues) => string
) =>
  z.object({
    email: z
      .string()
      .email(t("email.email"))
      .min(3, t("email.min", { length: 3 })),
    password: z
      .string()
      .min(8, t("password.min", { length: 8 }))
      .max(15, t("password.max", { length: 15 })),
  })

const tableNumObj = (t: any) =>
  z.coerce
    .number()
    .gte(1, t("number.min", { length: 1 }))
    .lte(300, t("number.max", { length: 300 }))

export const ReportSchema = (
  t: (arg: string, values?: TranslationValues) => string
) =>
  z.object({
    date: z.coerce.date(),
    sys: tableNumObj(t),
    dia: tableNumObj(t),
    pulse: tableNumObj(t),
    rating: z.coerce
      .number()
      .gte(1, t("rating.min", { length: 1 }))
      .max(5, t("rating.max", { length: 5 })),
    notes: z
      .string()
      .min(10, t("notes.min", { length: 10 }))
      .max(250, t("notes.max", { length: 250 })),
  })

export const DateRangeSchema = (
  t: (arg: string, values?: TranslationValues) => string
) =>
  z
    .object({
      from: z.coerce.date(),
      to: z.coerce.date(),
    })
    .refine(({ from, to }) => dayjs(from).isBefore(dayjs(to)), {
      path: ["from"],
      message: t("date_range.from"),
    })
    .refine(({ from, to }) => dayjs(to).isAfter(dayjs(from)), {
      path: ["to"],
      message: t("date_range.to"),
    })

export type TUserLoginData = z.infer<ReturnType<typeof UserLoginSchema>>
export type TReportData = z.infer<ReturnType<typeof ReportSchema>>
export type TUserRegisterData = z.infer<ReturnType<typeof UserRegisterSchema>>
export type TUserLoginSchema = z.TypeOf<ReturnType<typeof UserLoginSchema>>
export type TUserRegisterSchema = z.TypeOf<
  ReturnType<typeof UserRegisterSchema>
>
export type TReportSchema = z.TypeOf<ReturnType<typeof ReportSchema>>
export type TDateRangeData = z.infer<ReturnType<typeof DateRangeSchema>>
