import { createLocalizedSchema } from "@/shared/lib";
import { useTranslations } from "next-intl";
import { z } from "zod";

type Translator = ReturnType<typeof useTranslations>;

export const reportSchema = (t: Translator) => {
    const withTranslator = createLocalizedSchema(t);

    return z.object({
        userId: z.string().optional(),
        _id: z.string(),
        date: z.coerce.date({ message: t("invalid_date") }),
        sys: withTranslator({
            fieldName: "sys",
            dataType: "number",
            min: 1,
            max: 300,
        }),
        dia: withTranslator({
            fieldName: "dia",
            dataType: "number",
            min: 1,
            max: 300,
        }),
        pulse: withTranslator({
            fieldName: "pulse",
            dataType: "number",
            min: 1,
            max: 300,
        }),
        rating: withTranslator({
            fieldName: "rating",
            dataType: "range",
            min: 1,
            max: 5,
        }),
        notes: withTranslator({
            fieldName: "notes",
            dataType: "string",
            min: 10,
            max: 250,
        }),
    });
};

export type TReport = z.infer<ReturnType<typeof reportSchema>>;
