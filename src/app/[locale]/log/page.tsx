
import PrintWrapper from '@/components/print-test'
import ReportsTable from '@/components/reports/reports-table'
import { LogReport, TableVariantParam } from '@/types/types'
import React from 'react'
import { getAccessToken } from '../../../../lib/auth/actions'
import { headers } from 'next/headers'
import { fetchMongoData } from '../../../../lib/mongo/actions'
import DataGridTable from '@/components/reports/data-grid'




const LogPage = async ({params: {locale}, searchParams: {tableVariant}}:{params: {locale?: string},searchParams:{tableVariant?: TableVariantParam}}) => {
  const variant = tableVariant ?? "plain";
  
  const {reports} = await fetchMongoData<{success:boolean, reports: LogReport[]}>("/api/mongo/reports")
 
  if(variant == "complex") {
    return "COMPLEX"
  }
 
  
   return (
    <div>
     
      {reports.length > 0 ? 
      <DataGridTable items={reports}/>
      :
      "token"
      }
      {/* <PrintWrapper> */}
        {/* <ReportsTable locale={locale}/> */}
      {/* </PrintWrapper> */}
    </div>
  )
}

export default LogPage