"use client";

import { useClerk } from "@clerk/nextjs";

import { ListItemIcon, ListItemText, MenuItem } from "@/shared/ui";
import { HideSourceIcon } from "@/shared/ui/icons";
import { useTranslations } from "next-intl";
import { FC } from "react";

type Props = {
    handleClose: () => void;
};

export const LogoutOption: FC<Props> = ({ handleClose }) => {
    const t = useTranslations("menu");
    const { signOut } = useClerk();

    const handleClick = (fn: () => void) => () => {
        fn();
        handleClose();
    };

    return (
        <MenuItem
            onClick={handleClick(() => signOut({ redirectUrl: "/" }))}
            sx={{ color: "error.main" }}
        >
            <ListItemIcon sx={{ color: "error.main" }}>
                <HideSourceIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("logout")}</ListItemText>
        </MenuItem>
    );
};
