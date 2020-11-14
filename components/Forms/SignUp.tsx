import React from "react";
import withModal, { ModalContext } from "../Modal";
import styled from "styled-components";
import { Button, InputText } from "./FormElements";
import { postData } from "../../utils/NetworkRequest";
import UserServices from "../../services/User";
import HairTag from "../Misc/CentralHairTag";
import {
	EValidationTypes,
	IValidationMethods,
	TFieldValidations,
	TValidationRules,
} from "./module.d";
import ValidationPattern from "./ValidationPatterns";
import PasswordValdation from "./molecules/PasswordValidationDisplay";

const Form = styled.form`
	box-shadow: 1px 1px 1px #fff;
	border: 2px solid #f9f9f97a;
	width: 100%;
	min-height: 20px;
	background: #ffffffe3;
	margin: 20px;
	padding: 20px;
	max-width: 500px;
	border-radius: 2px;
	color: #414344;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: end;
	@media screen and (max-width: 400px) {
		width: 100%;
	}
`;

const StyledInput = styled(InputText.withLabel)<{ gridColumns: string }>`
	margin-bottom: 5px;
	width: 100%;
	padding-left: 15px;
	letter-spacing: 1px;
	box-sizing: border-box;
	font-size: 14px;
	input {
		background-color: #fffffff2;
		border-radius: 4px;
		border-style: solid;
		border-color: #95959545;
		border-width: 1px;
		:focus {
			background: #efe;
		}
	}
	${(props) => (props.gridColumns ? `grid-column: ${props.gridColumns};` : ``)}
`;

const StyledButton = styled(Button.default)`
	width: 50%;
	display: flex;
	justify-content: center;
`;
const SubmitSection = styled.section`
	margin: 25px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	grid-column: span 5;
`;
const ForgotPasswordLink = styled.a``;
const CloseButton = styled.div`
	margin-bottom: 25px;
	cursor: pointer;
	grid-column: span 4;
	justify-content: inherit;
	display: grid;
	justify-items: end;
`;
const StyledHairTag = styled(HairTag)`
	grid-column: 1/5;
`;

const ValidationMethods: IValidationMethods = {
	required: (value) => !!value,
	mustMatchPattern: (value, pattern) => !!value.match(pattern),
	mustMatchSibling: (value, siblingValue) => value === siblingValue,
};

const SignUpForm = (props) => {
	const modalContext = React.useContext(ModalContext);
	const [formErrors, setFormErrors] = React.useState<TFieldValidations>({});
	const logIn = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const username = e.target.username.value;
		const password = e.target.password.value;
		postData(UserServices + "/login", { username, password });
	};
	const formReference = React.useRef<HTMLFormElement>();

	const checkForErrors = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.target);
		const fieldName: string = e.target?.name;
		const fieldValue: string = e.target?.value;
		const validationRules: TValidationRules = ValidationPattern[fieldName];
		const priorFormErrors = { ...formErrors };
		if (validationRules) {
			///copy current errors into rules
			const results = {};
			for (const rule in validationRules) {
				const method = ValidationMethods[rule];
				let isValid = null;
				switch (rule) {
					case EValidationTypes.required:
						isValid = method(fieldValue);
						if (!isValid) {
							results[rule] = !isValid;
						}
						break;
					case EValidationTypes.mustMatchSibling:
						const sibling = formReference.current.querySelector(
							`${validationRules[rule]}`
						);
						isValid = method(fieldValue, sibling?.value);
						if (!isValid) {
							results[rule] = isValid;
						}
						break;

					case EValidationTypes.mustMatchPattern:
						////this would be were the rule is passed with pattern and tested
						Object.keys(validationRules[rule]).forEach((patternId) => {
							const { pattern, errorLabel } = validationRules[rule][patternId];
							const errorExist = method(fieldValue, pattern);
							console.log({ rule, errorExist, patternId, pattern });
							if (!errorExist) {
								if (!results[rule]) results[rule] = {};
								results[rule][patternId] = errorLabel;
							}
						});
						break;
				}
			}
			console.log({ fieldName, results });
			if (Object.keys(results).length) {
				setFormErrors({ ...priorFormErrors, [fieldName]: results });
			} else if (priorFormErrors[fieldName]) {
				delete priorFormErrors[fieldName];
				setFormErrors({ ...priorFormErrors });
			}
		}
	};

	return (
		<Form
			onSubmit={logIn}
			onChange={checkForErrors}
			onBlurCapture={checkForErrors}
			ref={formReference}
		>
			<CloseButton onClick={modalContext.toggle}>X</CloseButton>
			<StyledHairTag>Personal Info</StyledHairTag>

			<StyledInput
				label={"First Name"}
				name={"firstName"}
				gridColumns={"1/3"}
				error={formErrors.firstName}
			/>

			<StyledInput
				label={"Last Name"}
				name={"lastName"}
				gridColumns={"3/5"}
				error={formErrors.lastName}
			/>
			<StyledInput
				label={"Phone Number"}
				name={"tel"}
				gridColumns={"1/3"}
				type={"tel"}
				error={formErrors.tel}
			/>
			<StyledInput
				label={"Mailing Address"}
				name={"address"}
				gridColumns={"1/4"}
				error={formErrors?.address}
			/>
			<StyledInput
				label={"Postal Code"}
				name={"postalCode"}
				gridColumns={"1/2"}
				error={formErrors?.postalCode}
			/>
			<StyledInput
				label={"City"}
				name={"city"}
				gridColumns={"2/4"}
				error={formErrors?.city}
			/>
			<StyledInput
				label={"State"}
				name={"state"}
				gridColumns={"1/4"}
				error={formErrors?.state}
			/>

			<StyledHairTag>Account Info</StyledHairTag>

			<StyledInput
				label={"Username"}
				name={"username"}
				gridColumns={"span 3"}
				type={"text"}
				error={formErrors?.username}
			/>
			<StyledInput
				label={"Email"}
				name={"email"}
				gridColumns={"span 3"}
				type={"email"}
				error={formErrors?.email}
			/>
			<StyledInput
				label={"Password"}
				name={"password"}
				gridColumns={"1/3"}
				type={"password"}
				error={formErrors?.password}
			/>
			<PasswordValdation {...formErrors?.password} />
			<StyledInput
				label={"Password Confirmation"}
				name={"confirmPassword"}
				gridColumns={"1/3"}
				type={"password"}
				error={formErrors?.confirmPassword}
			/>

			<SubmitSection>
				<StyledButton type={"submit"} textColor={"facebook"}>
					Sign up with us
				</StyledButton>
				<StyledButton textColor={"facebook"}>
					<span>Sign up with</span>
					<img src={"/images/facebook.svg"} />
				</StyledButton>
				<StyledButton textColor={"facebook"}>
					Sign up with <img src={"/images/google1.svg"} />
				</StyledButton>
			</SubmitSection>
		</Form>
	);
};

export default SignUpForm;
