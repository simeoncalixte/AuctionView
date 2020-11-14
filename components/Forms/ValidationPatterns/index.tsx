import { TFieldValidations, EPasswordPatternName } from "../module.d";
import emailPattern from "../../../utils/RegEx/email";

const ValidationPattern: TFieldValidations = {
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

export default ValidationPattern;
