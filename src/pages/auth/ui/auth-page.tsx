import { SignIn, SignUp } from "@clerk/nextjs";
import Box from "@mui/material/Box";
import { FC } from "react";

type Props = {
    type: "sign-up" | "sign-in";
};

export const AuthPage: FC<Props> = ({ type }) => {
    const ClerkComponent = type === "sign-in" ? SignIn : SignUp;

    return (
        <Box display="flex" width="100%" justifyContent="center">
            <ClerkComponent />
        </Box>
    );
};
