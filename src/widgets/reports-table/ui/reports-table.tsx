"use client";

import { ReportTableCell } from "@/entities/report";
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
import { FC } from "react";
import { ReportTableRow } from "./report-table-row";
import { useTableLayout } from "./use-table-layout";

type Props = {
    reports: TReport[];
    isLoading?: boolean;
    containerProps?: TableContainerProps;
};

export const ReportsTable: FC<Props> = ({
    reports,
    containerProps,
    isLoading = false,
}) => {
    const t = useTranslations("reportTable");
    const { mainColumns, nestedColumns, skeletonRows } = useTableLayout();

    return (
        <TableContainer {...containerProps}>
            <Table aria-label={t("title")} stickyHeader>
                <TableHead>
                    <TableRow>
                        {!isLoading && nestedColumns && <TableCell />}
                        {mainColumns.map((columnKey) => (
                            <ReportTableCell
                                key={`table-head-${columnKey}`}
                                field={columnKey}
                                displayVariant="label"
                                sx={{ fontWeight: 800 }}
                            />
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading
                        ? skeletonRows.map((key) => (
                              <TableRow key={key}>
                                  {mainColumns.map((columnKey) => (
                                      <TableCell key={`${key}-${columnKey}`}>
                                          <Skeleton variant="text" />
                                      </TableCell>
                                  ))}
                                  <TableCell />
                              </TableRow>
                          ))
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
