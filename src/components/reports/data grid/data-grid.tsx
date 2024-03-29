"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"
import { DataGridProps } from "@/types/types"

import DataGridTitle from "./data-grid-title"
import { columns } from "./columns"

import { handleDataGridLocale } from "./handleDataGridLang"

export default function DataGridTable({
  reports,
  locale,
  reportCount,
  isLoading,
  paginationModel,
  onChange,
}: DataGridProps) {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={reports}
        columns={columns}
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
