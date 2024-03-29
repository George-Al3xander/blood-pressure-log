import {
  SxProps,
  TableCellProps,
  TableRowProps,
  TextFieldProps,
  TypographyProps,
} from "@mui/material"
import { OpUnitType } from "dayjs"
import { Control } from "react-hook-form"
import { ZodSchema, string } from "zod"

export type Field<T> = TextFieldProps & { name: keyof T }

export type IntlSchema = (t: (arg: string) => string) => ZodSchema

type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: V
}

export type AdditionalCheckFunc = (
  data: string | readonly string[] | any
) => Promise<boolean> | boolean

export type AdditionalCheckItem = {
  func: AdditionalCheckFunc
  path: string | readonly string[]
  messagePath: string
}

export type LogReport = {
  date: string
  sys: number
  dia: number
  _id: string
  pulse: number
  rating: 5 | 4 | 3 | 2 | 1
  notes: string // e.g.
}
//'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor',

export type GroupCell = string | TableCellProps

export type GroupItem = {
  property: OpUnitType
  children?: GroupItem
}

export type GroupByTypes = { [key: string]: GroupItem }

export type LabelStyling = { [key in OpUnitType]: TypographyProps }

export type CustomInput = {
  control: Control
  defaultValue?: string
  error?: string
}

export type TableVariantParam = "complex" | "plain"

export type ReportTableProps = {
  reports: LogReport[]
  reportCount: number
  isLoading: boolean
  onChange: any,
  paginationModel: { page: number; pageSize: number }
}

export type DataGridProps = ReportTableProps & {
  locale: string
 
}
