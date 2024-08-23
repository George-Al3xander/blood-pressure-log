import { TableVariantParam } from "@/types/types";

import { fetchMongoData } from "@/lib/mongo/actions";

import TablesWrapper from "@/components/reports/tables-wrapper";

export type LogPageSearchParams = Partial<{
    tableVariant: TableVariantParam;
    pageSize: string;
    page: string;
}>;

const LogPage = async ({
    params: { locale },
}: {
    params: { locale?: string };
}) => {
    const { count } = await fetchMongoData<{
        success: boolean;
        count: number;
    }>(`/api/mongo/reports`);

    return <TablesWrapper locale={locale || "en"} count={count} />;
};

export default LogPage;
