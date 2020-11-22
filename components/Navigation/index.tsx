import React, { useContext } from "react";
import styled from "styled-components";
import Link from "./Links";
import Button, { ButtonWithAddToDOM } from "./Buttons";
import Routes from "./RouteObject";
import { useRouter } from "next/router";

const NavigationDefaultStyle = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 15px 5px 0px;
`;

export const DefaultLinks = (props: ILinks) => (
	<section>
		{props.routes.map((route, index) => {
			switch (route.type) {
				case "modalButton":
					const NewButton = ButtonWithAddToDOM(route.modal);
					return <NewButton key={index} {...route} />;
					break;
				case "link":
				default:
					return <Link key={index} {...route} />;
					break;
			}
		})}
	</section>
);

const DefaultNavigationBar = (props) => {
	const activeLink = useRouter().pathname;

	return (
		<NavigationDefaultStyle>
			<h1>Links</h1>
			<section className={"primaryLinks"}>
				<DefaultLinks routes={Routes} activeLink={activeLink} />
			</section>
		</NavigationDefaultStyle>
	);
};

export default DefaultNavigationBar;
