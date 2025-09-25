"use client";

import { useHandleSearchParams } from "@/shared/lib";
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import { useTranslations } from "next-intl";
import { FC, useEffect } from "react";

const PAGE_KEY = "page";

type Props = Omit<PaginationProps, "onChange" | "getItemAriaLabel">;

export const PaginationControls: FC<Props> = ({ page, count, ...props }) => {
    const t = useTranslations("pagination");

    const { get, update } = useHandleSearchParams();
    const currentParam = get(PAGE_KEY);

    useEffect(() => {
        if (String(page) !== currentParam) {
            update(PAGE_KEY, page);
        }
    }, [page, currentParam]);

    const handlePageChange: PaginationProps["onChange"] = (_, newPage) => {
        update(PAGE_KEY, String(newPage));
    };

    const getAriaLabel: PaginationProps["getItemAriaLabel"] = (
        type,
        page,
        selected,
    ) => {
        if (type === "start-ellipsis" || type === "end-ellipsis") return "";

        return t(type, {
            page: page ?? 1,
            selected: Number(selected),
        });
    };

    return (
        <Pagination
            {...props}
            page={page}
            count={count}
            onChange={handlePageChange}
            getItemAriaLabel={getAriaLabel}
        />
    );
};
