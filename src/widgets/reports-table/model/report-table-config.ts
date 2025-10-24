import { TReport } from "@/shared/model";

export type ReportTableConfig<T extends object> = {
    mainColumns: (keyof TReport)[];
    nestedColumns?: (keyof TReport)[];
} & T;
