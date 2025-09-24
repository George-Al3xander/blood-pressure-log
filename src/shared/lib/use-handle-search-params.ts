"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useHandleSearchParams = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const update = (key: string, value?: string | number) => {
        if (searchParams) {
            const params = new URLSearchParams(searchParams);
            if (value) {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const get = (key: string) => {
        return searchParams?.get(key) ?? null;
    };

    return { update, get, searchParams, pathname };
};
