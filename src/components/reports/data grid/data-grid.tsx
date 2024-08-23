"use client";
import DeleteReportModal from "@/components/modals/delete-report-modal";
import ManageReportModal from "@/components/modals/manage report modal/manage-report-modal";
import { DataGridProps, LogReport } from "@/types/types";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { columns } from "./columns";
import DataGridTitle from "./data-grid-title";
import { handleDataGridLocale } from "./handleDataGridLang";
import RenderHeader from "./render-header";

export default function DataGridTable({
    reports,
    locale,
    reportCount,
    isLoading,
    paginationModel,
    onChange,
    onOptimistic,
}: DataGridProps) {
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
    };

    return (
        <Box sx={{ height: "80vh", width: "100%" }}>
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
    );
}
