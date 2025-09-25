import { z } from "zod";

export const normalizePageNumber = (
    value: number | string | string[] | undefined | null,
    pageCount: number,
): number => {
    const raw = Array.isArray(value) ? value[0] : value;

    const { success, data } = z.coerce
        .number()
        .int()
        .min(1)
        .max(pageCount)
        .safeParse(raw);

    return success ? data : 1;
};
