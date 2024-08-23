"use client";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    const router = useRouter();
    console.log(error.digest);
    const t = useTranslations("table");
    return (
        <Stack textAlign={"center"}>
            <Typography fontWeight={600} variant="h4" color={"Red"}>
                {error.name}
            </Typography>
            <Typography mb={4} variant="subtitle2">
                {error.message}
            </Typography>
            {error.digest && (
                <Typography mb={4} variant="subtitle2">
                    {error.digest}
                </Typography>
            )}
            <ButtonGroup sx={{ alignSelf: "center" }}>
                <Button variant="contained" onClick={() => router.push("/")}>
                    Home
                </Button>
                <Button variant="outlined" onClick={reset}>
                    {t("btn_retry")}
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default Error;
