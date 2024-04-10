'use client'
import { MetricsResponce } from "@/types/types"
import { Card, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { BarChart } from '@mui/x-charts/BarChart';
const keys = ["sys_average", "dia_average", "pulse_average", "rating_average"]

//pul - A normal resting heart rate for adults ranges from 60 to 100 beats per minute.

// const handleCondition = (path: typeof keys[number], value: number) => {
//     if(path == "sys_average") {
//         if(value)
//     }

// }

const MetricsAverage = ({sys_average, dia_average, pulse_average, rating_average}: MetricsResponce) => {

    return <BarChart
    series={[
      { data: [sys_average, dia_average, pulse_average, rating_average] },
      { data: [sys_average, dia_average, pulse_average, rating_average] },
      { data: [sys_average, dia_average, pulse_average, rating_average] },
      { data: [sys_average, dia_average, pulse_average, rating_average] },
     
    ]}
    height={290}
    xAxis={[{ data: ['Sys', 'Dia', 'Pulse', 'Rating'], scaleType: 'band' }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  />
  return (
    <Grid spacing={4} container>
      {keys.map((key) => (
        <Grid
        item
          
          
          //elevation={2}
          xs={12}
          //md={6}
          //component={Paper}
          key={"paper-" + key}
        >
         <Paper elevation={2}> <Typography>Average: {key}</Typography>
          <Typography>{Math.floor(props[key])}</Typography></Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default MetricsAverage
