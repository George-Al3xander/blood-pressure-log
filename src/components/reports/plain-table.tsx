import { LogReport, ReportTableWithPagination } from "@/types/types";
import {
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
const headings: (keyof LogReport | "time")[] = [
    "date",
    "time",
    "dia",
    "sys",
    "pulse",
    "rating",
    "notes",
];

const PlainTable = ({
    reports,
    isLoading,
    onChange,
    reportCount,
    paginationModel,
    pagination,
}: ReportTableWithPagination & { pagination: boolean }) => {
    const t = useTranslations("table");

    if (reports.length == 0) return <Stack>no reports</Stack>;

    return (
        <Stack alignItems={"center"}>
            <TableContainer /*component={Paper}*/>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {headings.map((heading) => (
                                <TableCell
                                    sx={{ textAlign: "center" }}
                                    key={heading}
                                >
                                    {t(heading)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                {headings.map((heading) => (
                                    <TableCell
                                        sx={{ textAlign: "center" }}
                                        key={heading + "spinner"}
                                    >
                                        <CircularProgress color="primary" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ) : (
                            reports.map((report) => (
                                <TableRow key={report._id}>
                                    {headings.map((heading) => (
                                        <TableCell
                                            sx={{
                                                textAlign:
                                                    heading != "notes"
                                                        ? "center"
                                                        : "left",
                                            }}
                                            key={report._id + heading}
                                        >
                                            {heading == "rating"
                                                ? t(
                                                      `rating_range.${report[heading]}`,
                                                  )
                                                : heading == "date"
                                                  ? dayjs(
                                                        report[heading],
                                                    ).format("DD-MM-YYYY")
                                                  : heading == "time"
                                                    ? dayjs(
                                                          report["date"],
                                                      ).format("H:mm ")
                                                    : report[heading]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && paginationModel && reportCount && (
                <Pagination
                    defaultPage={paginationModel.page + 1}
                    disabled={isLoading}
                    sx={{ my: 3 }}
                    color="primary"
                    count={Math.floor(reportCount / 21) + 1}
                    onChange={(_event, num) =>
                        onChange({ page: num - 1, pageSize: 21 })
                    }
                />
            )}
        </Stack>
    );
};

export default PlainTable;
