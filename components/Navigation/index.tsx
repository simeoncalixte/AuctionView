import React, {useContext} from "react";
import styled from "styled-components";
import Link from "./Links"; 
import Routes from "./RouteObject";
import {useRouter} from "next/router";

const NavigationDefaultStyle = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 5px 0px;
`;

interface ILinks {
    routes: ILink[],
    activeLink: string,
}

export const DefaultLinks = (props: ILinks) => <section>
        {
            props.routes.map( (route,index) =>{
                return(
                    <Link  
                        key={index} 
                        href={route.href} 
                        isActive={props.activeLink == route.href} 
                        cb={route.cb}
                    >
                        {route.children}
                    </Link>
                );
            })
        }
    </section>;

const DefaultNavigationBar  =  (props)  => {
    const activeLink = useRouter().pathname;
    
    return(
        <NavigationDefaultStyle> 
            <h1>Links</h1> 
            <section className={"primaryLinks"}>
                <DefaultLinks routes={Routes} activeLink={activeLink}/>
            </section>  
        </NavigationDefaultStyle>
    );
}


export default DefaultNavigationBar