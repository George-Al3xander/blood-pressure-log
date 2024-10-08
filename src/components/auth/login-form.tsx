"use client";

import { TUserLoginData } from "@/lib/auth/zodSchemas";
import { checkIfUserExists, comparePassword } from "@/lib/mongo/utils";
import { ZodFormField, ZodValidationArgs } from "@/types/types";

import { useRouter } from "next/navigation";
import ZodUserForm from "./zod-user-form";

const fields: ZodFormField<TUserLoginData>[] = [
    {
        name: "email",
        xs: 12,
    },
    {
        name: "password",
        type: "password",
        xs: 12,
    },
];

const LoginForm = () => {
    const router = useRouter();
    const props: ZodValidationArgs = {
        onValidationSuccess: () => {
            router.push("/");
            router.refresh();
        },
        type: "login",
        additionalCheck: [
            {
                path: ["email", "password"],
                messagePath: "invalidCredentials",
                func: checkIfUserExists,
            },
            {
                path: ["email", "password"],
                messagePath: "invalidCredentials",
                func: comparePassword,
            },
        ],
    };

    return <ZodUserForm fields={fields} {...props} />;
};

export default LoginForm;
