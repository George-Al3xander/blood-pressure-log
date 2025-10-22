import { renderWithNextIntl } from "@/shared/mocks";
import { TReport } from "@/shared/model";
import { ManageReportForm } from "@/widgets/manage-report-form";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import dayjs from "dayjs";
import { ComponentProps } from "react";
import { vi } from "vitest";
import messages from "../../../messages/en.json";

const { vitals } = messages;

type ReportInputKey = Exclude<keyof TReport, "rating" | "userId">;

type ManageReportTestingApi = {
    getInput: (key: ReportInputKey) => HTMLElement;
    getRatingRadio: (num: 1 | 2 | 3 | 4 | 5) => HTMLElement;
    selectRatingOption: (rating: 1 | 2 | 3 | 4 | 5) => Promise<void>;
    fillFormFields: (report: Partial<TReport>) => Promise<void>;
    formProps: typeof formProps;
    renderForm: (
        report?: TReport,
        props?: Partial<ComponentProps<typeof ManageReportForm>>,
    ) => { submitButton: HTMLElement; clearButton: HTMLElement };
};

const formProps = {
    submitButtonChildren: "Submit",
    submitButtonChildrenOnLoading: "Submitting...",
    onSubmitAction: vi.fn(),
    onSuccessAction: vi.fn(),
    onErrorAction: vi.fn(),
} as const;

export const manageReportTestingApi: ManageReportTestingApi = {
    formProps,
    renderForm: (r, props) => {
        const SUBMIT_BTN_TEXT = "Submit";

        renderWithNextIntl(
            <ManageReportForm report={r} {...formProps} {...props} />,
        );

        const submitButton = screen.getByText(SUBMIT_BTN_TEXT, {
            selector: "button",
        });

        const clearButton = screen.getByText(messages.validation.clear, {
            selector: "button",
        });

        return { submitButton, clearButton };
    },

    getInput: (key) => {
        const matcher =
            key === "date" ? "Month" : new RegExp(vitals[key as "pulse"]);
        return screen.getByLabelText(matcher);
    },

    getRatingRadio: (num) => {
        return screen.getByLabelText(
            vitals.rating.range[num.toString() as "1"],
            {
                selector: "input",
            },
        );
    },

    selectRatingOption: async (rating) => {
        const btn = manageReportTestingApi.getRatingRadio(rating);
        await userEvent.click(btn);
    },

    fillFormFields: async (report) => {
        for (const [inputKey, rawValue] of Object.entries(report) as [
            keyof TReport,
            TReport[keyof TReport],
        ][]) {
            if (typeof rawValue === "undefined") continue;

            if (inputKey === "rating") {
                await manageReportTestingApi.selectRatingOption(
                    rawValue as 1 | 2 | 3 | 4 | 5,
                );
            } else {
                const element = manageReportTestingApi.getInput(
                    inputKey as ReportInputKey,
                );
                const value =
                    rawValue instanceof Date
                        ? dayjs(rawValue).format("MM/DD/YYYY HH:mm A")
                        : rawValue.toString();

                await userEvent.clear(element);
                await userEvent.type(element, value);
            }
        }
    },
};
