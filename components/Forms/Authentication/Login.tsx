import React from "react";
import withModal, { ModalContext } from "../../Modal";
import styled from "styled-components";
import { Button, InputText } from "../FormElements";
import * as utils from "../utils";
import { TFieldValidation, TValidationRules } from "../module";
import Auth0 from "../../../services/Auth0";

const ValidationPattern: TFieldValidation = {
	username: {
		required: true,
	},
	password: {
		required: true,
	},
};

const Form = styled.form`
	width: 70%;
	min-height: 20px;
	background: black;
	margin: 20px;
	width: 100%;
	min-height: 20px;
	background: #ffffffe3;
	margin: 20px;
	padding: 20px;
	max-width: 400px;
	border-radius: 8px;
	box-shadow: 1px 1px 1px #fff;
	border: 2px solid #f9f9f97a;
	min-height: 20px;
	background: black;
	margin: 20px;
	width: 100%;
	min-height: 20px;
	background: #ffffffe3;
	margin: 20px;
	padding: 20px;
	max-width: 400px;
	border-radius: 2px;
	color: #414344;
	@media screen and (max-width: 400px) {
		width: 100%;
	}
`;

const SubmitSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ForgotPasswordLink = styled.a`
	text-align: right;
	cursor: pointer;
	color: #1877f2;
`;
const CloseButton = styled.div`
	padding: 11px;
	box-sizing: border-box;
	cursor: pointer;
	position: relative;
	width: max-content;
	left: 98%;
`;

const LoginForm = (props) => {
	const modalContext = React.useContext(ModalContext);
	const errorState = React.useState<TFieldValidation>({});
	const [formErrors, setErrors] = errorState;

	const errorChecking = (e: React.FormEvent<HTMLFormElement>) =>
		utils.checkForErrors(e, errorState, ValidationPattern);

	const attemptLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(e.target);
		const values = utils.parseFormValues(e.target) as { username; password };
		Auth0.login(values, (error) => {
			console.log({ error });
		});
	};

	const displayChangePasswordForm = () => {};

	return (
		<Form
			onSubmit={attemptLogin}
			onChange={errorChecking}
			onBlurCapture={errorChecking}
		>
			<CloseButton onClick={modalContext.toggle}>X</CloseButton>
			<InputText.withLabel
				label={"Username"}
				name={"username"}
				lablePosition={"top"}
				error={formErrors?.username}
			/>
			<InputText.withLabel
				label={"Password"}
				name={"password"}
				error={formErrors?.password}
			/>
			<ForgotPasswordLink onClick={displayChangePasswordForm}>
				Forgot Password?
			</ForgotPasswordLink>
			<SubmitSection>
				<Button.DefaultButton textColor={"facebook"}>
					Log In
				</Button.DefaultButton>
				<Button.GoogleButton text={"Login with"} />
				<Button.FacebookButton text={"Login with"} />
			</SubmitSection>
		</Form>
	);
};

export default LoginForm;
