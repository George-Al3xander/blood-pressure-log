import { Component, FunctionComponent, JSXElementConstructor, ReactElement, ReactNode, Suspense } from "react";
import { getSession } from "../../lib/auth/actions";


type TComponent = FunctionComponent<{loggedIn: boolean}>

const AuthCheck = async  ({Component}:{Component: TComponent}) => {
    const {isLoggedIn} = await getSession();
    
    return <Component  loggedIn={Boolean(isLoggedIn)}/>
}

export const AuthClientWrapper = ({fallback, Component}:{fallback: ReactNode, Component: TComponent}) => (
<Suspense fallback={fallback}>
    <AuthCheck Component={Component}/>
</Suspense>)