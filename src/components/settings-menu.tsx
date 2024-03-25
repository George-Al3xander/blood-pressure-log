"use client"
import React, { useState, useTransition } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Menu, MenuItem, MenuItemProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link, { LinkProps } from 'next/link';


const menuItems : { [key: string]: (MenuItemProps & LinkProps)[]} = {
    logged: [
        {children: "profile",  href: "/profile", component: Link},
        {children: "btn_logout.default",  href: "/api/mongo/users/logout", component: Link}
    ],
    notLogged: [
        {children: "btn_login.default", href: "/auth/login", component: Link},
        {children: "btn_register.default",href: "/auth/register", component: Link}
    ]
}

const SettingsMenu = ({loggedIn}:{loggedIn:boolean}) => {
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const t = useTranslations("auth")
  

  const key = loggedIn ? "logged" : "notLogged"
  const menuItem = menuItems[key]

  return (
    <div>
        <IconButton        
        color='default'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}    
            aria-label="settings"
        ><PersonIcon /></IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
      >

        {menuItem.map(({children,...item}) => <MenuItem onClick={handleClose} key={children?.toString()}  children={t(children! as string)} {...item}/>)}      
      </Menu>
    </div>
  )
}

export default SettingsMenu