"use client";

import { useMediaQuery } from "@/shared/lib";
import { ReportTableConfig } from "../model/report-table-config";

const SKELETON_ROW_COUNT = 15;

export const useTableLayout = (): ReportTableConfig<{
    skeletonRows: string[];
}> => {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    let mainColumns: ReportTableConfig<object>["mainColumns"];
    let nestedColumns: ReportTableConfig<object>["nestedColumns"] = [];

    if (isDesktop) {
        mainColumns = ["date", "sys", "dia", "pulse", "rating", "notes"];
        nestedColumns = undefined;
    } else if (isTablet) {
        mainColumns = ["date", "sys", "dia", "pulse"];
        nestedColumns = ["rating", "notes"];
    } else {
        mainColumns = ["date"];
        nestedColumns = ["sys", "dia", "pulse", "rating", "notes"];
    }

    return {
        mainColumns,
        nestedColumns,
        skeletonRows: Array.from({ length: SKELETON_ROW_COUNT }).map(
            (_, index) => `report-table-row-${index}`,
        ),
    };
};
