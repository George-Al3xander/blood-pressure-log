import { MongoUser } from "@/types/types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Avatar, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const icons = {
    email: <MailIcon color="primary" />,
    name: <PersonIcon color="primary" />,
    reports_count: <SummarizeIcon color="primary" />,
    createdAt: <CalendarMonthIcon color="primary" />,
} as const;

const MetricCard = ({
    path,
    children,
}: {
    path: string;
    children: ReactNode;
}) => {
    const t = useTranslations("metrics");
    return (
        <Stack
            sx={{
                borderBottom: "1px solid grey",
                p: 2,
            }}
            gap={1}
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Stack gap={0.5} alignItems={{ sx: "center", sm: "initial" }}>
                <Typography
                    textAlign={{ xs: "center", sm: "left" }}
                    sx={{ wordBreak: "break-word" }}
                    variant="h6"
                    fontWeight={700}
                >
                    {children}
                </Typography>
                <Typography
                    textAlign={{ xs: "center", sm: "left" }}
                    variant="caption"
                >
                    {t(path)}
                </Typography>
            </Stack>
            <Avatar
                sx={{
                    bgcolor: "white",
                    width: 56,
                    height: 56,
                    border: "1px solid grey",
                }}
            >
                {icons[path as "email"]}
            </Avatar>
        </Stack>
    );
};

const MetricsSidebar = (props: MongoUser & { reports_count: number }) => {
    const keys = ["name", "email", "createdAt", "reports_count"];

    return (
        <Stack
            gap={4}
            justifyContent={"space-between"}
            // direction={{ xs: "row", sm: "column" }}
        >
            {keys.map(
                (key) =>
                    key != "_id" && (
                        <MetricCard path={key} key={"card" + key}>
                            {key === "name"
                                ? `${props.name.first} ${props.name.last}`
                                : key === "createdAt"
                                  ? dayjs(props.createdAt).format("MM/DD/YYYY")
                                  : props[key as "email"]}
                        </MetricCard>
                    ),
            )}
        </Stack>
    );
};

export default MetricsSidebar;
