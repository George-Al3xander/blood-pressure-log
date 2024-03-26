"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridValueGetterParams,
} from "@mui/x-data-grid"
import { LogReport } from "@/types/types"
import { ukUA, enUS } from "@mui/x-data-grid/locales"
import DataGridTitle from "./data-grid-title"
import { columns } from "./columns"
import { locales } from "@/middleware"
import { Localization } from "@mui/material/locale"
import { handleDataGridLocale } from "./handleDataGridLang"
import { useRouter } from "next/navigation"

export default function DataGridTable({
  items,
  locale,
  paginationModel,
  rowCount
}: {
  items: LogReport[]
  locale: string
  paginationModel: GridPaginationModel
  rowCount: number
}) {
  const router = useRouter()

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
        }}
        slots={{
          toolbar: DataGridTitle,
        }}
        slotProps={{
          toolbar: { firstItem: items[0], lastItem: items[items.length - 1] },
        }}
        localeText={handleDataGridLocale(locale as "uk")}
        paginationMode="server"
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 15, 30]}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={({ page, pageSize }) =>
          router.push(`?page=${page}&pageSize=${pageSize}`)
        }
        disableRowSelectionOnClick
      />
    </Box>
  )
}
