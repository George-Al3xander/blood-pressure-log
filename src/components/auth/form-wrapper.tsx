import { Grid, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export default function FormWrapper({
    children,
    type,
}: {
    children: ReactNode;
    type: "register" | "login";
}) {
    const t = useTranslations("auth");

    return (
        <Grid spacing={4} alignItems={"center"} direction={"column"} container>
            <Grid xs={12} item>
                <Typography
                    display={{ xs: "none", md: "initial" }}
                    fontWeight={600}
                    sx={{ color: "primary.main" }}
                    variant="h6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-clipboard-pulse"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1H3a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1h-1v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2m6.979 3.856a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.895-.133L4.232 10H3.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .416-.223l1.41-2.115 1.195 3.982a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h1.5a.5.5 0 0 0 0-1h-1.128z"
                        />
                    </svg>
                    Blood Pressure Log
                </Typography>
            </Grid>
            <Grid alignSelf={"flex-start"} item xs={12}>
                <Typography fontWeight={600} variant="h5">
                    {t("welcomeTitle")}
                </Typography>
                <Typography variant="caption">{t(`${type}Message`)}</Typography>
            </Grid>
            {children}
            <Grid item xs={12}>
                <Link href={`/auth/${type == "login" ? "register" : "login"}`}>
                    <Typography variant="caption">
                        {t(`${type}PageLink`)}
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    );
}
