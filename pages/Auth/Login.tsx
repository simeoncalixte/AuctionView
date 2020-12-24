import React from "react";
import defaultStyles from "../../components/HOC/DefaultPageProps";
import styled from "styled-components";
import LoginForm from "../../components/Forms/Authentication/Login";
import { GetServerSideProps, GetStaticProps } from "next";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const SignUp = (props) => {
	return (
		<Container>
			<LoginForm />
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return { props: {} };
};

export default defaultStyles(SignUp);
