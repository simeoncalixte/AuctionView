import React from "react";
import { Button, InputText } from "../FormElements";
import * as utils from "../utils";
import { TFieldValidation, TValidationRules } from "../module";
import Auth0 from "../../../services/Auth0";
import StyledForm from "../FormElements/StyledForms";

const ValidationPattern: TFieldValidation = {
	email: {
		required: true,
	},
};
const ChangePassword = () => {
	const errorState = React.useState<TFieldValidation>({});
	const [formErrors, setErrors] = errorState;

	const errorChecking = (e: React.FormEvent<HTMLFormElement>) =>
		utils.checkForErrors(e, errorState, ValidationPattern);

	const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		console.log(e.target);
		const values = utils.parseFormValues(e.target) as { email };
		Auth0.changePassword(values, (error) => {
			console.log({ error });
		});
	};

	return (
		<StyledForm onSubmit={changePassword}>
			<InputText.withLabel
				label={"Email"}
				name={"email"}
				lablePosition={"top"}
				error={formErrors?.email}
			/>

			<Button.DefaultButton type="submit" textColor="copper">
				Request Password Reset
			</Button.DefaultButton>
		</StyledForm>
	);
};

export default ChangePassword;
