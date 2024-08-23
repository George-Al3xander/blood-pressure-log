import { Typography } from "@mui/material";

export const MockHelperText = ({ text }: { text?: unknown }) => {
    if (!text) return null;
    return (
        <Typography role="alert" color={"red"} ml={"1rem"} variant="caption">
            {typeof text == "string" ? text : "Something went wrong"}
        </Typography>
    );
};
