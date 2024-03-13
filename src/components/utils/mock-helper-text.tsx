import { Typography} from "@mui/material";
import { ReactNode } from "react";





export const MockHelperText = ({text}:{text?: String}) => {
    if(!text) return null
    return <Typography color={"red"}  ml={'1rem'} variant='caption'>{text}</Typography>
}