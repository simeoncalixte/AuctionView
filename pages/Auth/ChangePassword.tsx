import React from "react";
import defaultStyles from "../../components/HOC/DefaultPageProps";
import styled from "styled-components";
import ChangePassword from "../../components/Forms/Authentication/ChangePassword";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const SignUp = (props) => {
	return (
		<Container>
			<ChangePassword />
		</Container>
	);
};

export default defaultStyles(SignUp);
