"use client";
import useZodValidate from "@/hooks/useZodValidate";
import { ZodFormField, ZodValidationArgs } from "@/types/types";
import { Button, Grid, TextField } from "@mui/material";

import { useTranslations } from "next-intl";

const ZodUserForm = ({
    fields,
    ...props
}: ZodValidationArgs & { fields: ZodFormField<any>[] }) => {
    const t = useTranslations("auth");

    const {
        formState: { errors },
        isBusy,
        submitForm,
        register,
    } = useZodValidate(props);

    return (
        <Grid item component={"form"} onSubmit={submitForm}>
            <Grid spacing={2} container>
                {fields.map(({ name, type, xs, md, ...props }) => {
                    return (
                        <Grid key={name + "-grid"} xs={xs} md={md} item>
                            <TextField
                                required
                                fullWidth
                                label={t(name)}
                                type={type ?? "text"}
                                error={errors[name] != undefined}
                                helperText={
                                    errors[name] && errors
                                        ? (errors[name]!.message as string)
                                        : ""
                                }
                                key={name}
                                {...props}
                                {...register(name)}
                            />
                        </Grid>
                    );
                })}
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={isBusy}
                    >
                        {isBusy
                            ? t(`btn_${props.type}.process`)
                            : t(`btn_${props.type}.default`)}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ZodUserForm;
