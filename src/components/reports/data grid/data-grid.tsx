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
import { useRouter, useSearchParams } from "next/navigation"
import { LogPageSearchParams } from "@/app/[locale]/log/page"
import { handleLogPageParams } from "../../../../lib/utils"

export default function DataGridTable({
  items,
  locale,
  rowCount,
  isLoading,
  paginationModel,
  onChange
}: {
  items: LogReport[]
  locale: string
  rowCount: number
  isLoading: boolean,
  paginationModel: {page:number,pageSize:number},
  onChange: any
}) {
  
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        loading={isLoading}
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
        pageSizeOptions={[21, 42, 63, 84]}
        rowCount={items.length > 0 ? rowCount : 0}
        paginationModel={paginationModel}
        onPaginationModelChange={onChange}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
