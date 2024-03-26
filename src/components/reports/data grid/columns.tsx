import dayjs from "dayjs"
import RenderHeader from "./render-header"
import RatingRangeCell from "./rating-range-cell"
import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
  {
    field: "date",
    flex: 0.3,
    renderCell: (param) => <>{dayjs(param.value).format("DD/MM/YYYY")}</>,
    renderHeader: RenderHeader,
  },
  {
    field: "time",
    valueGetter: (params) => params.row.date,
    renderHeader: RenderHeader,
    renderCell: (param) => <>{dayjs(param.value).format("H:mm ")}</>,
  },
  {
    field: "sys",
    type: "number",
    flex: 0.3,
    renderHeader: RenderHeader,
  },
  {
    field: "dia",
    type: "number",
    flex: 0.3,
    renderHeader: RenderHeader,
  },
  {
    field: "pulse",
    type: "number",
    flex: 0.3,
    renderHeader: RenderHeader,
  },
  {
    field: "rating",
    flex: 0.5,
    renderCell: RatingRangeCell,
    renderHeader: RenderHeader,
  },
  {
    field: "notes",
    flex: 0.8,
    renderHeader: RenderHeader,
  },
]
