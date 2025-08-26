import { SignIn, SignUp } from "@clerk/nextjs";
import { FC } from "react";

type Props = {
    type: "sign-up" | "sign-in";
};

export const AuthPage: FC<Props> = ({ type }) => {
    const ClerkComponent = type === "sign-in" ? SignIn : SignUp;

    return <ClerkComponent />;
};
