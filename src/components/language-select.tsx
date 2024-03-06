"use client"

import { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import React from "react";
import { IconButton, ListItemIcon, ListItemText, MenuItem, SvgIcon, Typography } from "@mui/material";
import {locales} from "../middleware"
import en from "../../public/assets/flags/en.svg"
import uk from "../../public/assets/flags/uk.svg"
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LanguageSelect ({locale}:{locale:string}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleItemClick = (str: string) => {
        return  () => {
          router.replace(`/${str}`);
          handleClose();
        }
    }

    const flags = {
      uk: 
        <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ua" viewBox="0 0 640 480">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="gold" d="M0 0h640v480H0z"/>
            <path fill="#0057b8" d="M0 0h640v240H0z"/>
          </g>
        </svg>, 
    en: 
      <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
      <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
      <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
      </svg>
    }

    const labels = {
      en: "English",
      uk: "Українська"
    }
    return (
        <div style={{zIndex: 12}}>
          <IconButton
            id="lang-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
          
            
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
           <SvgIcon>{flags[locale as "uk"]}</SvgIcon>
          </IconButton>
          <Menu            
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {locales.map((str) =>  
                   <MenuItem 
                        key={"menu-item-"+str} 
                        onClick={handleItemClick(str)}                       
                        disabled={str == locale}
                        >
                      <ListItemIcon><SvgIcon>{flags[str]}</SvgIcon></ListItemIcon>
                      <ListItemText>{labels[str]}</ListItemText>                                            
                  </MenuItem>
             )}
          </Menu>
        </div>
      );
}
