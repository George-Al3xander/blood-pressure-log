import { LogReport } from "@/types/types";
import dayjs, { OpUnitType } from "dayjs";
import flatten from "lodash/flatten";
import groupBy from "lodash/groupBy";
import isEqual from "lodash/isEqual";
import values from "lodash/values";

export const groupByProperty = (
    data: LogReport[],
    property: OpUnitType,
): LogReport[][] => {
    if (data.length === 0) return [];

    const groupedByProperty = groupBy(data, (day) =>
        dayjs(day.date).startOf(property).valueOf(),
    );
    const items = values(groupedByProperty); // items sorted by specified property

    const filteredItems = items.map((property_item) => {
        const leftovers = property_item.filter(
            (item) => !property_item.some((another) => isEqual(item, another)),
        );
        return leftovers.length > 0
            ? [property_item, ...groupByProperty(leftovers, property)]
            : [property_item];
    });

    return flatten(filteredItems);
};
