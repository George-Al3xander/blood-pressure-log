"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DataGridProps, LogReport, TOptAction } from "@/types/types"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import DataGridTitle from "./data-grid-title"
import { columns } from "./columns"
import { Button, ButtonProps, Stack } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import { handleDataGridLocale } from "./handleDataGridLang"
import PrintModal from "@/components/modals/print-modal"
import ManageReportModal from "@/components/modals/manage report modal/manage-report-modal"
import { sortBy } from "lodash"
import dayjs from "dayjs"
import useOptimistic from "@/hooks/useOptimistic"
import RenderHeader from "./render-header"
import DeleteReportModal from "@/components/modals/delete-report-modal"

export default function DataGridTable({
  reports: initialReports,
  locale,
  reportCount,
  isLoading,
  paginationModel,
  onChange,
}: DataGridProps) {
  const optimisticReportManage = (
    currReports: LogReport[],
    {
      action,
      newReport,
    }: {
      action: "POST" | "PUT" | "DELETE" | "ERROR"
      newReport: LogReport
    }
  ) => {
    switch (action) {
      case "POST":
        return sortBy([...currReports, newReport], (report) =>
          dayjs(report.date).unix()
        )
      case "PUT":
        return currReports.map((mapRep) =>
          mapRep._id == newReport._id ? newReport : mapRep
        )
      case "DELETE":
        return currReports.filter(({ _id }) => _id !== newReport._id)
      default:
        return currReports
    }
  }
  const [reports, manageReport] = useOptimistic(
    initialReports,
    optimisticReportManage
  )

  const onOptimistic = (args: TOptAction, callback?: () => void) => {
    manageReport(args)
    if (callback) callback()
  }

  //const manageFunction = type == "create" ? createReport : updateReport
  const actionsColumn: GridColDef = {
    field: "actions",
    type: "actions",
    renderHeader: ({ field }) => <RenderHeader field={field} />,
    flex: 0.2,
    getActions: (params) => [
      <ManageReportModal
        onOptimistic={onOptimistic}
        type="PUT"
        defaultValue={params.row as LogReport}
        key={"update-report-modal"}
      />,
      <DeleteReportModal
        onOptimistic={onOptimistic}
        report={params.row as LogReport}
        key={"delete-report-modal"}
      />,
    ],
  }

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <ManageReportModal type="POST" onOptimistic={manageReport} />
      <DataGrid
        rows={reports}
        columns={[...columns, actionsColumn]}
        loading={isLoading}
        initialState={{
          pagination: { paginationModel },
        }}
        slots={{
          toolbar: DataGridTitle,
        }}
        slotProps={{
          toolbar: {
            firstItem: reports[0],
            lastItem: reports[reports.length - 1],
          },
        }}
        onRowDoubleClick={(pros) => alert(pros.id)}
        localeText={handleDataGridLocale(locale as "uk")}
        paginationMode="server"
        getRowId={(row) => row._id}
        pageSizeOptions={[21, 42, 63, 84]}
        rowCount={reports.length > 0 ? reportCount : 0}
        paginationModel={paginationModel}
        onPaginationModelChange={onChange}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
