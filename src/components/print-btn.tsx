import { LogReport } from "@/types/types"
import { Button, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import React, { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import PrintIcon from "@mui/icons-material/Print"
import PlainTable from "./reports/plain-table"
import dayjs from "dayjs"
import LinearProgress from "@mui/material/LinearProgress"

const HeaderInfo = ({ t, isLoading }: { t: any; isLoading: boolean }) => (
  <Stack>
    <Typography variant="h5" fontWeight={600} textAlign={"center"}>
      {t(`btn_print.${isLoading ? "process" : "default"}`)}
    </Typography>
    <Typography textAlign={"center"} variant="subtitle2">
      {t(`print_header_info.${isLoading ? "process" : "default"}`)}
    </Typography>
  </Stack>
)

const PrintBtn = ({
  reports,
  isLoading,
}: {
  reports: LogReport[]
  isLoading: boolean
}) => {
  const t = useTranslations("table")
  const contentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  })
 
  return (
    <Stack gap={5}>
      <HeaderInfo isLoading={isLoading} t={t} />
      <div>
        <Button
          disabled={isLoading}
          onClick={handlePrint}
          startIcon={<PrintIcon />}
          variant="contained"
          fullWidth
        >
          {t("btn_print.default")}
        </Button>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div ref={contentRef} className="print-comp">
            <title>
              {t("date_range", {
                start: dayjs(reports[0].date).format("DD/MM/YYYY"),
                end: dayjs(reports[reports.length - 1].date).format(
                  "DD/MM/YYYY"
                ),
              })}
            </title>
            <PlainTable pagination={false} reports={reports} />
          </div>
        )}
      </div>
    </Stack>
  )
}

export default PrintBtn
