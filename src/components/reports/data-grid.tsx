"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { LogReport } from '@/types/types';
import dayjs from 'dayjs';

const columns: GridColDef[] = [ 
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 100,
    flex: 0.2,
    renderCell: (param) => <>{dayjs(param.value).format("MMMM D, YYYY h:mm A")}</>
  },
  {
    field: 'sys',
    headerName: 'Sys',
    type: "number",
    //width: 150,
    
  },
  {
    field: 'dia',
    headerName: 'dia',
    type: 'number',
    //width: 110,
    
  },
  {
    field: 'pulse',
    headerName: 'pulse',
    type: 'number',
     
  },
  {
    field: 'rating',
    headerName: 'rating',    
  },
  {
    field: 'notes',
    headerName: 'notes',    
    flex: 0.4
  },
];


export default function DataGridDemo({items}:{items: LogReport[]}) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          
          getRowId={(row) => row._id}
          pageSizeOptions={[5]}
          //checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  }