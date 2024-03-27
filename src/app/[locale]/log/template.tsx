"use client"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Button, ButtonProps, Stack } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"
import { useTranslations } from "next-intl"
import TableVariantMenu from "@/components/log/table-variant-menu"

const commonProps: ButtonProps = {
  LinkComponent: Link,
  size: "large",
  variant: "contained",
  sx: { width: { xs: "100%", sm: "initial" } },
}

export default function LogLayout({
  children,
}: {
  children: ReactNode
  params: { locale: string; pathname: string }
}) {
  const pathname = usePathname()
  const split = pathname.split("/").slice(1)
  const path = split.slice(1) || ["log"]
  const current = path[path.length - 1]
  const t = useTranslations("auth")
  return (
    <>
      <Stack
        gap={3}
        mb={3}
        justifyContent={"space-between"}
        direction={{ xs: "column", sm: "row" }}
      >
        {current == "log" ? (
          <Button
            href="/log/create"
            startIcon={<CreateIcon />}
            {...commonProps}
          >
            {t("btn_create.default")}
          </Button>
        ) : (
          <Button href="/log" startIcon={<HomeIcon />} {...commonProps}>
            {t("home")}
          </Button>
        )}
        {current == "log" && <TableVariantMenu />}
      </Stack>
      {children}
    </>
  )
}
