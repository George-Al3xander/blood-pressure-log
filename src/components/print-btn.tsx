import { LogReport } from "@/types/types";
import PrintIcon from "@mui/icons-material/Print";
import { Button, Stack, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PlainTable from "./reports/plain-table";

const HeaderInfo = ({ t, isLoading }: { t: any; isLoading: boolean }) => (
    <Stack>
        <Typography variant="h5" fontWeight={600} textAlign={"center"}>
            {t(`btn_print.${isLoading ? "process" : "default"}`)}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
            {t(`print_header_info.${isLoading ? "process" : "default"}`)}
        </Typography>
    </Stack>
);

const PrintBtn = ({
    reports,
    isLoading,
}: {
    reports: LogReport[];
    isLoading: boolean;
}) => {
    const t = useTranslations("table");
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
    });

    return (
        <Stack gap={5}>
            <HeaderInfo isLoading={isLoading} t={t} />
            <div>
                <Button
                    disabled={isLoading}
                    onClick={handlePrint}
                    startIcon={<PrintIcon />}
                    variant="contained"
                    fullWidth
                >
                    {t("btn_print.default")}
                </Button>
                {isLoading ? (
                    <LinearProgress />
                ) : reports.length > 0 ? (
                    <div ref={contentRef} className="print-comp">
                        <title>
                            {t("date_range", {
                                start: dayjs(reports[0].date).format(
                                    "DD/MM/YYYY",
                                ),
                                end: dayjs(
                                    reports[reports.length - 1].date,
                                ).format("DD/MM/YYYY"),
                            })}
                        </title>
                        <PlainTable
                            pagination={false}
                            reports={reports}
                            reportCount={0}
                            isLoading={false}
                            onChange={undefined}
                            paginationModel={{
                                page: 0,
                                pageSize: 0,
                            }}
                        />
                    </div>
                ) : null}
            </div>
        </Stack>
    );
};

export default PrintBtn;
