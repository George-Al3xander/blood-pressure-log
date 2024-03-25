"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { LogReport } from '@/types/types';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';



export default function DataGridTable({items}:{items: LogReport[]}) {
  const t = useTranslations("table");

  const columns: GridColDef[] = [ 
    {
      field: 'date',     
      minWidth: 100,
      flex: .6,
      renderCell: (param) => <>{dayjs(param.value).format("DD-MM-YYYY, H:mm ")}</>,
      renderHeader: (param) => <>{t(param.field)}</>
    },  
    
    {
      field: 'sys',     
      type: "number",
      flex: .3,  
      renderHeader: (param) => <>{t(param.field)}</>
    },
    {
      field: 'dia',     
      type: 'number',
      flex: .3,
      renderHeader: (param) => <>{t(param.field)}</>
    },
    {
      field: 'pulse',     
      type: 'number',
      flex: .3, 
      renderHeader: (param) => <>{t(param.field)}</>    
    },
    {
      field: 'rating',     
      flex: .8,
      renderCell: (param) =>  <>{t(`rating_range.${param.value}`)}</>,
      renderHeader: (param) => <>{t(param.field)}</>   
    },
    {
      field: 'notes',      
      flex: 1,  
      renderHeader: (param) => <>{t(param.field)}</> 
    },
  ];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          
          getRowId={(row) => row.date}
          pageSizeOptions={[5,15]}
          //checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  }