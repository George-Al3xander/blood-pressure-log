import { LogReport } from "@/types/types";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React from "react";

const headings: (keyof LogReport | "time")[] = [
  "date",
  "time",
  "dia",
  "sys",
  "pulse",
  "rating",
  "notes",
];

const PlainTable = ({ reports }: { reports: LogReport[] }) => {
  const t = useTranslations("table");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headings.map((heading) => (
              <TableCell key={heading}>{t(heading)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report._id}>
              {headings.map((heading) => (
                <TableCell key={report._id + heading}>
                  {heading == "rating"
                    ? t(`rating_range.${report[heading]}`)
                    : heading == "date"
                    ? dayjs(report[heading]).format("DD-MM-YYYY")
                    : heading == "time"
                    ? dayjs(report["date"]).format("H:mm ")
                    : report[heading]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlainTable;
