import { Typography } from "@mui/material"
import { ReactNode } from "react"

export const MockHelperText = ({ text }: { text?:  unknown }) => {
  if (!text) return null
  return (
    <Typography color={"red"} ml={"1rem"} variant="caption">
      {typeof text == "string" ? text : "Something went wrong"}
    </Typography>
  )
}
