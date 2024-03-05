import {z} from "zod"



export const UserRegisterSchema =  (t: (arg: string) => string) => z.object({
  name_first: z.string().min(3, t("name_first.min")).max(256, t("name_first.max")),
  name_last: z.string().min(3, t("name_last.min")).max(256, t("name_last.max")),
  email: z.string().email(t("email.email")).min(3, t("email.min")),
  password: z.string()
    .min(8, t("password.min"))
    .max(15, t("password.max"))
    .refine((password) => /[a-z]/.test(password), { message: t("password.lowercase") })
    .refine((password) => /[A-Z]/.test(password), { message: t("password.uppercase") })
    .refine((password) => /\d/.test(password), { message: t("password.numeric") })
    .refine((password) => /[!@_#$%^&*(),.?":{}|<>]/.test(password), { message: t("password.specialCharacter") }),
  confirmPassword: z.string()
    .min(8, t("confirmPassword.min"))
    .max(15, t("confirmPassword.max"))
})
.refine((data) => data.password === data.confirmPassword, 
{
  message: t("confirmPassword.equality"), 
  path: ["confirmPassword"]
})


export const UserLoginSchema = (t: (arg: string) => string) =>  z.object({
  email: z.string().email(t("email.email")).min(3, t("email.min")),
  password: z.string()
    .min(8, t("password.min"))
    .max(15, t("password.max"))
});



export type TUserLoginData = z.infer<ReturnType<typeof UserLoginSchema>>
export type TUserRegisterData = z.infer<ReturnType<typeof UserRegisterSchema>>
export type TUserLoginSchema = z.TypeOf<ReturnType<typeof UserLoginSchema>>
export type TUserRegisterSchema = z.TypeOf<ReturnType<typeof UserRegisterSchema>>