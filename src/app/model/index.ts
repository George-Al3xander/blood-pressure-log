import { PropsWithChildren } from "react";

export type PageProps<TParams = void> = Readonly<{
    params: Promise<TParams>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}>;

export type LayoutProps<TParams = void> = Readonly<
    PropsWithChildren<{
        params: Promise<TParams>;
    }>
>;
