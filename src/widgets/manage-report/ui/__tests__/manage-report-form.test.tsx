import { manageReportTestingApi } from "@/shared/mocks";
import { TReport } from "@/shared/model";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { afterEach, describe, expect, it, vi } from "vitest";

const DATE_FORMAT = "MM/DD/YYYY hh:mm A";

const sampleReport: TReport = {
    _id: "ID_VALUE",
    sys: 220,
    dia: 240,
    pulse: 80,
    rating: 4,
    notes: "Everything's good!",
    date: new Date(2023, 2, 4, 10, 12),
};

const inputs = ["dia", "sys", "pulse", "notes", "date"] as const;
const ratings = [1, 2, 3, 4, 5] as const;

const {
    getInput,
    getRatingRadio,
    fillFormFields,
    renderForm: setup,
    formProps: { onSuccessAction, onSubmitAction, onErrorAction },
} = manageReportTestingApi;

describe("Manage report", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render inputs for all report fields", () => {
        setup();

        inputs.forEach((input) => {
            expect(getInput(input)).toBeInTheDocument();
        });

        ratings.forEach((r) => {
            expect(getRatingRadio(r)).toBeInTheDocument();
        });
    });

    it("should render the submit & clear buttons", () => {
        const { submitButton, clearButton } = setup();
        expect(submitButton).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
    });

    it("should populate form fields with initial report values", () => {
        setup(sampleReport);

        inputs.forEach((input) => {
            const value = sampleReport[input];

            const displayValue =
                value instanceof Date
                    ? dayjs(value).format(DATE_FORMAT)
                    : value;

            expect(screen.getByDisplayValue(displayValue)).toBeInTheDocument();
        });
    });

    it("should not submit the form with default/empty values", async () => {
        const { submitButton } = setup();
        await userEvent.click(submitButton);
        expect(onSubmitAction).not.toHaveBeenCalled();
    });

    it("should submit valid input and trigger success handler", async () => {
        const { submitButton } = setup();
        const report = Object.fromEntries(
            inputs.map((k) => [k, sampleReport[k]]),
        ) as TReport;

        await fillFormFields(report);
        await userEvent.click(submitButton);

        const callArg = onSubmitAction.mock.calls[0]?.[0];

        const { date, ...partialSampleReport } = report;

        expect(dayjs(callArg.date).format(DATE_FORMAT)).toBe(
            dayjs(date).format(DATE_FORMAT),
        );

        expect(callArg).toEqual(expect.objectContaining(partialSampleReport));
        expect(onSuccessAction).toHaveBeenCalled();
    });

    it("should call onError when submission fails", async () => {
        onSubmitAction.mockRejectedValueOnce(new Error("Submission failed"));
        const { submitButton } = setup(sampleReport);

        await userEvent.click(submitButton);

        expect(onSuccessAction).not.toHaveBeenCalled();
        expect(onErrorAction).toHaveBeenCalled();
    });

    it("should reset the form after successful submission when resetOnSuccess is true", async () => {
        const { submitButton } = setup(sampleReport, {
            resetOnSuccess: true,
        });

        await userEvent.click(submitButton);

        await waitFor(async () => {
            expect(getInput("sys")).toHaveValue(0);
            expect(getInput("dia")).toHaveValue(0);
            expect(getInput("pulse")).toHaveValue(0);
            expect(getInput("notes")).toHaveValue("");
            expect(getRatingRadio(3)).toBeChecked();
        });
    });
});
