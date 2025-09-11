"use client";

import { TReport } from "@/shared/model";
import { TextFieldProps } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
    control: Control<TReport>;
} & Omit<TextFieldProps, "name">;

const FIELD_NAME: keyof TReport = "date";

export const ReportDatePicker: FC<Props> = ({ control, ...props }) => {
    const t = useTranslations("vitals");

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={FIELD_NAME}
                control={control}
                rules={{
                    required: props.required,
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <DateTimePicker
                        label={t(FIELD_NAME)}
                        value={dayjs(value)}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                ...props,
                                error: !!error,
                                helperText:
                                    error?.message?.replace(
                                        FIELD_NAME,
                                        t(FIELD_NAME),
                                    ) ?? null,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};
