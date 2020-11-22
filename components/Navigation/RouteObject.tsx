import React from "react";
import Login from "../Forms/Authentication/Login";
import SignUp from "../Forms/Authentication/SignUp";

export default [
	{
		href: "/",
		children: "Home",
	},
	{
		href: "/dashboard",
		children: "Auction Dashboard",
	},
	{
		href: "/login",
		type: "modalButton",
		children: "Login",
		modal: Login,
	},
	{
		href: "/register",
		type: "modalButton",
		children: "Register",
		modal: SignUp,
	},
] as ILink[];
