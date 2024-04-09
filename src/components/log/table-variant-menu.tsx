"use client"
import DoneIcon from "@mui/icons-material/Done"
import React, { useState, useTransition } from "react"

import { useTranslations } from "next-intl"
import Link, { LinkProps } from "next/link"
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuItemProps,
} from "@mui/material"
import { TableVariantParam } from "@/types/types"
import DataArrayIcon from "@mui/icons-material/DataArray"
import { useRouter, useSearchParams } from "next/navigation"
import useHandleParams from "@/hooks/useChangeSearchParams"

const variants: TableVariantParam[] = ["plain", "complex"]

const TableVariantMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { searchParams, handleChange } = useHandleParams()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (value: string) => {
    handleChange({ path: "tableVariant", value })
    setAnchorEl(null)
  }
  const t = useTranslations("table")

  const current = (searchParams.get("tableVariant") ||
    "complex") as TableVariantParam

  return (
    <div>
      <Button
        sx={{ width: { xs: "100%", sm: "initial" } }}
        onClick={handleClick}
        startIcon={<DataArrayIcon />}
        size="large"
        variant="outlined"
      >
        {t("table_variant")}
      </Button>
      <Menu
        id="table-var-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "table-var-button",
        }}
      >
        {variants.map((variant) => (
          <MenuItem
            disabled={current == variant}
            sx={{ textTransform: "capitalize" }}
            //component={Link}
            onClick={() => handleClose(variant)}
            key={variant}
          >
            <ListItemIcon>{current == variant && <DoneIcon />}</ListItemIcon>
            <ListItemText>{t(variant)}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

// `?tableVariant=${variant}${
//   pageSize ? "&pageSize=" + pageSize : ""
// }${page ? "&page=" + page : ""}`

export default TableVariantMenu
