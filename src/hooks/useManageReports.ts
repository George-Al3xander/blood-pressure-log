import { LogReport, TOptAction } from "@/types/types";
import dayjs from "dayjs";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import useMongoPagination from "./useMongoPagination";

const useManageReports = () => {
    const { reports: initialReports, ...paginationProps } =
        useMongoPagination();

    const [reports, setReports] = useState<LogReport[]>(initialReports);
    useEffect(() => {
        setReports(initialReports);
    }, [initialReports]);
    const optimisticReportManage = (
        currReports: LogReport[],
        {
            action,
            newReport,
        }: {
            action: "POST" | "PUT" | "DELETE" | "ERROR";
            newReport: LogReport;
        },
    ) => {
        switch (action) {
            case "POST":
                return sortBy([...currReports, newReport], (report) =>
                    dayjs(report.date).unix(),
                );
            case "PUT":
                return currReports.map((mapRep) =>
                    mapRep._id === newReport._id ? newReport : mapRep,
                );
            case "DELETE":
                return currReports.filter(({ _id }) => _id !== newReport._id);
            default:
                return currReports;
        }
    };

    const onOptimistic = (args: TOptAction, callback?: () => void) => {
        const newReports = optimisticReportManage(reports, args);
        setReports(newReports);
        if (callback) callback();
    };

    return { reports, onOptimistic, ...paginationProps };
};

export default useManageReports;
