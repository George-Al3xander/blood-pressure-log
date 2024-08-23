"use client";
import { TEditUserSchema } from "@/lib/auth/zodSchemas";
import { Field, ZodValidationArgs } from "@/types/types";
import { Grid2Props } from "@mui/material";

import { comparePassword, updateUser } from "@/lib/mongo/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ZodUserForm from "../auth/zod-user-form";

const fields: (Field<TEditUserSchema> & Grid2Props & { item?: boolean })[] = [
    {
        name: "name_first",
        xs: 12,
        md: 6,
    },
    {
        name: "name_last",
        xs: 12,
        md: 6,
    },
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

const EditUserForm = ({
    user,
}: {
    user: Omit<TEditUserSchema, "password">;
}) => {
    const router = useRouter();
    const t = useTranslations("zod");

    const onSuccess = async (data: TEditUserSchema) => {
        const res = await updateUser(data);
        if (res.success) {
            toast.success(t("submit.success"));
            router.push("/log/profile");
        } else {
            toast.error(t("submit.fail"));
        }
    };
    const props: ZodValidationArgs = {
        type: "edit",
        onValidationSuccess: onSuccess,
        additionalCheck: [
            {
                path: ["email", "password"],
                messagePath: "invalidCredentials",
                func: comparePassword,
            },
        ],
    };
    return <ZodUserForm defaultValues={user} fields={fields} {...props} />;
};

export default EditUserForm;
