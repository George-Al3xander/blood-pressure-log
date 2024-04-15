import { Grid, Typography, Stack } from "@mui/material"
import React from "react"
import MetricsSidebar from "./metrics-sidebar"
import { MetricsDashboardProps } from "@/types/types"
import MetricsAverage from "./metrics-average"
import { useTranslations } from "next-intl"

const MetricsDashboard = ({ metrics, userInfo }: MetricsDashboardProps) => {
  const t = useTranslations("metrics")
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={4}>
        <MetricsSidebar {...userInfo} reports_count={metrics.reports_count} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack gap={2} mb={4}>
          <Typography textAlign={"center"} variant="h4">
            {t("average.title")}
          </Typography>
          <Typography fontStyle="italic" color="info.main" variant="caption">
            {t("average.disclaimer")}
          </Typography>
        </Stack>
        <MetricsAverage {...metrics} />
      </Grid>
    </Grid>
  )
}

export default MetricsDashboard
