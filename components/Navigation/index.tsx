import React, { useContext } from "react";
import styled from "styled-components";
import Link from "./components/Links";
import ModalTrigger from "./components/ModalTrigger";
import Routes from "./RouteObject";
import { useRouter } from "next/router";
import DropDown from "./components/DropDown";
import AuthContext from "../../Context/Authentication";

const NavigationDefaultStyle = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 15px 5px 0px;
	.primaryLinks {
		display: flex;
		align-items: start;
	}
`;

interface ILinkGenerator {
	activeLink: string;
	authState?: boolean;
	routes: ILink[];
	isLoaded: boolean;
}

const generateDefaultLink = (route: ILink, index: number) => {
	{
		switch (route.type) {
			case "custom":
				return <route.component {...route} />;
			case "dropDown":
				return <DropDown {...route} />;

			case "modalButton":
				const NewButton = ModalTrigger(route.component);
				return <NewButton key={index} {...route} />;
			case "link":
			default:
				return <Link key={index} {...route} />;
		}
	}
};

const filterAuth = (currentAuthState: boolean, route: ILink, index: number) => {
	return "authState" in route
		? route.authState === currentAuthState
			? generateDefaultLink(route, index)
			: undefined
		: generateDefaultLink(route, index);
};

const DefaultLinks = (props: ILinkGenerator) => {
	const { routes, authState, isLoaded } = props;
	return (
		<>{routes.map((route, index) => filterAuth(authState, route, index))}</>
	);
};

const DefaultNavigationBar = (props) => {
	const activeLink = useRouter().pathname;
	const auth = React.useContext(AuthContext);
	if (!auth.isLoaded) return null;
	return (
		<NavigationDefaultStyle>
			<h1>Links</h1>
			<section className={"primaryLinks"}>
				<DefaultLinks
					routes={Routes}
					activeLink={activeLink}
					authState={auth.userIsAuthenticated}
					isLoaded={auth.isLoaded}
				/>
				{props.children}
			</section>
		</NavigationDefaultStyle>
	);
};

export default DefaultNavigationBar;
