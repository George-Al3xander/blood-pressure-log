import CreateLogForm from '@/components/log/create-report-form'
import React from 'react'
import { TReportData } from '../../../../../lib/auth/zodSchemas'

const CreateReportPage = () => {

  // const defVals : TReportData = {
  //     date: new Date("2024-03-13T13:10:44+0000"),
  //     sys: 120,
  //     dia: 80,
  //     pulse:76,
  //     rating: 3,
  //     notes: "Good ma boy, almost perfect"
  // }

  return (
    <div><CreateLogForm /></div>
  )
}

export default CreateReportPage