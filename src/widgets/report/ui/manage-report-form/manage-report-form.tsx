"use client";

import {
    ReportDatePicker,
    ReportRatingRange,
    ReportTextField,
} from "@/features/report";
import { TReport } from "@/shared/model";
import { Button, Grid } from "@mui/material";
import { FC, ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";
import { useManageReport } from "./use-manage-report";

type Props<T = Omit<TReport, "userId">> = {
    report?: T;
    onSubmitAction: SubmitHandler<T>;
    onSuccessAction?: () => void;
    onErrorAction?: () => void;
    submitButtonChildren: ReactNode;
    submitButtonChildrenOnLoading?: ReactNode;
};

export const ManageReportForm: FC<Props> = ({
    submitButtonChildren,
    submitButtonChildrenOnLoading = submitButtonChildren,
    ...props
}) => {
    const {
        isLoading,
        textFieldConfigs,
        fieldBaseProps,
        clearButtonText,
        onSubmit,
        reset,
    } = useManageReport(props);

    return (
        <Grid container component="form" spacing={4} onSubmit={onSubmit}>
            <Grid container spacing={2} component="fieldset">
                {textFieldConfigs.map(({ size, ...props }) => (
                    <Grid key={props.name + "-grid"} size={size}>
                        <ReportTextField {...fieldBaseProps} {...props} />
                    </Grid>
                ))}
                <Grid size={12}>
                    <ReportDatePicker {...fieldBaseProps} />
                </Grid>
                <Grid size={12}>
                    <ReportRatingRange {...fieldBaseProps} />
                </Grid>
            </Grid>
            <Grid container spacing={2} size={12} component="fieldset">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Button
                        {...fieldBaseProps}
                        type="submit"
                        variant="contained"
                    >
                        {isLoading
                            ? submitButtonChildrenOnLoading
                            : submitButtonChildren}
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={reset}
                    >
                        {clearButtonText}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
