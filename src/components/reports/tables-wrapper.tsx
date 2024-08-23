"use client";

import useManageReports from "@/hooks/useManageReports";
import ManageReportModal from "../modals/manage report modal/manage-report-modal";
import DataGridTable from "./data grid/data-grid";
import NoReports from "./no-reports-component";
import PlainTable from "./plain-table";

const TestPaginationWrapper = ({
    count,
    locale,
}: {
    count: number;
    locale: string;
}) => {
    const { tableVariant, ...props } = useManageReports();
    if (count == 0) return <NoReports />;

    return (
        <>
            <ManageReportModal type="POST" onOptimistic={props.onOptimistic} />
            {tableVariant == "plain" ? (
                <PlainTable pagination reportCount={count} {...props} />
            ) : (
                <DataGridTable locale={locale} reportCount={count} {...props} />
            )}
        </>
    );
};

export default TestPaginationWrapper;
