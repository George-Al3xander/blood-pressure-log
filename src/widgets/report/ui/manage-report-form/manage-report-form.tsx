"use client";

import {
    ReportDatePicker,
    ReportRatingRange,
    ReportTextField,
} from "@/features/report";
import { Button, Grid } from "@/shared/ui";
import { FC, ReactNode } from "react";

import { useManageReport } from "./use-manage-report";

type Props = {
    submitButtonChildren: ReactNode;
    submitButtonChildrenOnLoading?: ReactNode;
} & Parameters<typeof useManageReport>[0];

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
                        {...fieldBaseProps}
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={reset}
                    >
                        {clearButtonText}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
