import { useTranslations } from "next-intl";

const RatingRangeCell = ({ value }: { value?: string }) => {
    const t = useTranslations("table");
    return <>{t(`rating_range.${value}`)}</>;
};

export default RatingRangeCell;
