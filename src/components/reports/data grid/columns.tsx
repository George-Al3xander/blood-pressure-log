import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import RatingRangeCell from "./rating-range-cell";
import RenderHeader from "./render-header";

export const columns: GridColDef[] = [
    {
        field: "date",
        flex: 0.3,
        valueGetter: (params) => new Date(params.row.date),
        renderCell: (param) => <>{dayjs(param.value).format("DD/MM/YYYY")}</>,
        renderHeader: ({ field }) => <RenderHeader field={field} />,

        type: "date",
    },
    {
        field: "time",
        valueGetter: (params) => params.row.date,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
        renderCell: (param) => <>{dayjs(param.value).format("H:mm ")}</>,
    },
    {
        field: "sys",
        type: "number",

        flex: 0.3,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
    },
    {
        field: "dia",
        type: "number",
        flex: 0.3,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
    },
    {
        field: "pulse",
        type: "number",
        flex: 0.3,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
    },
    {
        field: "rating",
        flex: 0.5,
        renderCell: ({ value }) => <RatingRangeCell value={value} />,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
    },
    {
        field: "notes",
        flex: 0.8,
        renderHeader: ({ field }) => <RenderHeader field={field} />,
    },
];
