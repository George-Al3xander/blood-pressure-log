"use server";

import { cookies } from "next/headers";
import { routing } from "./routing";

const COOKIE_NAME = "NEXT_LOCALE";

export const getUserLocale = async () =>
    (await cookies()).get(COOKIE_NAME)?.value || routing.defaultLocale;

export const setUserLocale = async (locale: string) => {
    (await cookies()).set(COOKIE_NAME, locale);
};
