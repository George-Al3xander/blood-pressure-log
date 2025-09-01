"use client";

import { setUserLocale } from "@/shared/i18n";
import { useMuiMenuController } from "@/shared/lib";
import { LanguageIcon } from "@/shared/ui";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useLocale } from "next-intl";

const ARIA_BASE_NAME = "language-selection";

const LANGUAGE_LABELS = { en: "English", uk: "Українська" } as const;

export const LanguageSelectionMenu = () => {
    const locale = useLocale();
    const { triggerProps, menuProps, handleClose } =
        useMuiMenuController(ARIA_BASE_NAME);

    const handleLanguageSelect = (locale: string) => async () => {
        await setUserLocale(locale.toString());
        handleClose();
    };

    return (
        <div>
            <IconButton
                {...triggerProps}
                sx={{
                    color: "primary.contrastText",
                }}
            >
                <LanguageIcon />
            </IconButton>
            <Menu {...menuProps}>
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
