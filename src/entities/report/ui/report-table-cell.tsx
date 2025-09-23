import { TReport } from "@/shared/model";
import { TableCell, type TableCellProps } from "@/shared/ui";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
    field: keyof TReport;
    value?: TReport[keyof TReport];
    displayVariant: "label" | "data";
} & TableCellProps;

export const ReportTableCell: FC<Props> = ({
    field,
    value,
    displayVariant,
    ...props
}) => {
    const t = useTranslations("vitals");

    let content;

    if (displayVariant === "data") {
        content = value;

        if (value instanceof Date) {
            content = dayjs(content).format("DD/MM/YYYY H:mm");
        } else if (field === "rating") {
            content = t(`rating.range.${content}`);
        }
    } else {
        content = field === "rating" ? t("rating.title") : t(field);
    }

    if (content === undefined || content == null) return null;

    return <TableCell {...props}>{content.toString()}</TableCell>;
};
