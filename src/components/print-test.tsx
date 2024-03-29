"use client"
import { Box, Button, Divider, Modal, Typography } from "@mui/material"
import React, { ReactNode, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import ReportsTable from "./reports/reports-table"
import { DatePicker } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import DateRangePicker from "./date-range-picker"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const PrintWrapper = ({ children }: { children: ReactNode }) => {
  const componentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <DateRangePicker />
          <Box sx={style}></Box>
        </>
      </Modal>
    </div>
  )
}

export default PrintWrapper
