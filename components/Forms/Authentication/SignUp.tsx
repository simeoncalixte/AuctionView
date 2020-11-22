import React from "react";
import withModal, { ModalContext } from "../../Modal";
import styled from "styled-components";
import { Button, InputText } from "../FormElements";
import HairTag from "../../Paginator/Misc/CentralHairTag";
import * as utils from "../utils";
import PasswordValdation from "../molecules/PasswordValidationDisplay";
import Authentication from "../../../services/Auth0";
import { TFieldValidation, EPasswordPatternName } from "../module";
import emailPattern from "../../../utils/RegEx/email";

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
const GridChild = styled.div<{ gridColumn: string }>`
	grid-column: ${(props) => props.gridColumn};
`;

const ValidationPattern: TFieldValidation = {
	firstName: {
		required: true,
	},
	lastName: {
		required: true,
	},
	email: {
		required: true,
		mustMatchPattern: {
			emailPattern: {
				pattern: emailPattern,
				errorLabel: "please enter a valid email address",
			},
		},
	},
	username: {
		required: true,
	},
	password: {
		required: true,
		mustMatchPattern: {
			[EPasswordPatternName.containsUpperCaseChar]: {
				pattern: /[A-Z]/g,
			},
			[EPasswordPatternName.contains8Chars]: {
				pattern: /.{8,}/g,
			},
			[EPasswordPatternName.containsNumeric]: {
				pattern: /[0-9]/g,
			},
			[EPasswordPatternName.containsLowerCaseChar]: {
				pattern: /[a-z]/g,
			},
			[EPasswordPatternName.antiRepetition]: {
				pattern: /(.)\1{1,}/g,
			},
		},
	},
	confirmPassword: {
		required: true,
		mustMatchSibling: "input[name='password']",
	},
	tel: {
		required: true,
		mustMatchPattern: {
			validPhoneNumber: {
				pattern: /\d{7}/,
				errorLabel: "please enter a valid phone number",
			},
		},
	},
	address: {
		required: true,
	},
	postalCode: {
		required: true,
	},
	city: {
		required: true,
	},
	state: {
		required: true,
	},
};

const SignUpForm = (props) => {
	const modalContext = React.useContext(ModalContext);
	const errorState = React.useState<TFieldValidation>({});
	const [formErrors, setFormErrors] = errorState;
	const [isFormCompleted, setFormCompletionState] = React.useState(false);
	const formReference = React.useRef<HTMLFormElement>();
	const formIsValid = !!Object.keys(formErrors).length;
	const completionState = isFormCompleted ? null : null;

	const attemptRegisteration = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(), e.stopPropagation();

		if (true) {
			const values = utils.parseFormValues(e.target);
			console.log({ values });
			Authentication.signupAndLogin(
				{
					email: "sihhhm3hmon@gmail.com",
					password: "88778SDrr4@",
					username: "Mabbhhhybejnot",
					userMetadata: { plan: "silver", team_id: "a111" },
				},
				(error) => {
					if (error) {
						setFormErrors({ ...formErrors, serverErrors: error });
					} else {
						setFormCompletionState(true);
					}
				}
			);
		}
	};
	const errorChecking = (e: React.FormEvent<HTMLFormElement>) =>
		utils.checkForErrors(e, errorState, ValidationPattern, formReference);

	return (
		<Form
			onSubmit={attemptRegisteration}
			onChange={errorChecking}
			onBlurCapture={errorChecking}
			ref={formReference}
			encType={"multipart/form-data"}
		>
			<CloseButton onClick={modalContext.toggle}>X</CloseButton>
			<StyledHairTag>Personal Info</StyledHairTag>

			<InputText.withLabel
				label={"First Name"}
				name={"firstName"}
				gridColumns={"1/3"}
				error={formErrors.firstName}
			/>

			<InputText.withLabel
				label={"Last Name"}
				name={"lastName"}
				gridColumns={"3/5"}
				error={formErrors.lastName}
			/>
			<InputText.withLabel
				label={"Phone Number"}
				name={"tel"}
				gridColumns={"1/3"}
				type={"tel"}
				error={formErrors.tel}
			/>
			<InputText.withLabel
				label={"Mailing Address"}
				name={"address"}
				gridColumns={"1/4"}
				error={formErrors?.address}
			/>
			<InputText.withLabel
				label={"Postal Code"}
				name={"postalCode"}
				gridColumns={"1/2"}
				error={formErrors?.postalCode}
			/>
			<InputText.withLabel
				label={"City"}
				name={"city"}
				gridColumns={"2/4"}
				error={formErrors?.city}
			/>
			<InputText.withLabel
				label={"State"}
				name={"state"}
				gridColumns={"1/4"}
				error={formErrors?.state}
			/>

			<StyledHairTag>Account Info</StyledHairTag>

			<InputText.withLabel
				label={"Username"}
				name={"username"}
				gridColumns={"span 3"}
				type={"text"}
				error={formErrors?.username}
			/>
			<InputText.withLabel
				label={"Email"}
				name={"email"}
				gridColumns={"span 3"}
				type={"email"}
				error={formErrors?.email}
			/>
			<InputText.withLabel
				label={"Password"}
				name={"password"}
				gridColumns={"1/3"}
				type={"password"}
				error={formErrors?.password}
			/>
			<PasswordValdation {...formErrors?.password} />
			<InputText.withLabel
				label={"Password Confirmation"}
				name={"confirmPassword"}
				gridColumns={"1/3"}
				type={"password"}
				error={formErrors?.confirmPassword}
			/>
			<GridChild gridColumn="1/5">
				{formErrors?.serverErrors ? (
					<span>
						Invalid Signup attempt. Please check your inputs. Common issues
						included: existing email, existing username, disqualifying
						passwords.
					</span>
				) : null}
			</GridChild>

			<SubmitSection>
				<Button.FacebookButton text={"Sign up with"} />
				<Button.GoogleButton text={"Sign up with"} />
			</SubmitSection>
		</Form>
	);
};

export default SignUpForm;
