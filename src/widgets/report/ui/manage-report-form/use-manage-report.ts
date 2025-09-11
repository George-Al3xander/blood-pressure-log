import { reportSchema, TReport } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridProps, TextFieldProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { ComponentProps, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { ManageReportForm } from "./manage-report-form";

const defaultReport: TReport = {
    sys: 0,
    dia: 0,
    pulse: 0,
    rating: 3,
    notes: "",
    userId: "",
    date: new Date(),
};

const textFieldConfigs: ({ name: keyof TReport } & Omit<
    TextFieldProps,
    "size" | "name"
> &
    GridProps)[] = [
    {
        name: "sys",
        type: "number",
        placeholder: "130",
        size: {
            xs: 12,
            md: 4,
        },
    },
    {
        name: "dia",
        type: "number",
        placeholder: "80",
        size: {
            xs: 12,
            md: 4,
        },
    },
    {
        name: "pulse",
        type: "number",
        placeholder: "75",
        size: {
            xs: 12,
            md: 4,
        },
    },
    {
        name: "notes",
        type: "text",
        size: 12,
        multiline: true,
        minRows: 2,
    },
] as const;

export const useManageReport = ({
    report = defaultReport,
    onSubmitAction,
    onSuccessAction,
    onErrorAction,
}: Omit<
    ComponentProps<typeof ManageReportForm>,
    "submitButtonChildren" | "submitButtonChildrenOnLoading"
>) => {
    const t = useTranslations("validation");

    const {
        control,
        reset,
        handleSubmit,
        formState: { isSubmitting: isLoading },
    } = useForm<TReport>({
        resolver: zodResolver(reportSchema(t)),
        defaultValues: report,
    });

    const fieldBaseProps = {
        control,
        disabled: isLoading,
        fullWidth: true,
        required: true,
    };

    const submit = (e: FormEvent<HTMLFormElement>) =>
        handleSubmit(async (r) => {
            try {
                await onSubmitAction(r);
                if (onSuccessAction) onSuccessAction();
            } catch (e) {
                console.error(e);
                if (onErrorAction) onErrorAction();
            }
        })(e);

    return {
        isLoading,
        textFieldConfigs,
        fieldBaseProps,
        clearButtonText: t("clear"),
        onSubmit: submit,
        reset: () => reset(),
    };
};
