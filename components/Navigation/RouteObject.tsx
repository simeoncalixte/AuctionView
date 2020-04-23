import React from "react";
import LoginForm from "../Forms/Login"
import ReactDOM from "react-dom";
import Login from "../Forms/Login";

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
        type: "modalButton",
        children: "Login",
        modal: Login
    },
    {
        href: "/register",
        type: "button",
        children: "Register",
        cb: (e)=>{
            if(e){
                console.log(e)
            }            
            console.log("register")
        }

    }
] as ILink[]
