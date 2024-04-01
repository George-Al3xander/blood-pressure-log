"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import React from "react"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import useZodValidate from "@/hooks/useZodValidate"
import { TDateRangeData } from "../../../lib/auth/zodSchemas"
import { Button, Grid, Stack } from "@mui/material"
import { Controller } from "react-hook-form"
import { MockHelperText } from "../utils/mock-helper-text"
import PrintIcon from "@mui/icons-material/Print"
const keys = ["from", "to"] as const

const DateRangePicker = (props: {
  from?: string
  to?: string
  onValidationSuccess?: Function
}) => {
  const {
    control,
    formState: { errors },
    isBusy,
    submitForm,
    register,
    reset,
    setValue,
  } = useZodValidate({
    type: "dateRange",
    onValidationSuccess:
      props.onValidationSuccess || ((data: TDateRangeData) => alert(data)), //(data: TDateRangeData) => alert(data),
  })
  const t = useTranslations("table")

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} component={"form"} onSubmit={submitForm}>
        {keys.map((range) => (
          <Grid
            item
            justifyContent={"center"}
            xs={12}
            sm={6}
            key={range + "container"}
          >
            <Controller
              key={range + "controller"}
              name={range}
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  sx={{ width: "100%" }}
                  onChange={(dateVal) => {
                    //console.log(dateVal?.toDate().toISOString())
                    //return onChange(dateVal?.toDate().toISOString())
                    return onChange(dateVal)
                  }}
                  disabled={isBusy}
                  minDate={dayjs(props[range])}
                  label={t(range)}
                />
              )}
            />
            {errors && <MockHelperText text={errors[range]?.message} />}
          </Grid>
        ))}

        <Grid item xs={12} mx="auto">
          <Button
            //startIcon={<PrintIcon />}
            type={"submit"}
            size="large"
            variant="contained"
            fullWidth
            disabled={isBusy}
          >
            {isBusy ? t("btn_select.process") : t("btn_select.default")}
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default DateRangePicker
