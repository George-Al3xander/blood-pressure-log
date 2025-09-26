import { ReportTableCell, type ReportTableConfig } from "@/entities/report";
import { TReport } from "@/shared/model";
import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableRow,
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { ReportTableRow } from "./report-table-row";

type Props = ReportTableConfig<{
    reports: TReport[];
    isLoading?: boolean;
    containerProps?: TableContainerProps;
}>;

const SKELETON_ROW_COUNT = 15;

export const ReportTable: FC<Props> = ({
    reports,
    mainColumns,
    nestedColumns = [],
    containerProps,
    isLoading = false,
}) => {
    const t = useTranslations("reportTable");
    const hasNestedColumns = nestedColumns.length > 0;

    const skeletonRows = useMemo(() => {
        return Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
            <TableRow key={`skeleton-row-${index}`}>
                {mainColumns.map((columnKey) => (
                    <TableCell key={`skeleton-cell-${columnKey}`}>
                        <Skeleton variant="text" />
                    </TableCell>
                ))}
            </TableRow>
        ));
    }, [mainColumns.length]);

    return (
        <TableContainer {...containerProps}>
            <Table aria-label={t("title")} stickyHeader>
                <TableHead>
                    <TableRow>
                        {!isLoading && hasNestedColumns && <TableCell />}
                        {mainColumns.map((columnKey) => (
                            <ReportTableCell
                                key={`table-head-${columnKey}`}
                                field={columnKey}
                                displayVariant="label"
                                sx={{ fontWeight: 800 }}
                            />
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading
                        ? skeletonRows
                        : reports.map((report) => (
                              <ReportTableRow
                                  key={`row-${report._id}`}
                                  report={report}
                                  mainColumns={mainColumns}
                                  nestedColumns={nestedColumns}
                              />
                          ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
