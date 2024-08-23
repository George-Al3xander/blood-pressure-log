import { CircularProgress, Stack } from "@mui/material";

export default function Profile() {
    return (
        <Stack
            width={"100%"}
            alignItems={"center"}
            height={"60vh"}
            justifyContent={"center"}
        >
            <CircularProgress size={"4rem"} color="primary" />
        </Stack>
    );
}
