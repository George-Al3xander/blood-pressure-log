import { ReportTableCell } from "@/entities/report";
import { TReport } from "@/shared/model";
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@/shared/ui";
import { FC } from "react";

type Props = {
    open: boolean;
    title?: string;
    data: {
        field: keyof TReport;
        value: TReport[keyof TReport];
    }[];
};

export const ReportNestedRow: FC<Props> = ({ data, open, title }) => {
    return (
        <TableRow>
            <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }} component="section">
                        {title && (
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                {title}
                            </Typography>
                        )}
                        <Table size="small" aria-label={title}>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={`inner-table-row-${row.field}`}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    borderBottom: "none",
                                                },
                                        }}
                                    >
                                        <ReportTableCell
                                            displayVariant="label"
                                            component="th"
                                            scope="row"
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                            {...row}
                                        />
                                        <ReportTableCell
                                            displayVariant="data"
                                            {...row}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};
