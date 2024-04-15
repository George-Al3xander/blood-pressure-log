import {
  Grid2Props,
  SxProps,
  TableCellProps,
  TableRowProps,
  TextFieldProps,
  TypographyProps,
} from "@mui/material"
import { OpUnitType } from "dayjs"

import { Control } from "react-hook-form"
import { ZodSchema } from "zod"
import { TReportData } from "../../lib/auth/zodSchemas"
import { Schemas } from "../../lib/mongo/schemas/schemas"

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

export type MongoUser = {
  _id: string
  email: string
  name: {
    first: string
    last: string
  }
  createdAt: string
}

export type LogReport = {
  date: Date
  sys: number
  dia: number
  _id: string
  pulse: number
  rating: number //5 | 4 | 3 | 2 | 1
  notes: string // e.g.
  //userId: string
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
  defaultValue?: string | number
  error?: string
}

export type TableVariantParam = "complex" | "plain"

export type ReportTableProps = {
  reports: LogReport[]
}

export type ReportTableWithPagination = ReportTableProps & {
  reportCount: number
  isLoading: boolean
  onChange: any
  paginationModel: { page: number; pageSize: number }
}

export type PlainTable = ReportTableProps &
  Partial<{
    pagination: boolean
    reportCount: number
    isLoading: boolean
    onChange: any
    paginationModel: { page: number; pageSize: number }
  }>

export type DataGridProps = ReportTableWithPagination & {
  locale: string
  onOptimistic: TOptimistic
  //manageReport: TOptimistic
}

export type TOptAction = {
  action: "POST" | "PUT" | "DELETE" | "ERROR"
  newReport: TReportData & { _id: string }
}
type TOptimistic = (action: TOptAction, callback?: () => void) => void

export type ManageReportProps<T extends LogReport | TReportData> = {
  type: "POST" | "PUT"
  defaultValue?: T
  onOptimistic: TOptimistic
  onValidationSuccess: (data: T) => Promise<
    | {
        success: boolean
        report?: undefined
      }
    | {
        success: boolean
        report: LogReport
      }
  >
}

export type UpdateReportProps = ManageReportProps<LogReport>

export type CreateReportProps = ManageReportProps<TReportData>

export type UpdateReportModalProps = Omit<
  ManageReportProps<LogReport>,
  "onValidationSuccess"
>

export type CreateReportModalProps = Omit<
  ManageReportProps<TReportData>,
  "onValidationSuccess"
>

export type ZodFormField<T> = Field<T> & Grid2Props & { item?: boolean }

export type ZodValidationArgs = {
  onValidationSuccess: Function
  type: Schemas
  additionalCheck?: AdditionalCheckItem[]
  defaultValues?: any
}

export type MetricsResponce = {
  _id: null
  sys_average: number
  dia_average: number
  pulse_average: number
  rating_average: number
}

export type MetricsDashboardProps = {
  metrics: MetricsResponce & { reports_count: number }
  userInfo: MongoUser
}
