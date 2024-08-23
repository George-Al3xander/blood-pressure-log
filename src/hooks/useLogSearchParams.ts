"use client";

import { TableVariantParam } from "@/types/types";
import { useSearchParams } from "next/navigation";

const useLogSearchParams = () => {
    const searchParams = useSearchParams();

    const tableVariant = (searchParams.get("tableVariant") ||
        "complex") as TableVariantParam;
    const page = searchParams.get("page") || "0";
    const pageSize = searchParams.get("pageSize") || "21";

    return { tableVariant, page, pageSize };
};

export default useLogSearchParams;
