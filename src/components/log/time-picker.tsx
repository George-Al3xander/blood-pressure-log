import * as React from "react"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { Grid } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import dayjs from "dayjs"
import { CustomInput } from "@/types/types"
import { MockHelperText } from "../utils/mock-helper-text"
import { useTranslations } from "next-intl"

export default function BasicDateTimePicker({
  control,
  defaultValue,
  error,
}: CustomInput) {
  const t = useTranslations("table")
  return (
    <Grid xs={12} item>
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue={dayjs(defaultValue)}
              onChange={(v) => onChange(v?.toISOString())}
              label={t("date")}
            />
          </LocalizationProvider>
        )}
      />
      <MockHelperText text={error} />
    </Grid>
  )
}
