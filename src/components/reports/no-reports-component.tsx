import ListAltIcon from "@mui/icons-material/ListAlt";
import { Avatar, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ManageReportModal from "../modals/manage report modal/manage-report-modal";
const NoReports = () => {
    const router = useRouter();
    const t = useTranslations("table");
    return (
        <Stack justifyContent={"center"} alignItems={"center"} gap={2}>
            <Avatar
                sx={{ bgcolor: "info.main", transform: "scale(1.8)", mb: 2 }}
            >
                <ListAltIcon />
            </Avatar>
            <Typography variant="h4">{t("no_reports.title")}</Typography>
            <Typography sx={{ opacity: ".7" }}>
                {t("no_reports.desc")}
            </Typography>
            <ManageReportModal
                onOptimistic={() => router.push("/")}
                type="POST"
            />
        </Stack>
    );
};

export default NoReports;
