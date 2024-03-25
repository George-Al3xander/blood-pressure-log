"use client"
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Button, ButtonProps } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home';
import { useTranslations } from "next-intl";


const commonProps: ButtonProps = {
    LinkComponent: Link,
    size: "large",
    variant: "contained",
    sx: { mb: 3,width: {xs: "100%", sm: "initial"}},
   
}

export default  function LogLayout ({children}:{children: ReactNode, params: {locale: string,pathname: string}}) {
    const pathname = usePathname()
    const splitted = pathname.split("/").slice(1)   
    const path = splitted.slice(1) || ["log"]
    const current = path[path.length-1];
    const t = useTranslations("auth")
    return(<>
    {current == "create" ? 
    <Button href='/log' startIcon={<HomeIcon />} {...commonProps}>{t("home")}</Button>
    :
    <Button href='/log/create' startIcon={<CreateIcon />} {...commonProps}>{t("btn_create.default")}</Button>
    
    }
 
    {children}
    </>)
}