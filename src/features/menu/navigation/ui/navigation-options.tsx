"use client";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ElementType, FC } from "react";

type NavigationOption = {
    id: string;
    href: string;
    icon: ElementType;
};

const AUTHORIZED_OPTIONS: NavigationOption[] = [
    { id: "home", href: "/", icon: HomeIcon },
    { id: "profile", href: "/profile", icon: AssignmentIndIcon },
    { id: "create", href: "/create", icon: NoteAddIcon },
];
const UNAUTHORIZED_OPTIONS: NavigationOption[] = [
    { id: "sign-in", href: "sign-in", icon: LoginIcon },
    { id: "sign-up", href: "sign-up", icon: PersonAddIcon },
];

type Props = {
    handleClose: () => void;
    isSignedIn?: boolean;
};

export const NavigationOptions: FC<Props> = ({
    isSignedIn = false,
    handleClose,
}) => {
    const router = useRouter();
    const t = useTranslations("menu");

    const options = isSignedIn ? AUTHORIZED_OPTIONS : UNAUTHORIZED_OPTIONS;

    const handleClick = (path: string) => () => {
        router.push(path);
        handleClose();
    };

    return options.map(({ id, href, icon: Icon }) => (
        <MenuItem key={`navigation-item-${id}`} onClick={handleClick(href)}>
            <ListItemIcon>
                <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t(id)}</ListItemText>
        </MenuItem>
    ));
};
