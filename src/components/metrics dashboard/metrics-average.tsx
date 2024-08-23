"use client";
import { MetricsResponse } from "@/types/types";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import {
    Box,
    Grid,
    IconOwnProps,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import ReactCardFlip from "react-card-flip";

//green - #76ff03
//red - #f44336
//orange - #ff9100

const keys = ["sys_average", "dia_average", "pulse_average", "rating_average"];
const colors = {
    green: "#76ff03",
    red: "#f44336",
    orange: "#ff9100",
};

const handleCondtion = ({ path, value }: { path: string; value: number }) => {
    const { green, red, orange } = colors;
    if (path == "pulse") {
        if (value < 60 || value > 100) return red;
        else return green;
    }

    if (path == "sys") {
        if (value < 115 || value > 140) return red;
        else if (value < 129 || value > 120) return orange;
        else return green;
    }

    if (path == "dia") {
        if (value < 60 || value > 90) return red;
        else if (value < 80 && value > 89) return orange;
        else return green;
    }

    if (path == "rating") {
        if (value < 3) return red;
        else if (value < 4) return orange;
        else return green;
    }
};

const iconProps: IconOwnProps = {
    sx: {
        "&:hover": { cursor: "pointer" },
    },
};

const MetricCard = ({ path, value }: { path: string; value: number }) => {
    const t = useTranslations("table");
    const tMetrics = useTranslations("metrics");
    const key = path.split("_")[0];
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Paper
            component={"div"}
            sx={{
                px: 2,
                pb: 3,
                textAlign: "center",
                pt: 0.5,
                overflow: "hidden",
                maxHeight: "8rem",
                height: "8rem",
            }}
            elevation={4}
        >
            <Stack>
                <Stack sx={{ my: 1 }} alignItems={"flex-end"}>
                    {checked ? (
                        <CloseIcon
                            onClick={handleChange}
                            color="error"
                            {...iconProps}
                        />
                    ) : (
                        <InfoIcon
                            onClick={handleChange}
                            color="info"
                            {...iconProps}
                        />
                    )}
                </Stack>
                <ReactCardFlip isFlipped={checked} flipDirection="horizontal">
                    <span>
                        <Typography variant="h5">{t(key)}</Typography>
                        <Typography
                            sx={{ color: handleCondtion({ path: key, value }) }}
                            variant="h4"
                        >
                            {Math.floor(value)}
                        </Typography>
                    </span>
                    <Box sx={{ maxHeight: 100, overflowY: "auto" }}>
                        {tMetrics(`average.desc.${key}`)}
                    </Box>
                </ReactCardFlip>
            </Stack>
        </Paper>
    );
};

const MetricsAverage = (props: MetricsResponse) => {
    return (
        <Grid spacing={4} container>
            {keys.map((key) => (
                <Grid key={key} xs={12} md={6} item>
                    <MetricCard
                        path={key}
                        value={props[key as "pulse_average"] as number}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default MetricsAverage;
