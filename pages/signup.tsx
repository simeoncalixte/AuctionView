import React from "react";
import defaultStyles from "../components/HOC/DefaultPageProps";
import styled from "styled-components";
import SignUpForm from "../components/Forms/SignUp";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const SignUp = (props) => {
	return (
		<Container>
			<SignUpForm />
		</Container>
	);
};

export default defaultStyles(SignUp);
