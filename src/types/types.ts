import {TextFieldProps } from "@mui/material"


export type Field<T> = TextFieldProps & {name: keyof T}