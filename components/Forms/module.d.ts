export enum EValidationTypes {
	required = "required",
	mustMatchPattern = "mustMatchPattern",
	mustMatchSibling = "mustMatchSibling",
}

export enum EPasswordPatternName {
	containsUpperCaseChar = "containsUpperCaseChars",
	contains8Chars = "contains8Chars",
	containsNumeric = "containsNumeric",
	containsLowerCaseChar = "containsLowerCaseChar",
	antiRepetition = "antiRepetition",
}

export type TValidationTypes = keyof typeof EValidationTypes;

export type TFields = keyof typeof ValidationPattern;

export type TValidationRules = {
	[EValidationTypes.required]?: boolean;
	[EValidationTypes.mustMatchPattern]?: {
		[patternId: string]: {
			pattern: RegExp;
			errorLabel?: string;
		};
	};
	[EValidationTypes.mustMatchSibling]?: string;
};

export type TFieldValidation = {
	[key: string]: TValidationRules;
};

interface IValidationMethods {
	[EValidationTypes.required]: (value) => boolean;
	[EValidationTypes.mustMatchPattern]: (
		value: string,
		pattern: RegExp
	) => boolean;
	[EValidationTypes.mustMatchSibling]: (
		value: string,
		siblingValue: string
	) => boolean;
}
