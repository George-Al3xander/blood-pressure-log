import { MenuProps } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { type MouseEvent, useState } from "react";

export const useMuiMenuController = (ariaBaseName: string) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const triggerProps = {
        id: `${ariaBaseName}-button`,
        "aria-label": `open ${ariaBaseName.replaceAll("-", " ")}`,
        "aria-controls": open ? `${ariaBaseName}-menu` : undefined,
        "aria-haspopup": "true",
        "aria-expanded": open ? "true" : undefined,
        onClick: handleClick,
    } as ButtonProps;

    const menuProps = {
        id: `${ariaBaseName}-menu`,
        anchorEl: anchorEl,
        open: open,
        onClose: handleClose,
        slotProps: {
            list: {
                "aria-labelledby": `${ariaBaseName}-button`,
            },
        },
    } as MenuProps;

    return { open, handleClick, handleClose, triggerProps, menuProps };
};
