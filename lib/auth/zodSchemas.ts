import dayjs from "dayjs";
import { TranslationValues } from "next-intl";
import { z } from "zod";

type Translator = (arg: string, values?: TranslationValues) => string;

const EmailSchema = (t: Translator) =>
    z
        .string()
        .email(t("email.email"))
        .min(3, t("email.min", { length: 3 }));

const NameSchema = (t: Translator, type: "first" | "last") =>
    z
        .string()
        .min(3, t(`name_${type}.min`, { length: 3 }))
        .max(256, t(`name_${type}.max`, { length: 256 }));

const UserPersonalInfo = (t: Translator) => ({
    name_first: NameSchema(t, "first"),
    name_last: NameSchema(t, "last"),
    email: EmailSchema(t),
});

export const UserRegisterSchema = (t: Translator) =>
    z
        .object({
            ...UserPersonalInfo(t),
            password: z
                .string()
                .min(8, t("password.min", { length: 8 }))
                .max(15, t("password.max", { length: 15 }))
                .refine((password) => /[a-z]/.test(password), {
                    message: t("password.lowercase"),
                })
                .refine((password) => /[A-Z]/.test(password), {
                    message: t("password.uppercase"),
                })
                .refine((password) => /\d/.test(password), {
                    message: t("password.numeric"),
                })
                .refine(
                    (password) => /[!@_#$%^&*(),.?":{}|<>]/.test(password),
                    {
                        message: t("password.specialCharacter"),
                    },
                ),
            confirmPassword: z
                .string()
                .min(8, t("confirmPassword.min", { length: 8 }))
                .max(15, t("confirmPassword.max", { length: 15 })),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("confirmPassword.equality"),
            path: ["confirmPassword"],
        });

export const UserLoginSchema = (t: Translator) =>
    z.object({
        email: EmailSchema(t),
        password: z
            .string()
            .min(8, t("password.min", { length: 8 }))
            .max(15, t("password.max", { length: 15 })),
    });

const tableNumObj = (t: any) =>
    z.coerce
        .number()
        .gte(1, t("number.min", { length: 1 }))
        .lte(300, t("number.max", { length: 300 }));

export const ReportSchema = (t: Translator) =>
    z.object({
        date: z.coerce.date(),
        sys: tableNumObj(t),
        dia: tableNumObj(t),
        pulse: tableNumObj(t),
        rating: z.coerce
            .number()
            .gte(1, t("rating.min", { length: 1 }))
            .max(5, t("rating.max", { length: 5 })),
        notes: z
            .string()
            .min(10, t("notes.min", { length: 10 }))
            .max(250, t("notes.max", { length: 250 })),
    });

export const DateRangeSchema = (t: Translator) =>
    z
        .object({
            from: z.coerce.date(),
            to: z.coerce.date(),
        })
        .refine(({ from, to }) => dayjs(from).isBefore(dayjs(to)), {
            path: ["from"],
            message: t("date_range.from"),
        })
        .refine(({ from, to }) => dayjs(to).isAfter(dayjs(from)), {
            path: ["to"],
            message: t("date_range.to"),
        });

export const EditUserSchema = (t: Translator) =>
    z.object({
        ...UserPersonalInfo(t),
        password: z
            .string()
            .min(8, t("password.min", { length: 8 }))
            .max(15, t("password.max", { length: 15 })),
    });

export type TUserLoginData = z.infer<ReturnType<typeof UserLoginSchema>>;
export type TReportData = z.infer<ReturnType<typeof ReportSchema>>;
export type TUserRegisterData = z.infer<ReturnType<typeof UserRegisterSchema>>;
export type TUserLoginSchema = z.TypeOf<ReturnType<typeof UserLoginSchema>>;
export type TEditUserSchema = z.TypeOf<ReturnType<typeof EditUserSchema>>;

export type TUserRegisterSchema = z.TypeOf<
    ReturnType<typeof UserRegisterSchema>
>;
export type TReportSchema = z.TypeOf<ReturnType<typeof ReportSchema>>;
export type TDateRangeData = z.infer<ReturnType<typeof DateRangeSchema>>;
