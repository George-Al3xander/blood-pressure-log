import { useTranslations } from "next-intl";
import { z, ZodNumber, ZodString } from "zod";

type Translator = ReturnType<typeof useTranslations>;

type ZodTypeMap = {
    string: ZodString;
    number: ZodNumber;
    range: ZodNumber;
};

export const createLocalizedSchema =
    (t: Translator) =>
    <TDataType extends keyof ZodTypeMap>({
        fieldName,
        dataType,
        ...params
    }: {
        fieldName: string;
        dataType: TDataType;
        max?: number;
        min?: number;
    }): ZodTypeMap[TDataType] => {
        const baseConfig = { title: fieldName };

        let schema: ZodString | ZodNumber =
            dataType === "string"
                ? z.string({ message: t("string.type", baseConfig) })
                : z.coerce.number({ message: t("number.type", baseConfig) });

        if (dataType === "range") {
            schema = (schema as ZodNumber).int({
                message: t("number.int", baseConfig),
            });
            dataType = "number" as TDataType;
        }

        for (const [key, value] of Object.entries(params) as [
            keyof typeof params,
            number,
        ][]) {
            schema = schema[key](value, {
                message: t(`${dataType}.${key}` as string, {
                    length: value,
                    ...baseConfig,
                }),
            });
        }

        return schema as ZodTypeMap[TDataType];
    };
