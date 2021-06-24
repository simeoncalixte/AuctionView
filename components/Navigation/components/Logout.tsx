import React from "react";
import AuthContext from "../../../Context/Authentication";
import styled from "styled-components";
import { navigationLinkStyles } from "../collectiveStyles";

const AnchorStyles = styled.span<{ isActive: ILink["isActive"] }>`
	${(props) => navigationLinkStyles(props.isActive)}
`;
const Logout = (props: ILink) => {
	const authentication = React.useContext(AuthContext);

	return (
		<AnchorStyles
			isActive={props.isActive}
			onClick={() => authentication.logout({}, () => {})}
		>
			Log out
		</AnchorStyles>
	);
};

export default Logout;
