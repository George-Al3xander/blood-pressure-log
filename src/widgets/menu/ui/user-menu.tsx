"use client";

import {
    LanguageOptions,
    LogoutOption,
    NavigationOptions,
    ProfilePreviewOption,
} from "@/features/menu";
import { useMuiMenuController } from "@/shared/lib";
import { Divider, IconButton, Menu, MenuIcon } from "@/shared/ui";
import { useUser } from "@clerk/nextjs";

const ARIA_BASE_NAME = "profile-menu";

export const UserMenu = () => {
    const { user, isSignedIn } = useUser();

    const { triggerProps, menuProps, handleClose } =
        useMuiMenuController(ARIA_BASE_NAME);

    return (
        <div>
            <IconButton {...triggerProps}>
                <MenuIcon
                    sx={{
                        color: "primary.contrastText",
                        width: 30,
                        height: 30,
                    }}
                />
            </IconButton>
            <Menu {...menuProps}>
                <ProfilePreviewOption user={user} />
                <Divider />
                <NavigationOptions
                    isSignedIn={isSignedIn}
                    handleClose={handleClose}
                />
                <Divider />
                <LanguageOptions />
                {isSignedIn && [
                    <Divider key="divider-logout" />,
                    <LogoutOption
                        key="logout-button"
                        handleClose={handleClose}
                    />,
                ]}
            </Menu>
        </div>
    );
};
