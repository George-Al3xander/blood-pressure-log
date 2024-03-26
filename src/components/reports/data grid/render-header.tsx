import { Typography } from "@mui/material"
import { GridColumnHeaderParams } from "@mui/x-data-grid"
import { useTranslations } from "next-intl"
import React from "react"

const RenderHeader = ({ field }: { field: string }) => {
  const t = useTranslations("table")
  return <Typography color="primary">{t(field)}</Typography>
}



export default RenderHeader
