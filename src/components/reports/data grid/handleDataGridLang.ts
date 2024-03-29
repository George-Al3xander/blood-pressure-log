import { locales } from "@/middleware"
import { ukUA, enUS } from "@mui/x-data-grid/locales"
import { Localization } from "@mui/x-data-grid/utils/getGridLocalization"

const muiTranslations: Record<(typeof locales)[number], Localization> = {
  en: enUS,
  uk: ukUA,
}

export const handleDataGridLocale = (locale: "en" | "uk") =>
  muiTranslations[locale].components.MuiDataGrid.defaultProps.localeText
