"use client";

import { setUserLocale } from "@/shared/i18n";
import CheckIcon from "@mui/icons-material/Check";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useLocale } from "next-intl";

const LANGUAGE_LABELS = { en: "English", uk: "Українська" } as const;

export const LanguageOptions = () => {
    const locale = useLocale();

    const handleLanguageSelect = (locale: string) => async () => {
        await setUserLocale(locale.toString());
    };

    return Object.entries(LANGUAGE_LABELS).map(([k, v]) => {
        const isCurrentLocale = locale === k;

        return (
            <MenuItem
                key={`select-${k}`}
                onClick={handleLanguageSelect(k)}
                disabled={isCurrentLocale}
            >
                {isCurrentLocale && (
                    <ListItemIcon>
                        <CheckIcon fontSize="small" />
                    </ListItemIcon>
                )}
                <ListItemText inset={!isCurrentLocale}>{v}</ListItemText>
            </MenuItem>
        );
    });
};
