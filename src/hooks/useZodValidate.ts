"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { AdditionalCheckItem } from "@/types/types";
import { BodyReq, Schemas, schemas } from "../../lib/mongo/schemas/schemas";

const useZodValidate = ({
    onValidationSuccess,
    type,
    additionalCheck,
    defaultValues,
}: {
    onValidationSuccess: Function;
    type: Schemas;
    additionalCheck?: AdditionalCheckItem[];
    defaultValues?: any;
}) => {
    const [extraCheck, setExtraCheck] = useState(false);

    const schema = schemas[type];
    const t = useTranslations("zod");

    const formReturn = useForm({
        resolver: zodResolver(schema(t)),
        defaultValues,
    });

    const {
        handleSubmit,
        setError,
        getValues,
        formState: { isLoading },
    } = formReturn;

    const onSubmit = async (data: unknown) => {
        setExtraCheck(true);
        try {
            const body: BodyReq = { data, type };
            const res = await fetch("/api/zod", {
                method: "POST",
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                toast.error(t("submit.fail"));
                return;
            }

            const resData = await res.json();
            if (resData.errors) {
                const { errors } = resData;
                const schemaKeys = Object.keys(schema);
                schemaKeys.forEach((key) => {
                    if (errors[key]) {
                        setError(key, {
                            type: "server",
                            message: errors[key],
                        });
                    }
                });
                return;
            }

            if (additionalCheck) {
                let errCount = 0;
                try {
                    for (const { func, path, messagePath } of additionalCheck) {
                        if (typeof path == "string") {
                            const val = getValues(path);
                            const res = await func(val);
                            if (!res) {
                                errCount = errCount + 1;
                                setError(path, {
                                    type: "server",
                                    message: t(`${path}.${messagePath}`),
                                });
                            }
                        } else {
                            const val = getValues(path);

                            const pathMap = path.map((p, index) => [
                                p,
                                val[index],
                            ]) as readonly (readonly [unknown, unknown])[];
                            const entries = new Map(pathMap);
                            const obj = Object.fromEntries(entries);
                            const res = await func(obj);

                            if (!res) {
                                errCount = errCount + 1;
                                for (const pathItem of path) {
                                    setError(pathItem, {
                                        type: "server",
                                        message: t(messagePath),
                                    });
                                }
                            }
                        }
                    }
                } finally {
                }

                if (errCount > 0) {
                    setExtraCheck(false);
                    return;
                }
            }

            if (defaultValues) {
                if (
                    typeof defaultValues == "object" &&
                    typeof data == "object"
                ) {
                    if ("_id" in defaultValues) {
                        (data! as any)._id = defaultValues._id;
                    }
                }
            }
            await onValidationSuccess(data);
        } catch (error) {
            toast.error(t("submit.fail"));
        }
        setExtraCheck(false);
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) =>
        handleSubmit(onSubmit)(e);

    const isBusy = [isLoading, extraCheck].includes(true);

    return { ...formReturn, extraCheck, isBusy, submitForm };
};

export type UseZodValidateResult = ReturnType<typeof useZodValidate>;

export default useZodValidate;
