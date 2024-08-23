import { MetricsDashboardProps } from "@/types/types";
import { Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import MetricsAverage from "./metrics-average";
import MetricsSidebar from "./metrics-sidebar";

const MetricsDashboard = ({ metrics, userInfo }: MetricsDashboardProps) => {
    const t = useTranslations("metrics");
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
                <MetricsSidebar
                    {...userInfo}
                    reports_count={metrics.reports_count}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Stack gap={2} mb={4}>
                    <Typography textAlign={"center"} variant="h4">
                        {t("average.title")}
                    </Typography>
                    <Typography
                        fontStyle="italic"
                        color="info.main"
                        variant="caption"
                    >
                        {t("average.disclaimer")}
                    </Typography>
                </Stack>
                <MetricsAverage {...metrics} />
            </Grid>
        </Grid>
    );
};

export default MetricsDashboard;
