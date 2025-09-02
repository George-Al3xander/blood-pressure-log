"use client";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ElementType, FC } from "react";

type Props = {
    handleClose: () => void;
};

const OPTIONS: { key: string; icon: ElementType; path: string }[] = [
    { key: "home", path: "/", icon: HomeIcon },
    { key: "profile", path: "/profile", icon: AssignmentIndIcon },
];

export const NavigationOptions: FC<Props> = ({ handleClose }) => {
    const router = useRouter();
    const t = useTranslations("menu");

    const handleClick = (path: string) => () => {
        router.push(path);
        handleClose();
    };

    return OPTIONS.map(({ key, path, icon: Icon }) => {
        return (
            <MenuItem key={`menu-item-${key}`} onClick={handleClick(path)}>
                <ListItemIcon>
                    <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t(key)}</ListItemText>
            </MenuItem>
        );
    });
};
