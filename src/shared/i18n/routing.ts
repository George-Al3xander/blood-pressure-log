import { defineRouting } from "next-intl/routing";

export const locales = ["en", "uk"];

export const routing = defineRouting({
    locales,
    defaultLocale: "en",
});
