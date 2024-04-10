import { Grid } from "@mui/material"
import React from "react"
import MetricsSidebar from "./metrics-sidebar"
import { MetricsDashboardProps } from "@/types/types"
import MetricsAverage from "./metrics-average"

const MetricsDashboard = ({ metrics, userInfo }: MetricsDashboardProps) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={6}>
        <MetricsSidebar {...userInfo} reports_count={metrics.reports_count} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MetricsAverage {...metrics} />
      </Grid>
    </Grid>
  )
}

export default MetricsDashboard
