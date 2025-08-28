"use client";

import { useTranslations } from "next-intl";

export const HomePage = () => {
    const t = useTranslations("HomePage");

    return (
        <div>
            <p>{t("title")}</p>
        </div>
    );
};
