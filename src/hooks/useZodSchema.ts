import { IntlSchema } from "@/types/types";
import { useTranslations } from "next-intl";




const useZodSchema = (schema: IntlSchema) => {
    const t = useTranslations("t")

    return schema(t)
}  

export default useZodSchema