import { LogReport } from "@/types/types"
import { Box, Button, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
type TitleProps = {
  firstItem: LogReport
  lastItem: LogReport
}

export default function DataGridTitle({ firstItem, lastItem }: TitleProps) {
  const { date: startDate } = firstItem
  const { date: endDate } = lastItem
  const t = useTranslations("table")
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        //flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        py: 4,

        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <GridToolbarExport
        variant={"contained"}
        component={Button}
        color="success"
        className="export-btn"
        // excelOptions={{ allColumns: true }}
        csvOptions={{
          allColumns: true,
          fileName: "bpl-report",
        }}
        excelOptions={{ allColumns: true }}
   
        printOptions={{
          allColumns: true,
          hideFooter: true,
          hideToolbar: true,
          pageStyle: `
          .MuiDataGrid-root .MuiDataGrid-main {
            color: black;
            
          }
          .MuiButton-root {
            display: none !important;
          
          }
          .MuiDataGrid-root .MuiBox-root  {
            color: black !important;            
            justify-content:center;
          }
          `,
        }}
      />
      <Typography variant="h5">
        {t("date_range", {
          start: dayjs(startDate).format("D/MM/YYYY"),
          end: dayjs(endDate).format("D/MM/YYYY"),
        })}
      </Typography>
    </Box>
  )
}
