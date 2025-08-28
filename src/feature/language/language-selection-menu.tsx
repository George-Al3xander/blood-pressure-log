"use client";

import { setUserLocale } from "@/shared/i18n";
import { LanguageIcon } from "@/shared/ui";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useLocale } from "next-intl";
import { useState, type MouseEvent } from "react";

const ARIA_BASE_NAME = "language-selection";

const LANGUAGE_LABELS = { en: "English", uk: "Українська" } as const;

export const LanguageSelectionMenu = () => {
    const locale = useLocale();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (locale: string) => async () => {
        await setUserLocale(locale.toString());
        handleClose();
    };

    return (
        <div>
            <IconButton
                id={`${ARIA_BASE_NAME}-button`}
                aria-label={`open ${ARIA_BASE_NAME.replaceAll("-", " ")}`}
                aria-controls={open ? `${ARIA_BASE_NAME}-menu` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                    color: "primary.contrastText",
                }}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                id={`${ARIA_BASE_NAME}-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        "aria-labelledby": `${ARIA_BASE_NAME}-button`,
                    },
                }}
            >
                {Object.entries(LANGUAGE_LABELS).map(([k, v]) => (
                    <MenuItem
                        key={`select-${k}`}
                        onClick={handleLanguageSelect(k)}
                        disabled={locale === k}
                    >
                        {v}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
