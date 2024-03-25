import { ReactNode } from "react";
import { getSession } from "../../../../lib/auth/actions";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";




export default  function AuthLayout ({children}:{children: ReactNode, params: {locale: string}}) {
    //const session = await getSession();  
    //if(session.isLoggedIn) redirect("/");
      
    
    return(<Container  maxWidth={"sm"}>{children}</Container>)
}