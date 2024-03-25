"use client"
import React, { useState, useTransition } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuItemProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link, { LinkProps } from 'next/link';

const menuItems : { [key: string]: (MenuItemProps & LinkProps)[]} = {
    logged: [
        {children: "home",  href: "/", component: Link},
        {children: "profile",  href: "/log/profile", component: Link},
        {children: "btn_create.default",  href: "/log/create", component: Link},
        {children: "btn_logout.default",  href: "/api/mongo/users/logout", component: Link}
    ],
    notLogged: [
        {children: "btn_login.default", href: "/auth/login", component: Link},
        {children: "btn_register.default",href: "/auth/register", component: Link}
    ]
}

const icons: { [key: string]: JSX.Element } = {
  "home": <HomeIcon />,
  "profile": <AssignmentIndIcon />,
  "btn_create.default": <CreateIcon />,
  "btn_logout.default": <LogoutIcon />,
  "btn_login.default": <LoginIcon />,
  "btn_register.default": <PersonAddIcon />
};



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
        ><MenuIcon /></IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
      >

        {menuItem.map(({children,...item}) => <MenuItem onClick={handleClose} key={children?.toString()}   {...item}>
          <ListItemIcon>{icons[children as string]}</ListItemIcon>
          <ListItemText>{t(children! as string)}</ListItemText>
        </MenuItem>)}      
      </Menu>
    </div>
  )
}

export default SettingsMenu