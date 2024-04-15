"use client"
import useZodValidate from "@/hooks/useZodValidate"
import React from "react"
import { TReportData, TReportSchema } from "../../../lib/auth/zodSchemas"
import {
  CreateReportProps,
  Field,
  LogReport,
  ManageReportProps,
  UpdateReportProps,
} from "@/types/types"
import { Button, Grid, Grid2Props, TextField } from "@mui/material"
import { useTranslations } from "next-intl"
import RatingRange from "./rating-range"
import BasicDateTimePicker from "./time-picker"
import dayjs from "dayjs"
import { v4 as uuidv4 } from "uuid"
import toast, { useToaster } from "react-hot-toast"

const fields: (Field<TReportSchema> & Grid2Props & { item?: boolean })[] = [
  {
    name: "sys",
    type: "number",
    xs: 12,
    md: 4,
    placeholder: "130",
  },
  {
    name: "dia",
    type: "number",
    xs: 12,
    md: 4,
    placeholder: "80",
  },
  {
    name: "pulse",
    type: "number",
    xs: 12,
    md: 4,
    placeholder: "75",
  },
  {
    name: "notes",
    xs: 12,
    multiline: true,
    minRows: 2,
  },
]

export default function ManageLogForm(props: UpdateReportProps): JSX.Element
export default function ManageLogForm(props: CreateReportProps): JSX.Element

export default function ManageLogForm({
  defaultValue,
  onValidationSuccess,
  type,
  onOptimistic,
}: UpdateReportProps | CreateReportProps) {
  const t = useTranslations("table")
  const tZod = useTranslations("zod")

  const onSuccess = async (data: TReportData) => {
    const tempId = uuidv4() // Math.random().toString() //
    const copy = { ...data, _id: tempId }
    if (defaultValue && "_id" in defaultValue) {
      ;(copy as any)._id = defaultValue._id
    }

    const res = await onValidationSuccess(copy)
    if (res.success) {
      if (res.report) {
        onOptimistic({ action: type, newReport: res.report })
        toast.success(
          tZod(`reportAction.${type == "POST" ? "create" : "update"}.success`)
        )
      }
      reset({
        notes: null,
        sys: null,
        dia: null,
        date: new Date(),
        rating: null,
        pulse: null,
      })
      return
    }
    toast.error(
      tZod(`reportAction.${type == "POST" ? "create" : "update"}.fail`)
    )
  }
  const {
    control,
    formState: { errors },
    isBusy,
    submitForm,
    register,
    reset,
  } = useZodValidate({
    onValidationSuccess: onSuccess,
    type: "report",
    defaultValues: {
      date: dayjs(defaultValue && defaultValue.date && defaultValue.date),
      rating: defaultValue && defaultValue.rating ? defaultValue.rating : 3,
    },
  })

  return (
    <Grid container component={"form"} onSubmit={submitForm}>
      <Grid spacing={2} container>
        {fields.map(({ name, type, xs, md, ...props }) => {
          return (
            <Grid key={name + "-grid"} xs={xs} md={md} item>
              <TextField
                required
                fullWidth
                label={t(name)}
                defaultValue={
                  defaultValue && defaultValue[name] ? defaultValue[name] : null
                }
                type={type ?? "text"}
                error={errors[name] != undefined}
                helperText={
                  errors[name] && errors
                    ? (errors[name]!.message as string)
                    : ""
                }
                InputProps={
                  type == "number"
                    ? { inputProps: { min: 1, max: 300 } }
                    : undefined
                }
                key={name}
                {...props}
                {...register(name)}
              />
            </Grid>
          )
        })}
        <BasicDateTimePicker
          defaultValue={defaultValue?.date.toString()}
          error={
            errors["date"] && errors
              ? (errors["date"]!.message as string)
              : undefined
          }
          control={control}
        />
        <RatingRange
          defaultValue={defaultValue?.rating}
          error={
            errors["rating"] && errors
              ? (errors["rating"]!.message as string)
              : undefined
          }
          control={control}
        />

        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" disabled={isBusy}>
            {isBusy
              ? t(`btn_${type == "POST" ? "create" : "edit"}.process`)
              : t(`btn_${type == "POST" ? "create" : "edit"}.default`)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
