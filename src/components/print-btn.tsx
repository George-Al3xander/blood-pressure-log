import { LogReport } from "@/types/types"
import { Button } from "@mui/material"
import { useTranslations } from "next-intl"
import React, { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import PrintIcon from "@mui/icons-material/Print"
import PlainTable from "./reports/plain-table"

const PrintBtn = (props: { reports: LogReport[] }) => {
  const t = useTranslations("table")
  const contentRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })
  return (
    <>
      <Button startIcon={<PrintIcon />} variant="contained">
        {t("btn_print.default")}
      </Button>
      <div>
        <PlainTable pagination={false} {...props} />
      </div>
    </>
  )
}

export default PrintBtn
