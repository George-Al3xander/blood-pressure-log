"use client";

import { TReport } from "@/shared/model";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
    control: Control<TReport>;
    required?: boolean;
};

const FIELD_NAME: keyof TReport = "rating";

export const ReportRatingRange: FC<Props> = ({ control, required }) => {
    const t = useTranslations("vitals");

    const title = `${t(`${FIELD_NAME}.title`)}${required ? " *" : ""}`;
    const labelId = `${FIELD_NAME}-label`;
    const groupId = `${FIELD_NAME}-select`;

    const options = Array.from({ length: 5 }, (_, i) => ({
        value: i + 1,
        label: t(`rating.range.${i + 1}`),
    }));

    return (
        <Controller
            name={FIELD_NAME}
            control={control}
            rules={{ required }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl error={!!error} fullWidth>
                    <FormLabel id={labelId}>{title}</FormLabel>
                    <RadioGroup
                        aria-labelledby={title}
                        id={groupId}
                        value={value}
                        onChange={onChange}
                    >
                        <Stack
                            direction={{ sx: "column", md: "row" }}
                            spacing={2}
                            justifyContent="space-between"
                        >
                            {options.map(({ label, value }) => (
                                <FormControlLabel
                                    label={label}
                                    value={value}
                                    key={`${FIELD_NAME}-option-${value}`}
                                    control={<Radio />}
                                />
                            ))}
                        </Stack>
                    </RadioGroup>
                    {error && (
                        <FormHelperText error>
                            {error?.message?.replace(FIELD_NAME, title) ?? null}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};
