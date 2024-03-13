"use client"
import { Divider, Typography } from '@mui/material';
import React, { ReactNode, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReportsTable from './reports/reports-table';



const PrintWrapper = ({children}: {children: ReactNode}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
            {children}
      </div>
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default PrintWrapper