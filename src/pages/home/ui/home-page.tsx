import { serverTrpc } from "@/shared/backend";
import { normalizePageNumber } from "@/shared/lib";
import { TReport } from "@/shared/model";
import { PaginationControls, Paper, Stack } from "@/shared/ui";
import { ReportsTable } from "@/widgets/reports-table";
import { FC } from "react";

type Props = {
    page: string | string[];
};

export const HomePage: FC<Props> = async ({ page: rawPage }) => {
    const { pages } = await serverTrpc.report.count();
    const page = normalizePageNumber(rawPage, pages);
    const { reports } = await serverTrpc.report.list({
        page,
    });

    const serializedReports = JSON.parse(
        JSON.stringify(reports ?? []),
    ) as TReport[];

    return (
        <Stack direction="column" gap={4}>
            <ReportsTable
                reports={serializedReports}
                containerProps={{
                    component: Paper,
                    sx: { maxHeight: "70vh" },
                }}
            />
            <PaginationControls
                page={page}
                count={pages}
                sx={{ alignSelf: "flex-end" }}
            />
        </Stack>
    );
};
