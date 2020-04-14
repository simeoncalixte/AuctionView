import React from "react";
import LoginForm from "../Forms/Login"
import ReactDOM from "react-dom";

export default [
    {
        href: "/",
        children: "Home"
        
    },
    {
        href: "/dashboard",
        children: "Auction Dashboard"
        
    },
    {
        href: "/login",
        children: "Login",
        cb: (e)=>{
            e.preventDefault();
            console.log("Login Call Back");
            console.log(document.querySelector("#modalContainer"))
            return ReactDOM.createPortal(  <LoginForm/>, document.querySelector("#modalContainer") )
        
        }

    },
    {
        href: "/register",
        children: "Register",
        cb: (e)=>{
            if(e){
                console.log(e)
            }            
            console.log("register")
        }

    }
] as ILink[]
