import { ReportTableCell, type ReportTableConfig } from "@/entities/report";
import { TReport } from "@/shared/model";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { ReportTableRow } from "./report-table-row";

type Props = ReportTableConfig<{ reports: TReport[] }>;

export const ReportTable: FC<Props> = ({
    reports,
    mainColumns,
    nestedColumns = [],
}) => {
    const t = useTranslations("reportTable");
    const hasNestedColumns = nestedColumns.length > 0;

    return (
        <TableContainer component={Paper}>
            <Table aria-label={t("title")}>
                <TableHead>
                    <TableRow>
                        {hasNestedColumns && <TableCell />}
                        {mainColumns.map((field) => (
                            <ReportTableCell
                                field={field}
                                displayVariant="label"
                                sx={{ fontWeight: 800 }}
                                key={`table-head-${field}`}
                            />
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((r) => (
                        <ReportTableRow
                            key={"row-" + r._id}
                            report={r}
                            mainColumns={mainColumns}
                            nestedColumns={nestedColumns}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
