"use client";

import { UserResource } from "@clerk/types";
import { Avatar, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
    user: UserResource | null | undefined;
};

export const ProfilePreviewOption: FC<Props> = ({ user }) => {
    const t = useTranslations("menu");

    const fullName = user?.fullName || t("accountStatus.private");
    const subInfo =
        user?.primaryEmailAddress?.emailAddress ||
        user?.username ||
        t("accountStatus.signInRequired");

    return (
        <MenuItem
            sx={{
                display: "flex",
                gap: 1,
                "&:hover": { backgroundColor: "initial", cursor: "auto" },
            }}
            disableRipple
        >
            <Avatar
                sx={{ width: 40, height: 40 }}
                alt={fullName}
                src={user?.imageUrl}
            />
            <Box display="flex" flexDirection="column">
                <Typography component="h3" fontWeight={700}>
                    {fullName}
                </Typography>
                <Typography
                    component="p"
                    fontSize="0.85rem"
                    fontWeight={600}
                    sx={{ opacity: 0.65 }}
                >
                    {subInfo}
                </Typography>
            </Box>
        </MenuItem>
    );
};
