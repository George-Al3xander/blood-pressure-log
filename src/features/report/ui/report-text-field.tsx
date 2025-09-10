"use client";

import { TReport } from "@/shared/model";
import { TextField, TextFieldProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
    name: keyof TReport;
    control: Control<TReport>;
} & Omit<TextFieldProps, "name">;

export const ReportTextField: FC<Props> = ({
    control,
    name,
    type,
    required,
    ...props
}) => {
    const t = useTranslations("vitals");

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    {...props}
                    label={t(name as string)}
                    type={type}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message?.replace(name, t(name)) ?? null}
                />
            )}
        />
    );
};
