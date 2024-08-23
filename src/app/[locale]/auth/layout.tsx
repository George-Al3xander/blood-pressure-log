import { Container } from "@mui/material";
import { ReactNode } from "react";

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    //const session = await getSession();
    //if(session.isLoggedIn) redirect("/");

    return <Container maxWidth={"sm"}>{children}</Container>;
}
