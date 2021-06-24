import React from "react";
import AuthContext from "../../../Context/Authentication";
import styled from "styled-components";

const Image = styled.img`
	width: 40px;
	border-radius: 30px;
	height: 40px;
`;

export default () => {
	const auth = React.useContext(AuthContext);
	if (!(auth.userIsAuthenticated && auth.userProfile)) return null;
	return <Image src={`${auth.userProfile.picture}`} />;
};
