"use client";
import usePrintReports from "@/hooks/print reports/usePrintReports";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import DateRangePicker from "../date range picker/date-range-picker";
import PrintBtn from "../print-btn";

const PrintReports = () => {
    const {
        onValidationSuccess,
        step,
        isError,
        reset,
        reports,
        errorMessagePath,
    } = usePrintReports();
    const t = useTranslations("table");
    if (isError)
        return (
            <Stack textAlign={"center"}>
                <Typography fontWeight={600} variant="h4" color={"Red"}>
                    {t(`print_error.${errorMessagePath}.title`)}
                </Typography>
                <Typography mb={4} variant="subtitle2">
                    {t(`print_error.${errorMessagePath}.message`)}
                </Typography>
                <Button
                    startIcon={<AutorenewIcon />}
                    variant="contained"
                    size="large"
                    color="error"
                    onClick={reset}
                >
                    {t("btn_retry")}
                </Button>
            </Stack>
        );

    return (
        <Stack
            justifyContent={"center"}
            alignContent={"center"}
            direction={"column"}
        >
            {step == "select" ? (
                <>
                    <DateRangePicker
                        onValidationSuccess={onValidationSuccess}
                    />
                </>
            ) : (
                <PrintBtn isLoading={step != "print"} reports={reports} />
            )}
        </Stack>
    );
};

export default PrintReports;
