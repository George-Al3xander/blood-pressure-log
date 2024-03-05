import {TextFieldProps } from "@mui/material"
import { ZodSchema, string } from "zod"


export type Field<T> = TextFieldProps & {name: keyof T};

export type IntlSchema = (t: (arg: string) => string) => ZodSchema;

 type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
    [K in (T extends ReadonlyArray<infer U> ? U : never)]: V
};



export type AdditionalCheckFunc = (
    data: string | readonly string[] | any
) => Promise<boolean> | boolean

export type AdditionalCheckItem = {
    func: AdditionalCheckFunc, 
    path:  string | readonly string[],
    messagePath: string
}