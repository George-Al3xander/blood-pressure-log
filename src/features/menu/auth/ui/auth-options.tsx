"use client";

import { useRouter } from "@/shared/i18n";
import { useClerk } from "@clerk/nextjs";
import HideSourceIcon from "@mui/icons-material/HideSource";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { ElementType, FC } from "react";

type Props = {
    isSignedIn?: boolean;
    handleClose: () => void;
};

const NO_AUTH_OPTIONS: { key: string; icon: ElementType }[] = [
    { key: "sign-in", icon: LoginIcon },
    { key: "sign-up", icon: PersonAddIcon },
];

export const AuthOptions: FC<Props> = ({ isSignedIn = false, handleClose }) => {
    const router = useRouter();
    const t = useTranslations("menu");
    const { signOut } = useClerk();

    const handleClick = (fn: () => void) => () => {
        fn();
        handleClose();
    };

    if (!isSignedIn)
        return NO_AUTH_OPTIONS.map(({ key, icon: Icon }) => (
            <MenuItem
                key={`menu-item-${key}`}
                onClick={handleClick(() => router.push(key))}
            >
                <ListItemIcon>
                    <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t(key)}</ListItemText>
            </MenuItem>
        ));

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
