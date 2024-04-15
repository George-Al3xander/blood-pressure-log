export type Schemas = "login" | "register" | "report" | "dateRange" | "edit"
export type BodyReq = { data: unknown; type: Schemas }
import {
  DateRangeSchema,
  EditUserSchema,
  ReportSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "../../auth/zodSchemas"

export const schemas = {
  login: UserLoginSchema,
  register: UserRegisterSchema,
  report: ReportSchema,
  dateRange: DateRangeSchema,
  edit: EditUserSchema,
}
