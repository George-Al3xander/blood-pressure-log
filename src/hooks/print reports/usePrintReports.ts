"use client";
import { TDateRangeData } from "@/lib/auth/zodSchemas";
import { fetchMongoData } from "@/lib/mongo/actions";
import { LogReport } from "@/types/types";
import dayjs from "dayjs";
import React, { useState } from "react";

const defaultStep = "select";
const defaultIsError = false;
const defaultReports: LogReport[] = [];
const defaultDateRange = {
    from: dayjs().subtract(1, "year").toDate(),
    to: dayjs().toDate(),
};
const usePrintReports = () => {
    const [step, setStep] = React.useState<"select" | "fetch" | "print">(
        defaultStep,
    );
    const [isError, setIsError] = useState(defaultIsError);
    const [errorMessagePath, setErrorMessagePath] =
        React.useState("default_message");
    const [reports, setReports] = useState<LogReport[]>(defaultReports);
    const [dateRange, setDateRange] =
        React.useState<TDateRangeData>(defaultDateRange);

    const onValidationSuccess = async (data: TDateRangeData) => {
        setDateRange(data);
        setStep("fetch");
        try {
            const { from, to } = data;
            const { reports: newReports, success } = await fetchMongoData<{
                reports: LogReport[];
                success: boolean;
            }>(
                `/api/mongo/reports?gte=${from.toISOString()}&lte=${to.toISOString()}`,
            );

            if (!success || !reports) throw new Error("default_message");

            if (newReports.length < 1) {
                throw new Error("no_results");
            }
            const sorted = newReports.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.valueOf() - dateB.valueOf();
            });
            setReports(sorted);
        } catch (error) {
            setErrorMessagePath(
                error instanceof Error ? error.message : "default_message",
            );
            setIsError(true);
        } finally {
            setStep("print");
        }
    };

    const reset = () => {
        setStep(defaultStep);
        setReports(defaultReports);
        setDateRange(defaultDateRange);
        setIsError(defaultIsError);
    };

    return {
        step,
        dateRange,
        onValidationSuccess,
        reports,
        isError,
        reset,
        errorMessagePath,
    };
};

export default usePrintReports;
