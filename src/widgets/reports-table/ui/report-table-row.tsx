"use client";

import { ReportTableCell, ReportTableConfig } from "@/entities/report";
import { TReport } from "@/shared/model";
import {
    IconButton,
    KeyboardArrowDownIcon,
    KeyboardArrowUpIcon,
    TableCell,
    TableRow,
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { ReportNestedRow } from "./report-nested-row";

type Props = ReportTableConfig<{ report: TReport }>;

export const ReportTableRow: FC<Props> = ({
    report,
    mainColumns,
    nestedColumns = [],
}) => {
    const t = useTranslations("reportTable");

    const [open, setOpen] = useState(false);
    const toggleCollapse = () => setOpen((prev) => !prev);

    const hasNestedColumns = nestedColumns.length > 0;

    return (
        <>
            <TableRow>
                {hasNestedColumns && (
                    <TableCell align="left" width={2}>
                        <IconButton
                            size="small"
                            aria-label={t(
                                `expandButton.${open ? "hide" : "show"}`,
                            )}
                            onClick={toggleCollapse}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </TableCell>
                )}
                {mainColumns.map((field) => (
                    <ReportTableCell
                        value={report[field]}
                        field={field}
                        displayVariant="data"
                        key={`table-cell-${field}`}
                    />
                ))}
            </TableRow>
            {hasNestedColumns && (
                <ReportNestedRow
                    title={t("nestedTableTitle")}
                    open={open}
                    data={nestedColumns.map((k) => ({
                        field: k,
                        value: report[k],
                    }))}
                />
            )}
        </>
    );
};
