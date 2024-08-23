import { CustomInput } from "@/types/types";
import { Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { MockHelperText } from "../utils/mock-helper-text";

export default function BasicDateTimePicker({
    control,
    defaultValue,
    error,
}: CustomInput) {
    const t = useTranslations("table");
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
    );
}
