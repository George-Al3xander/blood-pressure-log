import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const RenderHeader = ({ field }: { field: string }) => {
    const t = useTranslations("table");
    return <Typography color="primary">{t(field)}</Typography>;
};

export default RenderHeader;
