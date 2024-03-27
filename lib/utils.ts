import dayjs, { OpUnitType } from "dayjs"
import isEqual from "lodash/isEqual"
import groupBy from "lodash/groupBy"
import values from "lodash/values"
import flatten from "lodash/flatten"
import { LogReport } from "@/types/types"
import { LogPageSearchParams } from "@/app/[locale]/log/page"

export const groupByProperty = (
  data: LogReport[],
  property: OpUnitType
): LogReport[][] => {
  if (data.length === 0) return []

  const groupedByProperty = groupBy(data, (day) =>
    dayjs(day.date).startOf(property).valueOf()
  )
  const items = values(groupedByProperty) // items sorted by specified property

  const filteredItems = items.map((property_item) => {
    const leftovers = property_item.filter(
      (item) => !property_item.some((another) => isEqual(item, another))
    )
    return leftovers.length > 0
      ? [property_item, ...groupByProperty(leftovers, property)]
      : [property_item]
  })

  return flatten(filteredItems)
}

export const handleLogPageParams = (obj: LogPageSearchParams) => {
  const keys: (keyof LogPageSearchParams)[] = [
    "tableVariant",
    "page",
    "pageSize",
  ]
  let str = "?"
  keys.forEach((key) => {
    if (obj[key]) {
      const data = `${key}=${obj[key]}`
      str = str.concat(str.length > 1 ? "&" : "", data)
    }
  })
  return str.length > 1 ? str : ""
}
