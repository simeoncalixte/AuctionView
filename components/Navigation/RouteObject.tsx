import React from "react";
import Login from "../Forms/Authentication/Login";
import SignUp from "../Forms/Authentication/SignUp";
import Logout from "./components/Logout";
import UserImage from "./components/UserImage";
import Authentication from "../../services/Auth0";

const Links: ILink[] = [
	{
		type: "custom",
		component: UserImage,
		authState: true,
	},
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/Dashboard",
		label: "Auction Dashboard",
	},
	{
		href: "/login",
		type: "modalButton",
		label: "Login",
		component: Login,
		authState: false,
	},
	{
		href: "/Account",
		type: "dropDown",
		label: "My Account",
		dropDownItems: [
			{
				href: "/User/Orders",
				label: "Current Bids",
			},
			{
				href: "/User/WatchList",
				label: "Active Watch List",
			},
			{
				href: "/User/Tickets",
				label: "Tickets",
			},
			{
				href: "/User/PaymentInfo",
				label: "Payment Methods",
			},
			{
				href: "/User/AccountSettings",
				label: "Account Settings",
			},
		],
		authState: true,
	},
	{
		type: "custom",
		component: Logout,
		authState: true,
	},
	{
		type: "modalButton",
		label: "Register",
		component: SignUp,
		authState: false,
	},
];

export default Links;
