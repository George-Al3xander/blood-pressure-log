import { PropsWithChildren } from "react";

export type PageProps<TParams = object> = Readonly<{
    params: Promise<TParams>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}>;

export type LayoutProps<TParams = object> = Readonly<
    PropsWithChildren<{
        params: Promise<TParams>;
    }>
>;
