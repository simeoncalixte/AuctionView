import {
	TValidationRules,
	EValidationTypes,
	TFieldValidation,
} from "../module.d";
import ValidationMethods from "./validationMethods";

export const checkForErrors = (
	e: React.FormEvent<HTMLFormElement>,
	errorState: [
		TFieldValidation,
		React.Dispatch<React.SetStateAction<TFieldValidation>>
	],
	validationPattern: TFieldValidation,
	formRef?: React.RefObject<HTMLFormElement>
) => {
	e.preventDefault();
	console.log(e.target);
	const [currentErrors, setErrors] = errorState;
	const target = e.target as HTMLInputElement;
	const fieldName: string = target?.name;
	const fieldValue: string = target?.value;
	const validationRules: TValidationRules = validationPattern[fieldName];
	const priorFormErrors = { ...currentErrors };
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
					const sibling = formRef.current.querySelector(
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

		if (Object.keys(results).length) {
			setErrors({ ...priorFormErrors, [fieldName]: results });
		} else if (priorFormErrors[fieldName]) {
			delete priorFormErrors[fieldName];
			setErrors({ ...priorFormErrors });
		}
	}
};

export default checkForErrors;
