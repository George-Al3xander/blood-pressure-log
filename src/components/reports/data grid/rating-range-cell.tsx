import { useTranslations } from "next-intl"
import React from "react"

const RatingRangeCell = ({ value }: { value?: string }) => {
  const t = useTranslations("table")
  return <>{t(`rating_range.${value}`)}</>
}

export default RatingRangeCell
