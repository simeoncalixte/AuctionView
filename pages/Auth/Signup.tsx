import React from "react";
import defaultStyles from "../../components/HOC/DefaultPageProps";
import styled from "styled-components";
import SignUpForm from "../../components/Forms/Authentication/SignUp";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	position:relative;
	justify-content: center;
`;

const SignUp = (props) => {
	return (
		<Container>
			<SignUpForm />
		</Container>
	);
};

export default defaultStyles(SignUp);
