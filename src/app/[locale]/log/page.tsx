
import PrintWrapper from '@/components/print-test'
import ReportsTable from '@/components/reports/reports-table'
import React from 'react'


const LogPage = ({params: {locale}}:{params: {locale?: string}}) => {

  return (
    <div>
      <PrintWrapper>
        <ReportsTable locale={locale}/>
      </PrintWrapper>
    </div>
  )
}

export default LogPage